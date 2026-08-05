import { signal } from '@preact/signals-core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { calcBSplinePoint } from 'three/examples/jsm/curves/NURBSUtils.js'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ---------------------------------------------------------------------------
// Patch Three.js point-light attenuation to match the Zoo Engine.
//
// Engine (pbrBasic.slang:240-241):
//   attenDist = 0.01 * dist;
//   atten     = 1.0 / (attenDist * attenDist);
//
// Three.js default (physically-correct, decay=2):
//   atten = 1.0 / max(dist^2, 0.01)
//
// The 0.01 factor makes engine lights fall off 10 000x faster than
// inverse-square, which is what produces the single-light specular-line
// artifact on thin geometry at distance.  We replace the built-in
// getDistanceAttenuation() so light intensities can use the raw engine
// radiance values directly.
// ---------------------------------------------------------------------------
{
  // --- Patch 1: Light attenuation ---
  // Engine (pbrBasic.slang:240-241): attenDist = 0.01 * dist; atten = 1/(attenDist^2)
  // Also drop Three.js's 0.01 falloff floor -- it caps attenuation at 100x,
  // which dims the camera light ~11x within 10 units of the model.
  const attChunk = THREE.ShaderChunk.lights_pars_begin
  const attPatched = attChunk.replace(
    'float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );',
    'float distanceFalloff = 1.0 / max( pow( 0.01 * lightDistance, decayExponent ), 1e-6 );'
  )
  if (attPatched !== attChunk) {
    THREE.ShaderChunk.lights_pars_begin = attPatched
  } else {
    console.warn('Zoo Engine attenuation patch: failed to match Three.js shader chunk')
  }

  // --- Patch 2: Disable geometric specular anti-aliasing ---
  // Three.js adds screen-space normal-derivative "geometryRoughness" to the
  // material roughness, which flattens the specular peak on thin/curved
  // geometry at distance (i.e. it deliberately suppresses specular aliasing).
  // The engine has no such logic: its raw specular aliases into the bright
  // white line effect on thin geometry (strings, wires) when zoomed out.
  const physChunk = THREE.ShaderChunk.lights_physical_fragment
  const physPatched = physChunk
    .replace('material.roughness += geometryRoughness;', '')
    .replace('max( roughnessFactor, 0.0525 )', 'max( roughnessFactor, 0.001 )')
  if (physPatched !== physChunk) {
    THREE.ShaderChunk.lights_physical_fragment = physPatched
  } else {
    console.warn('Zoo Engine specular AA patch: failed to match Three.js shader chunk')
  }

  // --- Patch 3: Replace height-correlated Smith with engine's separable Schlick ---
  // Engine (pbrBasic.slang:166-182) uses G_SchlickGGX with k = (roughness+1)^2/8
  // and separable G_Smith = G(NdotL) * G(NdotV), with the standard 4*NdotV*NdotL
  // denominator. Three.js uses the height-correlated form which is more physically
  // accurate but produces dimmer specular at grazing angles.
  {
    const bsdfChunk = THREE.ShaderChunk.lights_physical_pars_fragment
    const bsdfPatched = bsdfChunk.replace(
      'float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n' +
      '\tfloat a2 = pow2( alpha );\n' +
      '\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n' +
      '\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n' +
      '\treturn 0.5 / max( gv + gl, EPSILON );\n' +
      '}',

      '// Zoo Engine separable Smith-Schlick (pbrBasic.slang:166-182)\n' +
      'float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n' +
      '\tfloat r = sqrt( alpha );\n' +  // alpha = roughness^2, so sqrt gives roughness
      '\tfloat k = pow2( r + 1.0 ) / 8.0;\n' +
      '\tfloat gv = dotNV / ( dotNV * ( 1.0 - k ) + k );\n' +
      '\tfloat gl = dotNL / ( dotNL * ( 1.0 - k ) + k );\n' +
      '\treturn gv * gl / max( 4.0 * dotNV * dotNL, EPSILON );\n' +
      '}'
    )
    if (bsdfPatched !== bsdfChunk) {
      THREE.ShaderChunk.lights_physical_pars_fragment = bsdfPatched
    } else {
      console.warn('Zoo Engine geometry term patch: failed to match Three.js shader chunk')
    }
  }

  // --- Patch 4: Gamma correction ---
  // Engine (pbrBasic.slang:301) uses simple pow(c, 1/2.2).
  // Three.js uses sRGB OETF (pow(c, 1/2.4) + linear toe), which produces
  // darker shadows. Override linearToOutputTexel to use the engine's gamma.
  {
    const csChunk = THREE.ShaderChunk.colorspace_fragment
    const csPatched = csChunk.replace(
      'gl_FragColor = linearToOutputTexel( gl_FragColor );',
      'gl_FragColor = vec4( pow( clamp( gl_FragColor.rgb, 0.0, 1.0 ), vec3( 1.0 / 2.2 ) ), gl_FragColor.a );'
    )
    if (csPatched !== csChunk) {
      THREE.ShaderChunk.colorspace_fragment = csPatched
    } else {
      console.warn('Zoo Engine gamma patch: failed to match Three.js shader chunk')
    }
  }

  // --- Patch 5: Fresnel energy conservation on diffuse ---
  // Engine (pbrBasic.slang:252-254): kS = F; kD = (1-kS)*(1-metallic).
  // Three.js omits the (1-F) factor, keeping diffuse constant across a
  // surface.  On cylinders (strings/wires) the engine's diffuse falls to zero
  // at grazing angles (F -> 1), darkening the flanks so the narrow specular
  // line down the centre dominates.  Without this the whole cylinder renders
  // as flat, bright diffuse and the highlight line washes out.
  const pbrChunk = THREE.ShaderChunk.lights_physical_pars_fragment
  const pbrPatched = pbrChunk.replace(
    'reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n' +
    '\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );',

    'reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n' +
    '\tvec3 zooH = normalize( directLight.direction + geometryViewDir );\n' +
    '\tfloat zooVdH = saturate( dot( geometryViewDir, zooH ) );\n' +
    '\tvec3 zooF = material.specularColor + ( 1.0 - material.specularColor ) * pow( 1.0 - zooVdH, 5.0 );\n' +
    '\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor ) * ( 1.0 - zooF );'
  )
  if (pbrPatched !== pbrChunk) {
    THREE.ShaderChunk.lights_physical_pars_fragment = pbrPatched
  } else {
    console.warn('Zoo Engine Fresnel diffuse patch: failed to match Three.js shader chunk')
  }

  // --- Patch 6: Perspective lighting under orthographic projection ---
  // Three.js normally uses a constant view direction for orthographic cameras.
  // Keep orthographic raster projection, but calculate specular and Fresnel from
  // each fragment toward the camera position as perspective rendering does.
  const lightingChunk = THREE.ShaderChunk.lights_fragment_begin
  const lightingPatched = lightingChunk.replace(
    'vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );',
    'vec3 geometryViewDir = normalize( vViewPosition );'
  )
  if (lightingPatched !== lightingChunk) {
    THREE.ShaderChunk.lights_fragment_begin = lightingPatched
  } else {
    console.warn('Perspective lighting patch: failed to match Three.js shader chunk')
  }
}

interface CachedGlb {
  scene: THREE.Group
  seamGroups: Array<THREE.Group | undefined>
}

/** A three-element tuple: [startByte, endByte, moduleId]. */
export type SourceRange = [number, number, number]

export interface ArtifactNode {
  type?: string
  codeRef?: { range?: SourceRange; sourceRange?: SourceRange }
  code_ref?: { range?: SourceRange; source_range?: SourceRange }
  faceCodeRef?: { range?: SourceRange; sourceRange?: SourceRange }
  face_code_ref?: { range?: SourceRange; source_range?: SourceRange }
  sourceRange?: SourceRange
  source_range?: SourceRange
  consumed?: boolean
  [key: string]: unknown
}

export type ArtifactGraph = Record<string, ArtifactNode>

export interface SelectionInfo {
  uuid: string
  artifactId?: string
  artifact?: ArtifactNode
  sourceRange?: SourceRange
}

export type CameraMode = 'perspective' | 'orthographic'
export type LightingMode = 'uniform' | 'dynamic' | 'mouse'

export interface NamedView {
  key: string
  label: string
  vantage: { x: number; y: number; z: number }
  up: { x: number; y: number; z: number }
}

export const namedViews: readonly NamedView[] = [
  { key: 'top', label: 'Top', vantage: { x: 0, y: 0, z: 128 }, up: { x: 0, y: 1, z: 0 } },
  { key: 'profile', label: 'Profile', vantage: { x: 128, y: 0, z: 0 }, up: { x: 0, y: 0, z: 1 } },
  { key: 'front', label: 'Front', vantage: { x: 0, y: -128, z: 0 }, up: { x: 0, y: 0, z: 1 } },
  { key: 'isometric', label: 'Iso', vantage: { x: 96, y: -96, z: 96 }, up: { x: 0, y: 0, z: 1 } },
]

