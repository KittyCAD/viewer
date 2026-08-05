/**
 * Zoo Engine PBR Material for Three.js
 *
 * Direct port of the engine's Cook-Torrance PBR shader (pbrBasic.slang)
 * to a Three.js ShaderMaterial. Supports both uniform-based and texture-mapped
 * PBR rendering with the same BRDF math used in the engine.
 *
 * Reference: https://learnopengl.com/PBR/Theory
 */

import * as THREE from 'three'

const MAX_LIGHTS = 8

// ---------------------------------------------------------------------------
// Vertex shader
//
// Three.js injects: modelMatrix, viewMatrix, projectionMatrix,
// modelViewMatrix, normalMatrix, cameraPosition, position, normal, uv
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vTexCoord;

#ifdef USE_TANGENT
attribute vec4 tangent;
varying mat3 vTBN;
#endif

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vTexCoord = uv;

#ifdef USE_TANGENT
    vec3 T = normalize((modelMatrix * vec4(tangent.xyz, 0.0)).xyz);
    vec3 N = vNormal;
    vec3 B = normalize(cross(N, T)) * tangent.w;
    vTBN = mat3(T, B, N);
#endif

    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

// ---------------------------------------------------------------------------
// Fragment shader
// ---------------------------------------------------------------------------

const fragmentShader = /* glsl */ `
#define PI 3.14159265359
#define EPSILON 1.0e-5
#define MAX_LIGHTS ${MAX_LIGHTS}

// --- Light & scene uniforms (matches engine SceneState / LightState) ---
uniform vec3 uCameraPosition;
uniform bool uIsOrtho;

uniform int uNumLights;
uniform vec3  uLightPositions[MAX_LIGHTS];
uniform vec3  uLightDirections[MAX_LIGHTS];
uniform vec3  uLightRadiances[MAX_LIGHTS];
uniform bool  uLightIsDirectional[MAX_LIGHTS];
uniform bool  uLightEnabled[MAX_LIGHTS];

// --- Material uniforms (uniform mode) ---
uniform vec4  uAlbedo;
uniform vec4  uBackFaceAlbedo;
uniform float uMetalness;
uniform float uRoughness;
uniform float uAo;
uniform float uOpacity;

// --- Material textures (textured mode) ---
uniform bool uUseTextures;
uniform sampler2D uAlbedoMap;
uniform sampler2D uNormalMap;
uniform sampler2D uMetallicMap;
uniform sampler2D uRoughnessMap;
uniform sampler2D uAoMap;
uniform float uExposureBias;

// --- Varyings ---
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vTexCoord;

#ifdef USE_TANGENT
varying mat3 vTBN;
#endif

// ---------------------------------------------------------------------------
// BRDF functions -- direct port from pbrBasic.slang
// ---------------------------------------------------------------------------

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

float distributionGGX(vec3 N, vec3 H, float roughness) {
    float a  = roughness * roughness;
    float a2 = a * a;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float num   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;
    return num / (denom + EPSILON);
}

float geometrySchlickGGX(float NdotV, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;
    return NdotV / (NdotV * (1.0 - k) + k);
}

float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    return geometrySchlickGGX(NdotV, roughness)
         * geometrySchlickGGX(NdotL, roughness);
}

vec3 cameraForward() {
    return mat3(viewMatrix) * vec3(0.0, 0.0, -1.0);
}

// ---------------------------------------------------------------------------
// Core PBR evaluation -- direct port of evalPbr() from pbrBasic.slang
// ---------------------------------------------------------------------------

vec3 evalPbr(vec3 surfacePosition, vec3 surfaceNormal,
             vec3 albedo, float metallic, float roughness, float ao) {
    vec3 N = surfaceNormal;
    vec3 V = uIsOrtho
        ? -cameraForward()
        : normalize(uCameraPosition - surfacePosition);

    vec3 F0 = mix(vec3(0.04), albedo, metallic);

    vec3 Lo = vec3(0.0);
    for (int i = 0; i < MAX_LIGHTS; ++i) {
        if (i >= uNumLights) break;
        if (!uLightEnabled[i]) continue;

        vec3 L;
        vec3 radiance;
        if (uLightIsDirectional[i]) {
            L = normalize(-uLightDirections[i]);
            radiance = uLightRadiances[i];
        } else {
            vec3 d     = uLightPositions[i] - surfacePosition;
            float dist = length(d);
            L = d / dist;
            float attenDist = 0.01 * dist;
            radiance = uLightRadiances[i] / (attenDist * attenDist);
        }

        vec3  H = normalize(V + L);
        float NDF = distributionGGX(N, H, roughness);
        float G   = geometrySmith(N, V, L, roughness);
        vec3  F   = fresnelSchlick(max(dot(H, V), 0.0), F0);
        vec3  kD  = (1.0 - F) * (1.0 - metallic);
        float NdotL = max(dot(N, L), 0.0);
        float NdotV = max(dot(N, V), 0.0);
        vec3  brdf  = (NDF * G * F) / (4.0 * NdotV * NdotL + EPSILON);
        Lo += (kD * albedo / PI + brdf) * radiance * NdotL;
    }

    return 0.03 * albedo * ao + Lo;
}

void main() {
    float facingSign = gl_FrontFacing ? 1.0 : -1.0;

    vec3  albedo;
    float metallic;
    float roughness;
    float ao;
    vec3  normal;

    if (uUseTextures) {
#ifdef USE_TANGENT
        vec3 localN = texture2D(uNormalMap, vTexCoord).rgb * 2.0 - 1.0;
        normal = normalize(vTBN * localN) * facingSign;
#else
        normal = normalize(vNormal) * facingSign;
#endif
        albedo    = pow(texture2D(uAlbedoMap, vTexCoord).rgb, vec3(2.2));
        metallic  = texture2D(uMetallicMap, vTexCoord).r;
        roughness = texture2D(uRoughnessMap, vTexCoord).r;
        ao        = texture2D(uAoMap, vTexCoord).r;
    } else {
        vec4 albedoVec = gl_FrontFacing ? uAlbedo : uBackFaceAlbedo;
        albedo    = albedoVec.rgb;
        metallic  = uMetalness;
        roughness = uRoughness;
        ao        = uAo;
        normal    = normalize(vNormal) * facingSign;
    }

    vec3 color = evalPbr(vWorldPosition, normal, albedo, metallic, roughness, ao);

    // Reinhard tone mapping
    color = color / (color + 1.0);

    // Gamma correction
    float gamma = 2.2 + (uUseTextures ? uExposureBias : 0.0);
    color = pow(color, vec3(1.0 / gamma));

    gl_FragColor = vec4(color, uOpacity);
}
`

