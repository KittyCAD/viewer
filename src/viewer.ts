import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { calcBSplinePoint } from 'three/examples/jsm/curves/NURBSUtils.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface CachedGlb {
  scene: THREE.Group
  seamGroups: Array<THREE.Group | undefined>
}

export interface ViewerOptions {
  backgroundColor?: number
  dynamicLighting?: boolean
  edgeColor?: number
  edgeHoverColor?: number
  edgeRaycastTolerancePixels?: number
  fitObjectsInView?: boolean
  frameFirstImport?: boolean
  mouseFollowLighting?: boolean
  onEdgeSelected?: (uuid: string) => void
}

export class Viewer {
  private readonly cachedGeometries = new WeakSet<THREE.BufferGeometry>()
  private readonly camera: THREE.PerspectiveCamera
  private readonly controls: OrbitControls
  private readonly edgePointer = new THREE.Vector2()
  private readonly edgePointerDown = new THREE.Vector2()
  private readonly edgeRaycaster = new THREE.Raycaster()
  private readonly edgeColor: number
  private readonly edgeHoverColor: number
  private readonly edgeRaycastTolerancePixels: number
  private readonly glbCache = new Map<string, Promise<CachedGlb>>()
  private readonly keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
  private readonly loader = new GLTFLoader()
  private readonly lightCenter = new THREE.Vector3()
  private readonly lightDirection = new THREE.Vector3(1, 0.65, 0).normalize()
  private readonly lightPointer = new THREE.Vector2()
  private readonly lightScreenRight = new THREE.Vector3()
  private readonly lightScreenUp = new THREE.Vector3()
  private readonly lightOrbitAxis = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).normalize()
  private readonly renderer: THREE.WebGLRenderer
  private readonly resizeObserver: ResizeObserver
  private readonly scene = new THREE.Scene()
  private readonly partGroups = new Map<string, THREE.Object3D>()
  private readonly onEdgeSelected: (uuid: string) => void
  private fitAnimation = 0
  private fitObjectsInView: boolean
  private frameFirstImport: boolean
  private hasFramedModel = false
  private edgePointerDragged = false
  private hoveredEdge: THREE.LineSegments | undefined
  private interactiveEdges: THREE.LineSegments[] = []
  private interactiveMeshes: THREE.Mesh[] = []
  private dynamicLighting: boolean
  private lightRadius = 6
  private mouseFollowLighting: boolean
  private model = new THREE.Group()

  constructor(private readonly container: HTMLElement, options: ViewerOptions = {}) {
    this.dynamicLighting = options.dynamicLighting ?? true
    this.edgeColor = options.edgeColor ?? 0x8f9aa8
    this.edgeHoverColor = options.edgeHoverColor ?? 0x78ffe4
    this.edgeRaycastTolerancePixels = options.edgeRaycastTolerancePixels ?? 7
    this.fitObjectsInView = options.fitObjectsInView ?? true
    this.frameFirstImport = options.frameFirstImport ?? true
    this.mouseFollowLighting = options.mouseFollowLighting ?? false
    this.onEdgeSelected = options.onEdgeSelected ?? (() => {})
    this.scene.background = new THREE.Color(options.backgroundColor ?? 0x080b11)
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x243044, 2.2))

    this.keyLight.position.set(4, 7, 6)
    this.scene.add(this.keyLight, this.keyLight.target)
    this.scene.add(this.model)

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000)
    this.camera.position.set(4, 3, 6)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.append(this.renderer.domElement)
    this.container.addEventListener('pointermove', (event) => {
      if (
        event.buttons !== 0 &&
        (event.clientX - this.edgePointerDown.x) ** 2 + (event.clientY - this.edgePointerDown.y) ** 2 > 25
      ) {
        this.edgePointerDragged = true
      }
      const bounds = this.container.getBoundingClientRect()
      this.lightPointer.set(
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
        1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2
      )
      this.updateHoveredEdge(event)
    })
    this.renderer.domElement.addEventListener('pointerdown', (event) => {
      this.edgePointerDown.set(event.clientX, event.clientY)
      this.edgePointerDragged = false
    })
    this.container.addEventListener('pointerleave', () => {
      this.lightPointer.set(0, 0)
      this.setHoveredEdge(undefined)
    })
    this.renderer.domElement.addEventListener('click', (event) => {
      if (this.edgePointerDragged) return
      const edge = this.edgeAt(event)
      const uuid = edge?.userData.edgeUuid
      if (typeof uuid === 'string') this.onEdgeSelected(uuid)
    })

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

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

  setLighting(dynamic: boolean, mouseFollow: boolean) {
    this.dynamicLighting = dynamic
    this.mouseFollowLighting = mouseFollow
  }

  setViewFitting(frameFirstImport: boolean, fitObjectsInView: boolean) {
    this.frameFirstImport = frameFirstImport
    this.fitObjectsInView = fitObjectsInView
  }

  meshCount(entityId: string): number {
    const group = this.partGroups.get(entityId)
    return group ? meshesIn(group).length : 0
  }

  fitModelOutwardSmooth() {
    if (!this.model) return

    const box = new THREE.Box3().setFromObject(this.model)
    if (box.isEmpty()) return
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    box.getCenter(this.lightCenter)
    this.lightRadius = Math.max(sphere.radius * 2.5, 4)

    if (!this.hasFramedModel) {
      this.hasFramedModel = true
      if (this.frameFirstImport) {
        this.animateFit(this.fitForBox(box, false))
        return
      }
    }

    if (!this.fitObjectsInView) return
    if (this.boxFitsView(box)) return

    this.animateFit(this.fitForBox(box))
  }

  clearModel() {
    this.setHoveredEdge(undefined)
    this.disposeObject(this.model)
    this.model.clear()
    this.partGroups.clear()
    this.hasFramedModel = false
    this.lightCenter.set(0, 0, 0)
    this.lightRadius = 6
    this.interactiveEdges = []
    this.interactiveMeshes = []
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
    this.interactiveEdges = []
    this.interactiveMeshes = []
    this.model.traverse((child) => {
      if (isMesh(child)) this.interactiveMeshes.push(child)
      if (isLineSegments(child) && child.name === 'brep-surface-edge') {
        this.interactiveEdges.push(child)
      }
    })
    if (this.hoveredEdge && !this.interactiveEdges.includes(this.hoveredEdge)) {
      this.setHoveredEdge(undefined)
    }
  }

  private updateHoveredEdge(event: PointerEvent) {
    const edge = this.edgeAt(event)
    this.setHoveredEdge(edge)
  }

  private edgeAt(event: MouseEvent | PointerEvent): THREE.LineSegments | undefined {
    if (this.interactiveEdges.length === 0) return undefined
    const bounds = this.renderer.domElement.getBoundingClientRect()
    this.edgePointer.set(
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
      1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2
    )
    const distance = this.camera.position.distanceTo(this.controls.target)
    const worldPerPixel =
      (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * distance) /
      Math.max(bounds.height, 1)
    this.edgeRaycaster.params.Line = { threshold: worldPerPixel * this.edgeRaycastTolerancePixels }
    this.edgeRaycaster.setFromCamera(this.edgePointer, this.camera)
    const edgeHit = this.edgeRaycaster.intersectObjects(this.interactiveEdges, false)[0]
    if (!edgeHit) return undefined
    const meshHit = this.edgeRaycaster.intersectObjects(this.interactiveMeshes, false)[0]
    if (meshHit && meshHit.distance < edgeHit.distance - worldPerPixel * 3) return undefined
    return edgeHit.object as THREE.LineSegments
  }

  private setHoveredEdge(edge: THREE.LineSegments | undefined) {
    if (edge === this.hoveredEdge) return
    this.setEdgeColor(this.hoveredEdge, this.edgeColor)
    this.hoveredEdge = edge
    this.setEdgeColor(edge, this.edgeHoverColor)
    this.renderer.domElement.style.cursor = edge ? 'pointer' : ''
  }

  private setEdgeColor(edge: THREE.LineSegments | undefined, color: number) {
    if (!edge || Array.isArray(edge.material) || !(edge.material instanceof THREE.LineBasicMaterial)) return
    edge.material.color.setHex(color)
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
    logGlbExtras(bytes)
    const seamGroups = seamGroupsFromGlb(bytes, this.edgeColor)
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
    }
    requestAnimationFrame(step)
  }

  private fitForBox(box: THREE.Box3, outwardOnly = true) {
    const center = box.getCenter(new THREE.Vector3())
    const sphere = box.getBoundingSphere(new THREE.Sphere())
    const halfVFov = THREE.MathUtils.degToRad(this.camera.fov / 2)
    const halfHFov = Math.atan(Math.tan(halfVFov) * Math.max(this.camera.aspect, 0.01))
    const requiredDistance = (sphere.radius / Math.sin(Math.min(halfVFov, halfHFov))) * 1.18
    const currentDistance = this.camera.position.distanceTo(center)
    const distance = outwardOnly
      ? Math.max(currentDistance, requiredDistance, 0.5)
      : Math.max(requiredDistance, 0.5)
    const direction = this.camera.position.clone().sub(this.controls.target)

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
      far: this.camera.far,
      near: this.camera.near,
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
    }
    const started = performance.now()
    const duration = 520

    const step = (now: number) => {
      const t = Math.min((now - started) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)

      this.camera.position.lerpVectors(start.position, target.position, eased)
      this.controls.target.lerpVectors(start.target, target.target, eased)
      this.camera.near = THREE.MathUtils.lerp(start.near, target.near, eased)
      this.camera.far = THREE.MathUtils.lerp(start.far, target.far, eased)
      this.camera.updateProjectionMatrix()
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
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  private updateKeyLight(time: number) {
    this.lightDirection.set(1, 0.65, 0).normalize()
    if (this.dynamicLighting) {
      this.lightDirection.applyAxisAngle(this.lightOrbitAxis, time * 0.00012)
    }
    if (this.mouseFollowLighting) {
      this.camera.updateMatrixWorld()
      this.lightScreenRight.setFromMatrixColumn(this.camera.matrixWorld, 0)
      this.lightScreenUp.setFromMatrixColumn(this.camera.matrixWorld, 1)
      this.lightDirection
        .addScaledVector(this.lightScreenRight, this.lightPointer.x)
        .addScaledVector(this.lightScreenUp, this.lightPointer.y)
        .normalize()
    }
    this.keyLight.position.copy(this.lightCenter).addScaledVector(this.lightDirection, this.lightRadius)
    this.keyLight.target.position.copy(this.lightCenter)
  }

  private animate = (time = 0) => {
    this.controls.update()
    this.updateKeyLight(time)
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

function seamGroupsFromGlb(bytes: Uint8Array, edgeColor: number): Array<THREE.Group | undefined> {
  const json = glbJson(bytes)
  const extensions = isRecord(json?.extensions) ? json.extensions : undefined
  const brep = isRecord(extensions?.KITTYCAD_boundary_representation)
    ? extensions.KITTYCAD_boundary_representation
    : undefined
  if (!brep) return []

  const solids = recordArray(brep.solids)
  const shells = recordArray(brep.shells)
  const faces = recordArray(brep.faces)
  const loops = recordArray(brep.loops)
  const edges = recordArray(brep.edges)
  const curves = recordArray(brep.curves3D)

  const groups = solids.map((solid) => {
    let hasTraceMetadata = false
    const referencedEdgeIds = new Set<number>()
    const seamEdgeIds = new Set<number>()
    for (const shellId of orientedIndexes(solid.shells)) {
      const shell = shells[shellId]
      if (!shell) continue
      for (const faceId of orientedIndexes(shell.faces)) {
        const face = faces[faceId]
        if (!face) continue
        for (const loopId of orientedIndexes(face.loops)) {
          const loop = loops[loopId]
          if (!loop || !Array.isArray(loop.edges)) continue
          for (const edgeId of orientedIndexes(loop.edges)) referencedEdgeIds.add(edgeId)
          if (!Array.isArray(loop.traces)) continue
          if (loop.traces.length > 0) hasTraceMetadata = true
          for (let index = 0; index < loop.traces.length; index += 1) {
            const trace = loop.traces[index]
            if (!isRecord(trace) || trace.relation !== 'seam') continue
            const edgeId = orientedIndex(loop.edges[index])
            if (edgeId !== undefined) seamEdgeIds.add(edgeId)
          }
        }
      }
    }

    // Production Engine currently strips seam trims while retaining their 3D edges.
    if (!hasTraceMetadata && solids.length === 1) {
      for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
        if (!referencedEdgeIds.has(edgeId)) seamEdgeIds.add(edgeId)
      }
    }

    // In B-rep terminology most visible surface boundaries are mates or boundaries,
    // not closed-surface "seam" trims. Render those edges as surface seams too.
    for (const edgeId of referencedEdgeIds) seamEdgeIds.add(edgeId)
    if (solids.length === 1) {
      for (let edgeId = 0; edgeId < edges.length; edgeId += 1) seamEdgeIds.add(edgeId)
    }

    const group = new THREE.Group()
    group.name = 'brep-seams'
    for (const edgeId of seamEdgeIds) {
      const edge = edges[edgeId]
      if (!edge) continue
      const uuid = brepEntityUuid(edge)
      if (!uuid) continue
      const curveId = orientedIndex(edge.curve)
      if (curveId === undefined || !curves[curveId]) continue
      const points = sampleBrepCurve(curves[curveId], edge.t)
      const segments: THREE.Vector3[] = []
      for (let index = 1; index < points.length; index += 1) {
        segments.push(points[index - 1], points[index])
      }
      if (segments.length === 0) continue

      const geometry = new THREE.BufferGeometry().setFromPoints(segments)
      const material = new THREE.LineBasicMaterial({
        color: edgeColor,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        opacity: 0.9,
      })
      const lines = new THREE.LineSegments(geometry, material)
      lines.name = 'brep-surface-edge'
      lines.renderOrder = 2
      lines.userData.edgeUuid = uuid
      group.add(lines)
    }
    return group.children.length > 0 ? group : undefined
  })
  return groups
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