export interface ViewerOptions {
  backgroundColor?: number
  cameraMode?: CameraMode
  edgeColor?: number
  edgeHoverColor?: number
  edgeRaycastTolerancePixels?: number
  faceHoverColor?: number
  fitObjectsInView?: boolean
  frameFirstImport?: boolean
  lightingMode?: LightingMode
  onEntitySelected?: (info: SelectionInfo) => void
}

export class Viewer {
  private readonly cachedGeometries = new WeakSet<THREE.BufferGeometry>()
  private readonly perspCamera: THREE.PerspectiveCamera
  private readonly orthoCamera: THREE.OrthographicCamera
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  private readonly cameraMode$ = signal<CameraMode>('perspective')
  private readonly controls: OrbitControls
  private readonly edgePointer = new THREE.Vector2()
  private readonly edgePointerDown = new THREE.Vector2()
  private readonly edgeRaycaster = new THREE.Raycaster()
  private readonly edgeColor: number
  private readonly edgeHoverColor: number
  private readonly edgeSelectionColor: number
  private readonly edgeRaycastTolerancePixels: number
  private readonly edgeLinesVisible$ = signal(true)
  private readonly faceHoverColor: number
  private readonly faceSelectionColor: number
  private readonly selectionInteriorOpacity: number
  private readonly glbCache = new Map<string, Promise<CachedGlb>>()
  // Engine-matched lighting: two fixed point lights + a camera-attached point light.
  // From scene.cpp applyBasicLighting() at scale=1.
  private readonly light0 = new THREE.PointLight(0xffffff, 1)
  private readonly light1 = new THREE.PointLight(0xffffff, 1)
  private readonly cameraLight = new THREE.PointLight(0xffffff, 1)
  private readonly cameraDirLight = new THREE.DirectionalLight(0xffffff, 0.6)
  private readonly loader = new GLTFLoader()
  private readonly lightCenter = new THREE.Vector3()
  private readonly renderer: THREE.WebGLRenderer
  private readonly resizeObserver: ResizeObserver
  private readonly scene = new THREE.Scene()
  private readonly partGroups = new Map<string, THREE.Object3D>()
  private readonly onEntitySelected: (info: SelectionInfo) => void
  private readonly artifactGraph$ = signal<ArtifactGraph>({})
  private activeFadeAnimations = 0
  private readonly fadeCompleteWaiters = new Set<() => void>()
  private fitAnimation = 0
  private readonly fitObjectsInView$ = signal<boolean>(true)
  private readonly frameFirstImport$ = signal<boolean>(true)
  private hasFramedModel = false
  private edgePointerDragged = false
  private readonly hoveredEdge$ = signal<THREE.Object3D | undefined>(undefined)
  private readonly hoveredFace$ = signal<THREE.Mesh | undefined>(undefined)
  private hoverOverlay: THREE.Mesh | undefined
  private selectionOverlay: THREE.Mesh | undefined
  private pinnedEdge: THREE.Object3D | undefined
  private pinnedFace: THREE.Mesh | undefined
  private interactiveEdges: THREE.Object3D[] = []
  private interactiveFaces: THREE.Mesh[] = []
  private interactiveMeshes: THREE.Mesh[] = []
  private readonly lightingMode$ = signal<LightingMode>('uniform')
  private snapshotRenderer: THREE.WebGLRenderer | undefined
  private readonly edgeLineWidth: number
  private model = new THREE.Group()