// ---------------------------------------------------------------------------
// Light description passed to setLights()
// ---------------------------------------------------------------------------

export interface ZooLight {
  position?: THREE.Vector3
  direction?: THREE.Vector3
  radiance?: THREE.Vector3
  isDirectional?: boolean
  enabled?: boolean
}

// ---------------------------------------------------------------------------
// ZooPBRMaterial
// ---------------------------------------------------------------------------

function makeDefaultUniforms() {
  const positions: THREE.Vector3[] = []
  const directions: THREE.Vector3[] = []
  const radiances: THREE.Vector3[] = []
  const isDirs: boolean[] = []
  const enabled: boolean[] = []
  for (let i = 0; i < MAX_LIGHTS; i++) {
    positions.push(new THREE.Vector3())
    directions.push(new THREE.Vector3(0, -1, 0))
    radiances.push(new THREE.Vector3())
    isDirs.push(false)
    enabled.push(false)
  }

  return {
    uCameraPosition: { value: new THREE.Vector3() },
    uIsOrtho: { value: false },
    uNumLights: { value: 0 },
    uLightPositions: { value: positions },
    uLightDirections: { value: directions },
    uLightRadiances: { value: radiances },
    uLightIsDirectional: { value: isDirs },
    uLightEnabled: { value: enabled },
    uAlbedo: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
    uBackFaceAlbedo: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
    uMetalness: { value: 0.6 },
    uRoughness: { value: 0.4 },
    uAo: { value: 0.1 },
    uOpacity: { value: 1.0 },
    uUseTextures: { value: false },
    uAlbedoMap: { value: null as THREE.Texture | null },
    uNormalMap: { value: null as THREE.Texture | null },
    uMetallicMap: { value: null as THREE.Texture | null },
    uRoughnessMap: { value: null as THREE.Texture | null },
    uAoMap: { value: null as THREE.Texture | null },
    uExposureBias: { value: 0.0 },
  }
}

export interface ZooPBRMaterialParams {
  albedo?: THREE.Color | number
  backFaceAlbedo?: THREE.Color | number
  metalness?: number
  roughness?: number
  ao?: number
  albedoMap?: THREE.Texture
  normalMap?: THREE.Texture
  metallicMap?: THREE.Texture
  roughnessMap?: THREE.Texture
  aoMap?: THREE.Texture
  exposureBias?: number
}

export class ZooPBRMaterial extends THREE.ShaderMaterial {
  /** Expose a mutable color so Three.js helpers (hover, etc.) can read/write it. */
  declare color: THREE.Color

  constructor(params: ZooPBRMaterialParams = {}) {
    const hasTextures = !!(
      params.albedoMap ??
      params.normalMap ??
      params.metallicMap ??
      params.roughnessMap ??
      params.aoMap
    )

    const defines: Record<string, string> = {}
    if (hasTextures) defines['USE_TANGENT'] = ''

    super({
      vertexShader,
      fragmentShader,
      uniforms: makeDefaultUniforms(),
      side: THREE.DoubleSide,
      defines,
    })

    // Alias `color` for compatibility with Three.js hover/selection code that
    // checks `material.color instanceof THREE.Color`.
    const col = params.albedo instanceof THREE.Color
      ? params.albedo.clone()
      : new THREE.Color(params.albedo ?? 0x808080)
    Object.defineProperty(this, 'color', {
      get: () => col,
      set: (c: THREE.Color) => {
        col.copy(c)
        this.uniforms.uAlbedo.value.set(col.r, col.g, col.b, 1.0)
      },
      enumerable: true,
      configurable: true,
    })
    this.uniforms.uAlbedo.value.set(col.r, col.g, col.b, 1.0)

    if (params.backFaceAlbedo != null) {
      const bc =
        params.backFaceAlbedo instanceof THREE.Color
          ? params.backFaceAlbedo
          : new THREE.Color(params.backFaceAlbedo)
      this.uniforms.uBackFaceAlbedo.value.set(bc.r, bc.g, bc.b, 1.0)
    } else {
      this.uniforms.uBackFaceAlbedo.value.copy(this.uniforms.uAlbedo.value)
    }

    if (params.metalness != null) this.uniforms.uMetalness.value = params.metalness
    if (params.roughness != null) this.uniforms.uRoughness.value = params.roughness
    if (params.ao != null) this.uniforms.uAo.value = params.ao

    if (hasTextures) {
      this.uniforms.uUseTextures.value = true
      if (params.albedoMap) this.uniforms.uAlbedoMap.value = params.albedoMap
      if (params.normalMap) this.uniforms.uNormalMap.value = params.normalMap
      if (params.metallicMap) this.uniforms.uMetallicMap.value = params.metallicMap
      if (params.roughnessMap) this.uniforms.uRoughnessMap.value = params.roughnessMap
      if (params.aoMap) this.uniforms.uAoMap.value = params.aoMap
      if (params.exposureBias != null) this.uniforms.uExposureBias.value = params.exposureBias
    }
  }

  /** Populate light uniforms directly.  */
  setLights(lights: ZooLight[]) {
    const n = Math.min(lights.length, MAX_LIGHTS)
    this.uniforms.uNumLights.value = n
    for (let i = 0; i < MAX_LIGHTS; i++) {
      if (i < n) {
        const l = lights[i]
        this.uniforms.uLightPositions.value[i].copy(l.position ?? new THREE.Vector3())
        this.uniforms.uLightDirections.value[i].copy(l.direction ?? new THREE.Vector3(0, -1, 0))
        this.uniforms.uLightRadiances.value[i].copy(l.radiance ?? new THREE.Vector3(1, 1, 1))
        this.uniforms.uLightIsDirectional.value[i] = !!l.isDirectional
        this.uniforms.uLightEnabled.value[i] = l.enabled !== false
      } else {
        this.uniforms.uLightEnabled.value[i] = false
      }
    }
  }

  /** Sync per-frame camera state. */
  updateCamera(camera: THREE.Camera) {
    this.uniforms.uCameraPosition.value.copy(camera.position)
    this.uniforms.uIsOrtho.value = camera instanceof THREE.OrthographicCamera
  }
}

/** Create a ZooPBRMaterial from a Three.js MeshStandardMaterial. */
export function zooPBRFromStandard(src: THREE.MeshStandardMaterial): ZooPBRMaterial {
  return new ZooPBRMaterial({
    albedo: src.color,
    metalness: src.metalness,
    roughness: src.roughness,
    albedoMap: src.map ?? undefined,
    normalMap: src.normalMap ?? undefined,
    metallicMap: src.metalnessMap ?? undefined,
    roughnessMap: src.roughnessMap ?? undefined,
    aoMap: src.aoMap ?? undefined,
  })
}

/**
 * Extract lights from a Three.js scene once per frame.
 * Pass the result to every ZooPBRMaterial.setLights() to avoid
 * redundant scene traversals.
 */
export function extractSceneLights(scene: THREE.Scene): ZooLight[] {
  const lights: ZooLight[] = []
  scene.traverse((obj: THREE.Object3D) => {
    if (lights.length >= MAX_LIGHTS) return
    if (obj instanceof THREE.DirectionalLight) {
      const dir = new THREE.Vector3()
      obj.getWorldDirection(dir)
      lights.push({
        position: obj.position.clone(),
        direction: dir,
        radiance: new THREE.Vector3(obj.color.r, obj.color.g, obj.color.b).multiplyScalar(obj.intensity),
        isDirectional: true,
        enabled: obj.visible,
      })
    } else if (obj instanceof THREE.PointLight) {
      lights.push({
        position: obj.position.clone(),
        direction: new THREE.Vector3(),
        radiance: new THREE.Vector3(obj.color.r, obj.color.g, obj.color.b).multiplyScalar(obj.intensity),
        isDirectional: false,
        enabled: obj.visible,
      })
    } else if (obj instanceof THREE.HemisphereLight) {
      const up = new THREE.Vector3(0, 0, 1)
      lights.push({
        direction: up.clone().negate(),
        radiance: new THREE.Vector3(obj.color.r, obj.color.g, obj.color.b).multiplyScalar(obj.intensity * 0.5),
        isDirectional: true,
        enabled: obj.visible,
      })
      if (lights.length < MAX_LIGHTS) {
        lights.push({
          direction: up,
          radiance: new THREE.Vector3(obj.groundColor.r, obj.groundColor.g, obj.groundColor.b).multiplyScalar(obj.intensity * 0.5),
          isDirectional: true,
          enabled: obj.visible,
        })
      }
    }
  })
  return lights
}

export { MAX_LIGHTS }