  constructor(private readonly container: HTMLElement, options: ViewerOptions = {}) {
    this.edgeColor = options.edgeColor ?? 0xffffff
    // Zoo Design Studio overrides (modeling-app/src/lib/constants.ts):
    //   selection = #FFB727  rgb(255, 183, 39)  — amber/gold
    //   hover     = #B3801B  rgb(179, 128, 27)  — dark gold (70% of selection)
    //   interior fill opacity = 0.2
    this.edgeHoverColor = options.edgeHoverColor ?? 0xb3801b
    this.edgeSelectionColor = 0xffb727
    this.edgeLineWidth = 2
    this.edgeRaycastTolerancePixels = options.edgeRaycastTolerancePixels ?? 7
    this.faceHoverColor = options.faceHoverColor ?? 0xb3801b
    this.faceSelectionColor = 0xffb727
    this.selectionInteriorOpacity = 0.2

    this.fitObjectsInView$.value = options.fitObjectsInView ?? true
    this.frameFirstImport$.value = options.frameFirstImport ?? true
    this.lightingMode$.value = options.lightingMode ?? 'uniform'
    this.onEntitySelected = options.onEntitySelected ?? (() => {})
    this.scene.background = new THREE.Color(options.backgroundColor ?? 0x080b11)

    // Engine ambient term: 0.03 * albedo * ao (pbrBasic.slang:262).
    // With default ao=0.1 this gives 0.003 * albedo.
    // Three.js AmbientLight goes through BRDF_Lambert which divides by PI and
    // multiplies by (1-metalness). To match the engine's metalness-independent
    // ambient of 0.003*albedo, we compensate: 0.003 * PI / (1-metalness).
    // With default metalness=0.6: 0.003 * PI / 0.4 ≈ 0.0236.
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.003 * Math.PI / 0.4))

    // Engine-matched lighting from scene.cpp applyBasicLighting().
    // Positions/intensities are set by updateSceneLights(), which also
    // replicates the engine's scale-to-fit recursion.
    this.light0.decay = 2
    this.light1.decay = 2
    this.cameraLight.decay = 2
    this.scene.add(this.light0, this.light1, this.cameraLight)
    this.scene.add(this.cameraDirLight, this.cameraDirLight.target)
    this.scene.add(this.model)
    this.updateSceneLights()

    this.perspCamera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000)
    this.perspCamera.position.set(4, 3, 6)
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 1000)
    this.orthoCamera.position.set(4, 3, 6)
    this.camera = this.perspCamera

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    // Match the engine's Reinhard tone mapping (pbrBasic.slang:298).
    // Exposure 1.0: the engine applies no exposure factor.
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.container.append(this.renderer.domElement)
    this.container.addEventListener('pointermove', (event) => {
      if (
        event.buttons !== 0 &&
        (event.clientX - this.edgePointerDown.x) ** 2 + (event.clientY - this.edgePointerDown.y) ** 2 > 25
      ) {
        this.edgePointerDragged = true
      }
      this.updateHoveredEntity(event)
    })
    this.renderer.domElement.addEventListener('pointerdown', (event) => {
      this.edgePointerDown.set(event.clientX, event.clientY)
      this.edgePointerDragged = false
    })
    this.container.addEventListener('pointerleave', () => {
      this.setHoveredEdge(undefined)
      this.setHoveredFace(undefined)
    })
    this.renderer.domElement.addEventListener('click', (event) => {
      if (this.edgePointerDragged) return
      const entity = this.selectableAt(event)
      const uuid = entity?.userData.edgeUuid ?? entity?.userData.faceUuid
      if (typeof uuid === 'string') {
        // Pin the clicked entity
        this.clearPinnedSelection()
        if (entity && isLineSegments(entity)) {
          this.setPinnedEdge(entity)
        } else if (entity && isMesh(entity)) {
          this.setPinnedFace(entity)
        }
        this.onEntitySelected(this.resolveSelection(uuid))
      }
    })

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.setCameraMode(options.cameraMode ?? 'orthographic')

    // Console debug helper: __zooDebugEdges(true) renders all B-rep edge lines
    // bright red on top of everything (no depth test) to distinguish
    // missing-geometry problems from occlusion problems.
    ;(window as unknown as Record<string, unknown>).__zooDebugEdges = (enabled: boolean) => {
      let count = 0
      this.model.traverse((child) => {
        if (!(child instanceof LineSegments2) || !(child.material instanceof LineMaterial)) return
        child.material.depthTest = !enabled
        child.material.color.setHex(enabled ? 0xff0000 : this.edgeColor)
        child.material.linewidth = enabled ? 3 : this.edgeLineWidth
        child.material.needsUpdate = true
        count += 1
      })
      console.log(`[debug-edges] ${enabled ? 'enabled' : 'disabled'} on ${count} edge line objects`)
    }

    // Full lighting state dump: run __zooLightReport() in the console.
    ;(window as unknown as Record<string, unknown>).__zooLightReport = () => {
      const box = new THREE.Box3().setFromObject(this.model)
      const center = box.isEmpty() ? new THREE.Vector3() : box.getCenter(new THREE.Vector3())
      const size = box.isEmpty() ? new THREE.Vector3() : box.getSize(new THREE.Vector3())

      const pointContribution = (light: THREE.PointLight) => {
        const d = light.position.distanceTo(center)
        const atten = 1 / Math.max((0.01 * d) ** 2, 1e-6)
        return { distanceToModel: d, netContribution: light.intensity * atten }
      }

      console.log('[light-report]', JSON.stringify({
        build: 'v7-dirlight-both-modes',
        patches: {
          attenuation: THREE.ShaderChunk.lights_pars_begin.includes('0.01 * lightDistance'),
          specularAA: !THREE.ShaderChunk.lights_physical_fragment.includes('material.roughness += geometryRoughness;'),
          geometryTerm: THREE.ShaderChunk.lights_physical_pars_fragment.includes('Zoo Engine separable Smith-Schlick'),
          gamma: THREE.ShaderChunk.colorspace_fragment.includes('1.0 / 2.2'),
          fresnelDiffuse: THREE.ShaderChunk.lights_physical_pars_fragment.includes('zooF'),
        },
        renderer: {
          toneMapping: this.renderer.toneMapping === THREE.ReinhardToneMapping ? 'Reinhard' : this.renderer.toneMapping,
          exposure: this.renderer.toneMappingExposure,
          outputColorSpace: this.renderer.outputColorSpace,
        },
        camera: {
          mode: this.cameraMode$.value,
          position: this.camera.position.toArray().map((v) => +v.toFixed(3)),
          target: this.controls.target.toArray().map((v) => +v.toFixed(3)),
          distance: +this.camera.position.distanceTo(this.controls.target).toFixed(3),
        },
        model: {
          bboxCenter: center.toArray().map((v) => +v.toFixed(3)),
          bboxSize: size.toArray().map((v) => +v.toFixed(3)),
        },
        lights: {
          light0: {
            visible: this.light0.visible,
            position: this.light0.position.toArray(),
            intensity: this.light0.intensity,
            decay: this.light0.decay,
            ...pointContribution(this.light0),
          },
          light1: {
            visible: this.light1.visible,
            position: this.light1.position.toArray(),
            intensity: this.light1.intensity,
            decay: this.light1.decay,
            ...pointContribution(this.light1),
          },
          cameraPoint: {
            visible: this.cameraLight.visible,
            intensity: +this.cameraLight.intensity.toFixed(4),
          },
          cameraDirectional: {
            visible: this.cameraDirLight.visible,
            intensity: this.cameraDirLight.intensity,
          },
        },
        firstMeshMaterial: (() => {
          let result: Record<string, unknown> | undefined
          this.model.traverse((child) => {
            if (result || !isMesh(child)) return
            const mat = Array.isArray(child.material) ? child.material[0] : child.material
            if (mat instanceof THREE.MeshStandardMaterial) {
              result = {
                metalness: mat.metalness,
                roughness: mat.roughness,
                color: '#' + mat.color.getHexString(),
                side: mat.side === THREE.DoubleSide ? 'DoubleSide' : mat.side,
                toneMapped: mat.toneMapped,
              }
            }
          })
          return result
        })(),
      }, null, 2))
    }

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.container)
    this.resize()
    this.animate()
  }

  async loadGlbPart(
    bytes: Uint8Array,
    entityIds: string[],
    allowSharedGroup = false,
    shouldApply: () => boolean = () => true
  ): Promise<boolean> {
    const cached = await this.cachedGlb(bytes)
    if (!shouldApply()) return false

    const newEntityIds = new Set(entityIds.filter((id) => !this.partGroups.has(id)))
    const gltf = { scene: cached.scene.clone(true) }
    const seamGroups = cached.seamGroups.map((group) => group?.clone(true))
    this.cloneInstanceMaterials(gltf.scene)
    for (const seamGroup of seamGroups) {
      if (seamGroup) this.cloneInstanceMaterials(seamGroup)
    }

    const meshes = meshesIn(gltf.scene)
    for (const mesh of meshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const material of materials) {
        material.polygonOffset = true
        material.polygonOffsetFactor = 1
        material.polygonOffsetUnits = 1
        if (material instanceof THREE.MeshStandardMaterial) {
          // Match the engine's default PBR material (basicpbrmaterial.cpp:12-14,
          // constants.h:35):
          //   albedo     = (0.9, 0.9, 0.9)
          //   metalness  = 0.6
          //   roughness  = 0.4
          //   ao         = 0.1
          // GLB exports use glTF defaults (white, metallic=1, roughness=1) which
          // look nothing like the engine, so we override here.
          if (material.color.r === 1 && material.color.g === 1 && material.color.b === 1) {
            // Only override if the GLB didn't set an explicit color
            material.color.setRGB(0.9, 0.9, 0.9)
          }
          material.metalness = 0.6
          material.roughness = 0.4
          // The engine has no IBL/environment map — zero out any Three.js env contribution.
          material.envMapIntensity = 0
          // The engine renders both sides of every face (pbrBasic.slang:286-287
          // flips the normal for back faces). Three.js defaults to FrontSide,
          // culling back faces and leaving black voids on thin geometry.
          material.side = THREE.DoubleSide
        }
      }
    }
    const meshesById = new Map(
      entityIds.map((id) => [id, meshes.filter((mesh) => objectMatchesId(mesh, id))])
    )
    const matchingIdsByMesh = new Map(
      meshes.map((mesh) => [
        mesh,
        entityIds.filter((id) => objectMatchesId(mesh, id)),
      ])
    )
    const canPartition =
      entityIds.length > 1 &&
      entityIds.every((id) => (meshesById.get(id)?.length ?? 0) > 0) &&
      meshes.every((mesh) => matchingIdsByMesh.get(mesh)?.length === 1)
    const orderedRoots = gltf.scene.children
    const canPartitionByOrder =
      entityIds.length > 1 &&
      orderedRoots.length === entityIds.length &&
      orderedRoots.every((root) => meshesIn(root).length > 0)

    if (canPartition || canPartitionByOrder) {
      this.removeParts(entityIds)
      gltf.scene.updateMatrixWorld(true)
      for (const [index, id] of entityIds.entries()) {
        const group = new THREE.Group()
        group.name = id
        this.model.add(group)
        const entityMeshes = canPartition ? meshesById.get(id) ?? [] : meshesIn(orderedRoots[index])
        for (const mesh of entityMeshes) group.attach(mesh)
        const seamGroup = seamGroups[index]
        if (seamGroup) group.add(seamGroup)
        this.partGroups.set(id, group)
        if (newEntityIds.has(id)) this.fadeIn(group)
      }
      this.refreshInteractiveEdges()
      return true
    }

    if (entityIds.length > 1 && !allowSharedGroup) return false

    this.removeParts(entityIds)
    for (const seamGroup of seamGroups) {
      if (seamGroup) gltf.scene.add(seamGroup)
    }
    this.model.add(gltf.scene)
    for (const id of entityIds) this.partGroups.set(id, gltf.scene)
    if (entityIds.every((id) => newEntityIds.has(id))) this.fadeIn(gltf.scene)
    this.refreshInteractiveEdges()
    return true
  }

  removeEntityIds(entityIds: string[]) {
    this.removeParts(entityIds)
  }

  setLighting(mode: LightingMode) {
    this.lightingMode$.value = mode
  }

  setXray(enabled: boolean, opacity = 0.22) {
    const value = enabled ? opacity : 1
    this.model.traverse((child) => {
      if (!isMesh(child)) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      for (const material of materials) {
        const transparent = value < 1
        if (material.transparent !== transparent) {
          material.transparent = transparent
          material.needsUpdate = true
        }
        material.forceSinglePass = transparent
        material.opacity = value
        material.depthWrite = value >= 1
      }
    })
  }

  setEdgeLinesVisible(visible: boolean) {
    this.edgeLinesVisible$.value = visible
    this.model.traverse((child) => {
      if (child.name === 'brep-surface-edge' || child.name === 'brep-seam-edge') {
        child.visible = visible
      }
    })
    if (!visible) this.setHoveredEdge(undefined)
  }

  setViewFitting(frameFirstImport: boolean, fitObjectsInView: boolean) {
    this.frameFirstImport$.value = frameFirstImport
    this.fitObjectsInView$.value = fitObjectsInView
  }

  setCameraMode(mode: CameraMode) {
    if (mode === this.cameraMode$.value) return
    this.cameraMode$.value = mode

    // OrbitControls always drives the perspective camera so the wheel dollies
    // the actual camera POSITION in both modes.  The ortho camera mirrors the
    // perspective pose each frame (updateOrthoFrustum), giving a parallel
    // projection of the same viewpoint -- so the camera point light keeps its
    // close-range specular gradients and ortho looks like perspective, as the
    // engine's renders do.
    this.camera = mode === 'orthographic' ? this.orthoCamera : this.perspCamera
    this.resize()
    this.controls.update()
  }

  getCameraMode(): CameraMode {
    return this.cameraMode$.value
  }

  meshCount(entityId: string): number {
    const group = this.partGroups.get(entityId)
    return group ? meshesIn(group).length : 0
  }

  /** Focus the camera on scene objects matching the given UUID.
   *  Searches entity groups, face UUIDs, edge UUIDs, and object names. Returns true if found. */
  focusOnUuid(uuid: string): boolean {
    const objects: THREE.Object3D[] = []

    // 1. Check partGroups (entity ID match)
    const group = this.partGroups.get(uuid)
    if (group) objects.push(group)

    // 2. Search all scene objects by faceUuid, edgeUuid, or name
    this.model.traverse((child) => {
      if (isMesh(child) && child.userData.faceUuid === uuid) objects.push(child)
      if (isLineSegments(child) && child.userData.edgeUuid === uuid) objects.push(child)
      if (child.name === uuid) objects.push(child)
    })

    if (objects.length === 0) return false

    const box = new THREE.Box3()
    for (const obj of objects) box.expandByObject(obj)
    if (box.isEmpty()) return false

    this.animateFit(this.fitForBox(box, false))

    // Highlight matched edges/faces
    for (const obj of objects) {
      if (isLineSegments(obj)) this.setHoveredEdge(obj)
      if (isMesh(obj) && typeof obj.userData.faceUuid === 'string') this.setHoveredFace(obj)
    }

    return true
  }

  /** Try to focus on any of the given UUIDs. Collects all matching faces,
   *  edges, and groups, zooms to fit them, and highlights the selection. */
  focusOnAnyUuid(uuids: string[]): boolean {
    const uuidSet = new Set(uuids)
    const matchedFaces: THREE.Mesh[] = []
    const matchedEdges: THREE.Object3D[] = []
    const matchedGroups: THREE.Object3D[] = []

    // Check partGroups by entity ID
    for (const uuid of uuids) {
      const group = this.partGroups.get(uuid)
      if (group) matchedGroups.push(group)
    }

    // Search all scene objects for matching faceUuid / edgeUuid / name
    this.model.traverse((child) => {
      if (isMesh(child) && typeof child.userData.faceUuid === 'string' && uuidSet.has(child.userData.faceUuid)) {
        matchedFaces.push(child)
      }
      if (isLineSegments(child) && typeof child.userData.edgeUuid === 'string' && uuidSet.has(child.userData.edgeUuid)) {
        matchedEdges.push(child)
      }
      if (child.name && uuidSet.has(child.name)) {
        matchedGroups.push(child)
      }
    })

    // Determine what to frame: prefer specific faces/edges, fall back to groups
    const frameTargets: THREE.Object3D[] = matchedFaces.length > 0 || matchedEdges.length > 0
      ? [...matchedFaces, ...matchedEdges]
      : matchedGroups

    if (frameTargets.length === 0) return false

    const box = new THREE.Box3()
    for (const obj of frameTargets) box.expandByObject(obj)
    if (box.isEmpty()) return false

    this.animateFit(this.fitForBox(box, false, 0.6, 0.05))

    // Pin + highlight matched faces/edges with selection colors
    this.clearPinnedSelection()
    if (matchedFaces.length > 0) {
      this.setPinnedFace(matchedFaces[0])
    }
    if (matchedEdges.length > 0) {
      this.setPinnedEdge(matchedEdges[0])
    }

    return true
  }

  clearPinnedSelection() {
    if (this.pinnedEdge) {
      this.setEdgeColor(
        this.pinnedEdge,
        this.hoveredEdge$.value === this.pinnedEdge ? this.edgeHoverColor : this.edgeColor
      )
      this.pinnedEdge = undefined
    }
    if (this.pinnedFace) {
      this.pinnedFace = undefined
      this.disposeOverlay(this.selectionOverlay)
      this.selectionOverlay = undefined
      if (this.hoveredFace$.value) this.setHoveredFace(this.hoveredFace$.value, true)
    }
  }

  /** Render a thumbnail of the scene from the given view angle. */
  renderSnapshot(view: NamedView, size = 192): string | null {
    const box = new THREE.Box3().setFromObject(this.model)
    if (box.isEmpty()) return null

    const center = box.getCenter(new THREE.Vector3())
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    const distance = sphere.radius * 2.5

    const dir = new THREE.Vector3(view.vantage.x, view.vantage.y, view.vantage.z).normalize()
    const cam = new THREE.PerspectiveCamera(45, 1, 0.01, distance * 10)
    cam.position.copy(center).addScaledVector(dir, distance)
    cam.up.set(view.up.x, view.up.y, view.up.z)
    cam.lookAt(center)
    cam.updateProjectionMatrix()

    if (!this.snapshotRenderer) {
      this.snapshotRenderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, alpha: false })
      this.snapshotRenderer.outputColorSpace = THREE.SRGBColorSpace
      this.snapshotRenderer.toneMapping = THREE.ReinhardToneMapping
      this.snapshotRenderer.toneMappingExposure = 1.0
    }
    this.snapshotRenderer.setSize(size, size)
    this.snapshotRenderer.render(this.scene, cam)
    return this.snapshotRenderer.domElement.toDataURL('image/png')
  }

  /** Animate the camera to a named view's angle, fitting the model. */
  lookAtView(view: NamedView) {
    const box = new THREE.Box3().setFromObject(this.model)
    if (box.isEmpty()) return

    const center = box.getCenter(new THREE.Vector3())
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    const distance = sphere.radius * 2.5

    const dir = new THREE.Vector3(view.vantage.x, view.vantage.y, view.vantage.z).normalize()
    const target = center.clone()
    const position = target.clone().addScaledVector(dir, distance)

    const near = Math.max(0.01, distance * 0.01)
    const far = distance * 10

    this.perspCamera.up.set(view.up.x, view.up.y, view.up.z)
    this.animateFit({ position, target, near, far })
  }

  fitModelOutwardSmooth() {
    if (!this.model) return

    const box = new THREE.Box3().setFromObject(this.model)
    if (box.isEmpty()) return
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    box.getCenter(this.lightCenter)

    if (!this.hasFramedModel) {
      this.hasFramedModel = true
      if (this.frameFirstImport$.value) {
        this.animateFit(this.fitForBox(box, false))
        return
      }
    }

    if (!this.fitObjectsInView$.value) return
    if (this.boxFitsView(box)) return

    this.animateFit(this.fitForBox(box))
  }

  clearModel() {
    this.clearPinnedSelection()
    this.setHoveredEdge(undefined)
    this.setHoveredFace(undefined)
    this.disposeObject(this.model)
    this.model.clear()
    this.partGroups.clear()
    this.hasFramedModel = false
    this.lightCenter.set(0, 0, 0)
    this.interactiveEdges = []
    this.interactiveFaces = []
    this.interactiveMeshes = []
    this.artifactGraph$.value = {}
    this.updateSceneLights()
  }

  setArtifactGraph(graph: ArtifactGraph) {
    this.artifactGraph$.value = graph
  }

  async waitForSceneReady() {
    do {
      while (this.activeFadeAnimations > 0) {
        await new Promise<void>((resolve) => this.fadeCompleteWaiters.add(resolve))
      }
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    } while (this.activeFadeAnimations > 0)
  }

  private resolveSelection(uuid: string): SelectionInfo {
    const graph = this.artifactGraph$.value
    // Direct match: the UUID is an artifact graph key.
    if (graph[uuid]) {
      const artifact = graph[uuid]
      return { uuid, artifactId: uuid, artifact, sourceRange: sourceRangeFromArtifactTree(graph, uuid) }
    }
    // Indirect match: the UUID appears as an entity_id or nested value in an artifact node.
    for (const [artifactId, artifact] of Object.entries(graph)) {
      if (artifactContainsUuid(artifact, uuid)) {
        return { uuid, artifactId, artifact, sourceRange: sourceRangeFromArtifactTree(graph, artifactId) }
      }
    }
    return { uuid }
  }

  private removeParts(entityIds: string[]) {
    const groups = unique(entityIds.map((id) => this.partGroups.get(id)).filter((group): group is THREE.Object3D => Boolean(group)))
    for (const group of groups) {
      this.model.remove(group)
      this.disposeObject(group)
    }
    for (const [id, group] of this.partGroups) {
      if (groups.includes(group) || entityIds.includes(id)) this.partGroups.delete(id)
    }
    this.refreshInteractiveEdges()
  }

  private refreshInteractiveEdges() {
    // Model content changed -- re-fit the engine light rig to the new bounds.
    this.updateSceneLights()
    this.interactiveEdges = []
    this.interactiveFaces = []
    this.interactiveMeshes = []
    const w = Math.max(this.container.clientWidth, 1)
    const h = Math.max(this.container.clientHeight, 1)
    this.model.traverse((child) => {
      if (child.name === 'brep-surface-edge' || child.name === 'brep-seam-edge') {
        child.visible = this.edgeLinesVisible$.value
        // Keep LineMaterial resolution in sync with the viewport.
        if (child instanceof LineSegments2 && child.material instanceof LineMaterial) {
          child.material.resolution.set(w, h)
        }
        if (child.name === 'brep-surface-edge') this.interactiveEdges.push(child)
        return
      }
      if (isMesh(child)) {
        this.interactiveMeshes.push(child)
        if (typeof child.userData.faceUuid === 'string') this.interactiveFaces.push(child)
      }
    })
    if (this.hoveredEdge$.value && !this.interactiveEdges.includes(this.hoveredEdge$.value)) {
      this.setHoveredEdge(undefined)
    }
    if (this.hoveredFace$.value && !this.interactiveFaces.includes(this.hoveredFace$.value)) {
      this.setHoveredFace(undefined)
    }
    if (this.pinnedEdge && !this.interactiveEdges.includes(this.pinnedEdge)) {
      this.pinnedEdge = undefined
    }
    if (this.pinnedFace && !this.interactiveFaces.includes(this.pinnedFace)) {
      this.pinnedFace = undefined
      this.disposeOverlay(this.selectionOverlay)
      this.selectionOverlay = undefined
    }
  }

  private updateHoveredEntity(event: PointerEvent) {
    const entity = this.selectableAt(event)
    const isEdge = entity && typeof entity.userData.edgeUuid === 'string'
    const hoverEdge = isEdge ? entity : undefined
    const hoverFace = !isEdge && entity && isMesh(entity) ? entity : undefined

    this.setHoveredEdge(hoverEdge)
    this.setHoveredFace(hoverFace)
  }

  private selectableAt(event: MouseEvent | PointerEvent): THREE.Object3D | undefined {
    if (this.interactiveEdges.length === 0 && this.interactiveFaces.length === 0) return undefined
    const bounds = this.renderer.domElement.getBoundingClientRect()
    this.edgePointer.set(
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
      1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2
    )
    const distance = this.camera.position.distanceTo(this.controls.target)
    const worldPerPixel = this.camera instanceof THREE.OrthographicCamera
      ? (this.camera.top - this.camera.bottom) / Math.max(bounds.height, 1)
      : (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * distance) / Math.max(bounds.height, 1)
    this.edgeRaycaster.params.Line = { threshold: worldPerPixel * this.edgeRaycastTolerancePixels }
    this.edgeRaycaster.setFromCamera(this.edgePointer, this.camera)
    const edgeHit = this.edgeLinesVisible$.value
      ? this.edgeRaycaster.intersectObjects(this.interactiveEdges, false)[0]
      : undefined
    const meshHit = this.edgeRaycaster.intersectObjects(this.interactiveMeshes, false)[0]
    if (edgeHit && (!meshHit || meshHit.distance >= edgeHit.distance - worldPerPixel * 3)) {
      return edgeHit.object
    }
    if (meshHit && typeof meshHit.object.userData.faceUuid === 'string') {
      return meshHit.object
    }
    return undefined
  }

  private setHoveredEdge(edge: THREE.Object3D | undefined) {
    if (edge === this.hoveredEdge$.value) return
    const previous = this.hoveredEdge$.value
    this.setEdgeColor(previous, previous === this.pinnedEdge ? this.edgeSelectionColor : this.edgeColor)
    this.hoveredEdge$.value = edge
    this.setEdgeColor(edge, edge === this.pinnedEdge ? this.edgeSelectionColor : this.edgeHoverColor)
    this.updateCursor()
  }

  private setPinnedEdge(edge: THREE.Object3D) {
    this.pinnedEdge = edge
    this.setEdgeColor(edge, this.edgeSelectionColor)
  }

  private setHoveredFace(face: THREE.Mesh | undefined, force = false) {
    if (face === this.hoveredFace$.value && !force) return
    this.disposeOverlay(this.hoverOverlay)
    this.hoverOverlay = undefined
    this.hoveredFace$.value = face
    if (face && face !== this.pinnedFace) {
      this.hoverOverlay = this.createFaceOverlay(
        face,
        this.faceHoverColor,
        this.selectionInteriorOpacity * 1.5,
        1000
      )
    }
    this.updateCursor()
  }

  private setPinnedFace(face: THREE.Mesh) {
    this.pinnedFace = face
    this.disposeOverlay(this.selectionOverlay)
    this.selectionOverlay = this.createFaceOverlay(
      face,
      this.faceSelectionColor,
      this.selectionInteriorOpacity,
      999
    )
    if (this.hoveredFace$.value === face) this.setHoveredFace(face, true)
  }

  private createFaceOverlay(face: THREE.Mesh, color: number, opacity: number, renderOrder: number) {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthTest: true,
      depthWrite: false,
      side: THREE.FrontSide,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
    const overlay = new THREE.Mesh(face.geometry, material)
    overlay.matrixAutoUpdate = false
    overlay.matrixWorld.copy(face.matrixWorld)
    overlay.renderOrder = renderOrder
    overlay.name = '_highlight_overlay'
    this.scene.add(overlay)
    return overlay
  }

  private disposeOverlay(overlay: THREE.Mesh | undefined) {
    if (!overlay) return
    overlay.removeFromParent()
    ;(overlay.material as THREE.Material).dispose()
  }

  private updateCursor() {
    this.renderer.domElement.style.cursor = this.hoveredEdge$.value || this.hoveredFace$.value ? 'pointer' : ''
  }

  private setEdgeColor(edge: THREE.Object3D | undefined, color: number) {
    if (!edge) return
    const mat = (edge as THREE.Mesh).material
    if (!mat || Array.isArray(mat)) return
    if (materialHasColor(mat)) mat.color.setHex(color)
  }

  private disposeObject(object: THREE.Object3D) {
    object.traverse((child: THREE.Object3D) => {
      if (!isMesh(child) && !isLineSegments(child)) return
      if (!this.cachedGeometries.has(child.geometry)) child.geometry.dispose()
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      for (const material of materials) material.dispose()
    })
  }

  private async cachedGlb(bytes: Uint8Array): Promise<CachedGlb> {
    const checksum = await sha256(bytes)
    const cached = this.glbCache.get(checksum)
    if (cached) return cached

    const loading = this.parseCachedGlb(bytes)
    this.glbCache.set(checksum, loading)
    try {
      return await loading
    } catch (error) {
      if (this.glbCache.get(checksum) === loading) this.glbCache.delete(checksum)
      throw error
    }
  }

  private async parseCachedGlb(bytes: Uint8Array): Promise<CachedGlb> {
    const buffer = toArrayBuffer(bytes)
    const scene = await new Promise<THREE.Group>((resolve, reject) => {
      this.loader.parse(buffer, '', (gltf) => resolve(gltf.scene), reject)
    })
    assignFaceUuids(scene, bytes)
    logGlbExtras(bytes)
    const seamGroups = seamGroupsFromGlb(bytes, this.edgeColor, this.edgeLineWidth)
    applySolidNodeTransforms(scene, seamGroups)
    this.rememberCachedGeometries(scene)
    for (const seamGroup of seamGroups) {
      if (seamGroup) this.rememberCachedGeometries(seamGroup)
    }
    return { scene, seamGroups }
  }

  private rememberCachedGeometries(object: THREE.Object3D) {
    object.traverse((child) => {
      if (isMesh(child) || isLineSegments(child)) this.cachedGeometries.add(child.geometry)
    })
  }

  private cloneInstanceMaterials(object: THREE.Object3D) {
    object.traverse((child) => {
      if (!isMesh(child) && !isLineSegments(child)) return
      child.material = Array.isArray(child.material)
        ? child.material.map((material) => material.clone())
        : child.material.clone()
    })
  }



  private fadeIn(object: THREE.Object3D) {
    const originals = new Map<THREE.Material, { depthWrite: boolean; opacity: number; transparent: boolean }>()
    object.traverse((child) => {
      if (!isMesh(child) && !isLineSegments(child)) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      for (const material of materials) {
        if (originals.has(material)) continue
        originals.set(material, {
          depthWrite: material.depthWrite,
          opacity: material.opacity,
          transparent: material.transparent,
        })
        material.transparent = true
        material.depthWrite = false
        material.opacity = 0
        material.needsUpdate = true
      }
    })
    if (originals.size === 0) return

    this.activeFadeAnimations += 1
    const started = performance.now()
    const duration = 400
    const step = (now: number) => {
      const progress = Math.min((now - started) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      for (const [material, original] of originals) {
        material.opacity = original.opacity * eased
      }
      if (progress < 1) {
        requestAnimationFrame(step)
        return
      }
      for (const [material, original] of originals) {
        material.opacity = original.opacity
        material.transparent = original.transparent
        material.depthWrite = original.depthWrite
        material.needsUpdate = true
      }
      this.activeFadeAnimations -= 1
      if (this.activeFadeAnimations === 0) {
        for (const resolve of this.fadeCompleteWaiters) resolve()
        this.fadeCompleteWaiters.clear()
      }
    }
    requestAnimationFrame(step)
  }

  private fitForBox(box: THREE.Box3, outwardOnly = true, framingMargin = 1.18, minimumDistance = 0.5) {
    const center = box.getCenter(new THREE.Vector3())
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    const halfVFov = THREE.MathUtils.degToRad(this.perspCamera.fov / 2)
    const halfHFov = Math.atan(Math.tan(halfVFov) * Math.max(this.perspCamera.aspect, 0.01))
    const requiredDistance = (sphere.radius / Math.sin(Math.min(halfVFov, halfHFov))) * framingMargin
    const currentDistance = this.perspCamera.position.distanceTo(center)
    const distance = outwardOnly
      ? Math.max(currentDistance, requiredDistance, minimumDistance)
      : Math.max(requiredDistance, minimumDistance)
    const direction = this.perspCamera.position.clone().sub(this.controls.target)

    if (direction.lengthSq() < 0.000001) {
      direction.set(0.55, 0.38, 0.7)
    }

    direction.normalize()
    return {
      far: Math.max(distance + sphere.radius * 4, 1000),
      near: Math.max(Math.min(distance - sphere.radius * 2, distance / 1000), 0.01),
      position: center.clone().add(direction.multiplyScalar(distance)),
      target: center,
    }
  }

  private boxFitsView(box: THREE.Box3) {
    this.camera.updateMatrixWorld()
    const margin = 0.92
    return boxCorners(box).every((corner) => {
      const projected = corner.clone().project(this.camera)
      return (
        projected.z >= -1 &&
        projected.z <= 1 &&
        Math.abs(projected.x) <= margin &&
        Math.abs(projected.y) <= margin
      )
    })
  }

  private animateFit(target: { far: number; near: number; position: THREE.Vector3; target: THREE.Vector3 }) {
    if (this.fitAnimation) cancelAnimationFrame(this.fitAnimation)

    const start = {
      far: this.perspCamera.far,
      near: this.perspCamera.near,
      position: this.perspCamera.position.clone(),
      target: this.controls.target.clone(),
    }
    const started = performance.now()
    const duration = 520

    const step = (now: number) => {
      const t = Math.min((now - started) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)

      this.perspCamera.position.lerpVectors(start.position, target.position, eased)
      this.controls.target.lerpVectors(start.target, target.target, eased)
      this.perspCamera.near = THREE.MathUtils.lerp(start.near, target.near, eased)
      this.perspCamera.far = THREE.MathUtils.lerp(start.far, target.far, eased)
      this.perspCamera.updateProjectionMatrix()
      this.updateOrthoFrustum()
      this.controls.update()

      if (t < 1) {
        this.fitAnimation = requestAnimationFrame(step)
      } else {
        this.fitAnimation = 0
      }
    }

    this.fitAnimation = requestAnimationFrame(step)
  }

  private resize() {
    const width = Math.max(this.container.clientWidth, 1)
    const height = Math.max(this.container.clientHeight, 1)
    this.renderer.setSize(width, height, false)
    this.perspCamera.aspect = width / height
    this.perspCamera.updateProjectionMatrix()
    this.updateOrthoFrustum()
    // Keep LineMaterial resolution in sync with viewport size (all edge lines,
    // including non-interactive seam edges).
    this.model.traverse((child) => {
      if (child instanceof LineSegments2 && child.material instanceof LineMaterial) {
        child.material.resolution.set(width, height)
      }
    })
  }

  /** Mirror the perspective camera's pose and view volume into the ortho camera. */
  private updateOrthoFrustum() {
    this.orthoCamera.position.copy(this.perspCamera.position)
    this.orthoCamera.quaternion.copy(this.perspCamera.quaternion)
    this.orthoCamera.up.copy(this.perspCamera.up)
    this.orthoCamera.zoom = 1

    const distance = this.perspCamera.position.distanceTo(this.controls.target)
    const halfVFov = THREE.MathUtils.degToRad(this.perspCamera.fov / 2)
    const halfHeight = Math.tan(halfVFov) * distance
    const halfWidth = halfHeight * this.perspCamera.aspect
    this.orthoCamera.left = -halfWidth
    this.orthoCamera.right = halfWidth
    this.orthoCamera.top = halfHeight
    this.orthoCamera.bottom = -halfHeight
    this.orthoCamera.near = this.perspCamera.near
    this.orthoCamera.far = this.perspCamera.far
    this.orthoCamera.updateProjectionMatrix()
  }

  /**
   * Camera-attached light: the engine's PERSPECTIVE path (scene.cpp:2720-2726)
   * in BOTH projection modes:
   *   camDist = 0.015 * orbitDistance
   *   radiance = camDist^2 * vec3(0.6)   (net ~1.35 with 1/(0.01d)^2 attenuation)
   *
   * Patch 6 above also keeps the perspective per-fragment view direction when
   * this light is rendered through the orthographic camera.
   */
  private updateCameraLight() {
    this.cameraDirLight.visible = false
    this.cameraLight.visible = true
    const camDist = 0.015 * this.perspCamera.position.distanceTo(this.controls.target)
    this.cameraLight.position.copy(this.perspCamera.position)
    this.cameraLight.intensity = camDist * camDist * 0.6
  }

  /**
   * Position the two fixed scene lights to match the engine's
   * applyBasicLighting() (scene.cpp:2641-2674):
   *   light0: position vec3(-5,-30,55)*scale, radiance vec3(0.8)*scale^2*0.4
   *   light1: position vec3(15,-8,-15)*scale, radiance vec3(0.6)*scale^2*0.4
   * If either light falls inside the scene bounding box, the engine recurses
   * with scale*10 -- for large models this pushes the lights far outside with
   * quadratically higher radiance, keeping surface illumination constant.
   */
  private updateSceneLights() {
    const p0 = new THREE.Vector3(-5, -30, 55)
    const p1 = new THREE.Vector3(15, -8, -15)

    let scale = 1
    const box = new THREE.Box3().setFromObject(this.model)
    if (!box.isEmpty()) {
      while (
        scale < 1e9 &&
        (box.containsPoint(p0.clone().multiplyScalar(scale)) ||
          box.containsPoint(p1.clone().multiplyScalar(scale)))
      ) {
        scale *= 10
      }
    }

    this.light0.position.copy(p0).multiplyScalar(scale)
    this.light0.intensity = 0.8 * scale * scale * 0.4
    this.light1.position.copy(p1).multiplyScalar(scale)
    this.light1.intensity = 0.6 * scale * scale * 0.4
  }

  private animate = () => {
    this.controls.update()
    if (this.camera === this.orthoCamera) this.updateOrthoFrustum()
    this.updateCameraLight()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.animate)
  }
}

function logGlbExtras(bytes: Uint8Array) {
  const json = glbJson(bytes)
  if (!json) return

  const entries: Array<{ path: string; extras: unknown }> = []
  const visit = (value: unknown, path: string) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`))
      return
    }
    if (!isRecord(value)) return
    if (
      'extras' in value &&
      value.extras !== undefined &&
      (!isRecord(value.extras) || Object.keys(value.extras).length > 0)
    ) {
      entries.push({ path: `${path}.extras`, extras: value.extras })
    }
    for (const [key, child] of Object.entries(value)) {
      if (key !== 'extras') visit(child, `${path}.${key}`)
    }
  }
  visit(json, '$')

  console.groupCollapsed(`Imported GLB extras (${entries.length})`)
  console.log(entries)
  console.groupEnd()
}

function seamGroupsFromGlb(bytes: Uint8Array, edgeColor: number, lineWidth = 2): Array<THREE.Group | undefined> {
  const json = glbJson(bytes)
  const extensions = isRecord(json?.extensions) ? json.extensions : undefined
  const brep = isRecord(extensions?.KITTYCAD_boundary_representation)
    ? extensions.KITTYCAD_boundary_representation
    : undefined
  if (!brep) {
    console.log('[brep-edges] GLB has no KITTYCAD_boundary_representation extension')
    return []
  }

  const solids = recordArray(brep.solids)
  const shells = recordArray(brep.shells)
  const faces = recordArray(brep.faces)
  const loops = recordArray(brep.loops)
  const edges = recordArray(brep.edges)
  const curves = recordArray(brep.curves3D)

  // Curve-type census helps spot solids whose edges can't be sampled.
  const curveTypes = new Map<string, number>()
  for (const curve of curves) {
    const type = String(curve.type)
    curveTypes.set(type, (curveTypes.get(type) ?? 0) + 1)
  }

  // Sample every edge's 3D curve once, up front.
  const edgeSamples = edges.map((edge) => {
    const curveId = orientedIndex(edge.curve)
    if (curveId === undefined || !curves[curveId]) return []
    return sampleBrepCurve(curves[curveId], edge.t)
  })

  // Pass 1: per-solid edge references and trace-marked seams.
  const perSolid = solids.map((solid) => {
    const referenced = new Set<number>()
    const seams = new Set<number>()
    for (const shellId of orientedIndexes(solid.shells)) {
      const shell = shells[shellId]
      if (!shell) continue
      for (const faceId of orientedIndexes(shell.faces)) {
        const face = faces[faceId]
        if (!face) continue
        for (const loopId of orientedIndexes(face.loops)) {
          const loop = loops[loopId]
          if (!loop || !Array.isArray(loop.edges)) continue
          for (const edgeId of orientedIndexes(loop.edges)) referenced.add(edgeId)
          if (!Array.isArray(loop.traces)) continue
          for (let index = 0; index < loop.traces.length; index += 1) {
            const trace = loop.traces[index]
            if (!isRecord(trace) || trace.relation !== 'seam') continue
            const edgeId = orientedIndex(loop.edges[index])
            if (edgeId !== undefined) seams.add(edgeId)
          }
        }
      }
    }
    return { referenced, seams }
  })

  // Pass 2: orphan edges.  Production Engine strips seam trims from loops while
  // retaining their 3D edge curves (e.g. the lengthwise seam of a cylinder), so
  // they are referenced by no solid.  Attribute each orphan to the solid whose
  // referenced-edge bounding box is nearest -- otherwise thin revolved solids
  // (wires, strings, pins) lose their most visible edge lines.
  const globallyReferenced = new Set<number>()
  for (const s of perSolid) for (const id of s.referenced) globallyReferenced.add(id)

  const solidBoxes = perSolid.map(({ referenced }) => {
    const box = new THREE.Box3()
    for (const edgeId of referenced) {
      for (const point of edgeSamples[edgeId] ?? []) box.expandByPoint(point)
    }
    return box
  })

  for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
    if (globallyReferenced.has(edgeId)) continue
    const points = edgeSamples[edgeId]
    if (!points || points.length === 0) continue
    const mid = points[Math.floor(points.length / 2)]
    let best = -1
    let bestDist = Infinity
    for (let si = 0; si < solidBoxes.length; si += 1) {
      if (solidBoxes[si].isEmpty()) continue
      const dist = solidBoxes[si].distanceToPoint(mid)
      if (dist < bestDist) {
        bestDist = dist
        best = si
      }
    }
    if (best >= 0) perSolid[best].seams.add(edgeId)
  }

  // Pass 3: build line groups.  Render referenced boundary edges and seams.
  let renderedEdges = 0
  let unsampledEdges = 0
  const groups = perSolid.map(({ referenced, seams }) => {
    const edgeIds = new Set([...referenced, ...seams])
    const group = new THREE.Group()
    group.name = 'brep-seams'
    for (const edgeId of edgeIds) {
      const edge = edges[edgeId]
      if (!edge) continue
      const points = edgeSamples[edgeId]
      if (!points || points.length < 2) {
        unsampledEdges += 1
        continue
      }
      const segments: THREE.Vector3[] = []
      for (let index = 1; index < points.length; index += 1) {
        segments.push(points[index - 1], points[index])
      }

      const positions = new Float32Array(segments.length * 3)
      for (let si = 0; si < segments.length; si++) {
        positions[si * 3] = segments[si].x
        positions[si * 3 + 1] = segments[si].y
        positions[si * 3 + 2] = segments[si].z
      }
      const geometry = new LineSegmentsGeometry().setPositions(positions)
      const material = new LineMaterial({
        color: edgeColor,
        linewidth: lineWidth,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        opacity: 0.9,
        resolution: new THREE.Vector2(1, 1), // updated by refreshInteractiveEdges
        // Pull lines toward the camera to avoid z-fighting with the faces they
        // lie on (LineSegments2 rasterises triangles, so polygon offset works).
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      })
      const lines = new LineSegments2(geometry, material)
      lines.renderOrder = 2
      // Edges without a UUID still render (engine draws all edges) but are not
      // raycast targets for hover/selection.
      const uuid = brepEntityUuid(edge)
      if (uuid) {
        lines.name = 'brep-surface-edge'
        lines.userData.edgeUuid = uuid
      } else {
        lines.name = 'brep-seam-edge'
      }
      group.add(lines)
      renderedEdges += 1
    }
    return group.children.length > 0 ? group : undefined
  })

  const orphanCount = edges.length - globallyReferenced.size
  console.log(
    `[brep-edges] solids=${solids.length} faces=${faces.length} edges=${edges.length} ` +
    `referenced=${globallyReferenced.size} orphan=${orphanCount} ` +
    `rendered=${renderedEdges} unsampled=${unsampledEdges} ` +
    `curves=${JSON.stringify(Object.fromEntries(curveTypes))}`
  )

  // Self-diagnosing checks: flag data problems loudly instead of dumping JSON.
  {
    // Overall extent of all sampled edge geometry.
    const allBox = new THREE.Box3()
    for (const points of edgeSamples) for (const p of points) allBox.expandByPoint(p)
    const diag = allBox.isEmpty() ? 0 : allBox.getSize(new THREE.Vector3()).length()

    let linesMissingT = 0
    let stubbyLines = 0
    let totalLines = 0
    const lineLengths: number[] = []
    for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
      const curveId = orientedIndex(edges[edgeId].curve)
      if (curveId === undefined || curves[curveId]?.type !== 'line') continue
      totalLines += 1
      if (numberTuple(edges[edgeId].t, 2) === undefined) linesMissingT += 1
      const points = edgeSamples[edgeId]
      if (points && points.length >= 2) {
        const len = points[0].distanceTo(points[points.length - 1])
        lineLengths.push(len)
        if (diag > 0 && len < diag * 0.001) stubbyLines += 1
      }
    }
    lineLengths.sort((a, b) => a - b)
    const median = lineLengths[Math.floor(lineLengths.length / 2)] ?? 0

    if (linesMissingT > 0) {
      console.warn(
        `[brep-edges] PROBLEM: ${linesMissingT}/${totalLines} line edges have no 't' interval -- ` +
        `they render as unit-length stubs, not full edges`
      )
    }
    if (stubbyLines > 0) {
      console.warn(
        `[brep-edges] PROBLEM: ${stubbyLines}/${totalLines} line edges are <0.1% of the model ` +
        `extent (${diag.toFixed(1)}) -- likely wrong t units. ` +
        `line lengths: min=${lineLengths[0]?.toFixed(3)} median=${median.toFixed(3)} max=${lineLengths[lineLengths.length - 1]?.toFixed(3)}`
      )
    }
  }
  if (unsampledEdges > 0) {
    const unsupported = new Map<string, number>()
    for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
      if ((edgeSamples[edgeId]?.length ?? 0) >= 2) continue
      const curveId = orientedIndex(edges[edgeId].curve)
      const type = curveId !== undefined && curves[curveId] ? String(curves[curveId].type) : 'missing-curve'
      unsupported.set(type, (unsupported.get(type) ?? 0) + 1)
    }
    console.log('[brep-edges] unsampled curve types:', Object.fromEntries(unsupported))
  }
  return groups
}

/**
 * B-rep 3D curves are stored in solid-local space, while glTF instance nodes
 * (e.g. KCL pattern copies) carry the transforms that place each solid in the
 * scene.  Apply each solid's node world matrix to its seam-line group so edge
 * lines land on the geometry instead of at the un-transformed origin.
 */
function applySolidNodeTransforms(scene: THREE.Group, seamGroups: Array<THREE.Group | undefined>) {
  scene.updateMatrixWorld(true)
  const applied = new Set<number>()
  scene.traverse((object) => {
    const gltfExtensions = recordFromValue(object.userData.gltfExtensions)
    const nodeBrep = recordFromValue(gltfExtensions?.KITTYCAD_boundary_representation)
    const solidId = orientedIndex(nodeBrep?.solid)
    if (solidId === undefined || applied.has(solidId)) return
    const group = seamGroups[solidId]
    if (!group) return
    applied.add(solidId)
    group.applyMatrix4(object.matrixWorld)
  })
}

function assignFaceUuids(scene: THREE.Group, bytes: Uint8Array) {
  const json = glbJson(bytes)
  const extensions = isRecord(json?.extensions) ? json.extensions : undefined
  const brep = isRecord(extensions?.KITTYCAD_boundary_representation)
    ? extensions.KITTYCAD_boundary_representation
    : undefined
  if (!brep) return

  const solids = recordArray(brep.solids)
  const shells = recordArray(brep.shells)
  const faces = recordArray(brep.faces)
  scene.traverse((object) => {
    const gltfExtensions = recordFromValue(object.userData.gltfExtensions)
    const nodeBrep = recordFromValue(gltfExtensions?.KITTYCAD_boundary_representation)
    const solidId = orientedIndex(nodeBrep?.solid)
    const solid = solidId === undefined ? undefined : solids[solidId]
    if (!solid) return

    const faceIds = orientedIndexes(solid.shells).flatMap((shellId) => orientedIndexes(shells[shellId]?.faces))
    const meshes = meshesIn(object)
    if (meshes.length !== faceIds.length) return
    meshes.forEach((mesh, index) => {
      const face = faces[faceIds[index]]
      const uuid = face && brepEntityUuid(face)
      if (uuid) mesh.userData.faceUuid = uuid
    })
  })
}

function brepEntityUuid(entity: Record<string, unknown>): string | undefined {
  const extras = recordFromValue(entity.extras)
  const kittycad = recordFromValue(extras?.KITTYCAD)
  for (const value of [kittycad?.uuid, extras?.uuid, entity.uuid]) {
    if (typeof value === 'string' && value) return value
  }
  return undefined
}

function recordFromValue(value: unknown): Record<string, unknown> | undefined {
  if (isRecord(value)) return value
  if (typeof value !== 'string') return undefined
  try {
    const parsed = JSON.parse(value)
    return isRecord(parsed) ? parsed : undefined
  } catch {
    return undefined
  }
}

function sampleBrepCurve(curve: Record<string, unknown>, intervalValue: unknown): THREE.Vector3[] {
  const interval = numberTuple(intervalValue, 2) ?? [0, 1]
  const [start, end] = interval
  const type = curve.type
  const geometry = typeof type === 'string' && isRecord(curve[type]) ? curve[type] : undefined
  if (!geometry) return []

  if (type === 'line') {
    const origin = vector3(geometry.origin) ?? new THREE.Vector3()
    const direction = vector3(geometry.direction)
    if (!direction) return []
    return [origin.clone().addScaledVector(direction, start), origin.clone().addScaledVector(direction, end)]
  }

  if (type === 'circle') {
    const origin = vector3(geometry.origin) ?? new THREE.Vector3()
    const xAxis = vector3(geometry.xAxis) ?? new THREE.Vector3(1, 0, 0)
    const yAxis = vector3(geometry.yAxis) ?? new THREE.Vector3(0, 1, 0)
    if (typeof geometry.radius !== 'number') return []
    const count = Math.max(8, Math.ceil(Math.abs(end - start) / (Math.PI * 2) * 64))
    return Array.from({ length: count + 1 }, (_, index) => {
      const t = THREE.MathUtils.lerp(start, end, index / count)
      return origin
        .clone()
        .addScaledVector(xAxis, geometry.radius as number * Math.cos(t))
        .addScaledVector(yAxis, geometry.radius as number * Math.sin(t))
    })
  }

  if (type === 'nurbs') {
    const order = geometry.order
    const knots = numberArray(geometry.knotVector)
    const points = Array.isArray(geometry.controlPoints) ? geometry.controlPoints : []
    const weights = numberArray(geometry.weights)
    if (typeof order !== 'number' || order < 2 || knots.length === 0 || points.length === 0) return []
    const controls = points.flatMap((point, index) => {
      const xyz = numberTuple(point, 3)
      return xyz ? [new THREE.Vector4(xyz[0], xyz[1], xyz[2], weights[index] ?? 1)] : []
    })
    if (controls.length !== points.length) return []
    try {
      return Array.from({ length: 65 }, (_, index) => {
        const u = THREE.MathUtils.lerp(start, end, index / 64)
        const point = calcBSplinePoint(order - 1, knots, controls, u)
        if (point.w !== 0 && point.w !== 1) point.divideScalar(point.w)
        return new THREE.Vector3(point.x, point.y, point.z)
      })
    } catch {
      return []
    }
  }

  return []
}

function glbJson(bytes: Uint8Array): Record<string, unknown> | undefined {
  if (bytes.byteLength < 20) return undefined
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (view.getUint32(0, true) !== 0x46546c67) return undefined

  let offset = 12
  while (offset + 8 <= bytes.byteLength) {
    const length = view.getUint32(offset, true)
    const type = view.getUint32(offset + 4, true)
    offset += 8
    if (offset + length > bytes.byteLength) return undefined
    if (type === 0x4e4f534a) {
      try {
        const text = new TextDecoder().decode(bytes.subarray(offset, offset + length)).replace(/\0+$/, '').trim()
        const value = JSON.parse(text)
        return isRecord(value) ? value : undefined
      } catch {
        return undefined
      }
    }
    offset += length
  }
  return undefined
}

function recordArray(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? value.filter(isRecord) : []
}

function orientedIndexes(value: unknown): number[] {
  return Array.isArray(value) ? value.flatMap((item) => orientedIndex(item) ?? []) : []
}

function orientedIndex(value: unknown): number | undefined {
  const index = Array.isArray(value) ? value[0] : value
  return typeof index === 'number' && Number.isInteger(index) && index >= 0 ? index : undefined
}

function numberArray(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((item): item is number => typeof item === 'number') : []
}

function numberTuple(value: unknown, length: number): number[] | undefined {
  const values = numberArray(value)
  return values.length === length ? values : undefined
}

function vector3(value: unknown): THREE.Vector3 | undefined {
  const values = numberTuple(value, 3)
  return values ? new THREE.Vector3(values[0], values[1], values[2]) : undefined
}

function boxCorners(box: THREE.Box3): THREE.Vector3[] {
  return [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isMesh(value: THREE.Object3D): value is THREE.Mesh {
  return value instanceof THREE.Mesh
}

function isLineSegments(value: THREE.Object3D): value is THREE.LineSegments {
  return value instanceof THREE.LineSegments
}

function materialHasColor(material: THREE.Material): material is THREE.Material & { color: THREE.Color } {
  return 'color' in material && material.color instanceof THREE.Color
}

function meshesIn(object: THREE.Object3D): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = []
  object.traverse((child) => {
    if (isMesh(child)) meshes.push(child)
  })
  return meshes
}

function objectMatchesId(object: THREE.Object3D, id: string): boolean {
  const lowerId = id.toLowerCase()
  let current: THREE.Object3D | null = object
  while (current) {
    if (current.name.toLowerCase().includes(lowerId)) return true
    if (Object.values(current.userData).some((value) => String(value).toLowerCase().includes(lowerId))) return true
    current = current.parent
  }
  return false
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', toArrayBuffer(bytes)))
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function sourceRangeFromArtifact(artifact: ArtifactNode): SourceRange | undefined {
  const range = artifact.codeRef?.range ?? artifact.codeRef?.sourceRange ??
    artifact.code_ref?.range ?? artifact.code_ref?.source_range ??
    artifact.faceCodeRef?.range ?? artifact.faceCodeRef?.sourceRange ??
    artifact.face_code_ref?.range ?? artifact.face_code_ref?.source_range ??
    artifact.sourceRange ?? artifact.source_range
  if (
    Array.isArray(range) &&
    range.length === 3 &&
    range.every((n) => typeof n === 'number' && Number.isFinite(n))
  ) {
    return range as SourceRange
  }
  return undefined
}

function sourceRangeFromArtifactTree(graph: ArtifactGraph, artifactId: string): SourceRange | undefined {
  const queue = [artifactId]
  const visited = new Set<string>()
  while (queue.length > 0) {
    const currentId = queue.shift()!
    if (visited.has(currentId)) continue
    visited.add(currentId)
    const artifact = graph[currentId]
    if (!artifact) continue
    const range = sourceRangeFromArtifact(artifact)
    if (range) return range

    for (const [parentId, parent] of Object.entries(graph)) {
      if (!visited.has(parentId) && artifactContainsUuid(parent, currentId)) queue.push(parentId)
    }
  }
  return undefined
}

function artifactContainsUuid(artifact: ArtifactNode, uuid: string): boolean {
  return valueContainsUuid(artifact, uuid, new Set())
}

function valueContainsUuid(value: unknown, uuid: string, visited: Set<object>): boolean {
  if (value === uuid) return true
  if (!value || typeof value !== 'object' || visited.has(value)) return false
  visited.add(value)
  return Object.values(value).some((nested) => valueContainsUuid(nested, uuid, visited))
}
