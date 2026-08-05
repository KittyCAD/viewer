/**
 * Zoo Engine SSAO Pass for Three.js
 *
 * Direct port of the engine's SSAO shader (ssao.slang) to a Three.js
 * post-processing pass compatible with EffectComposer.
 *
 * Originally ported from Verto Studio's graphics engine, based on:
 * http://john-chapman-graphics.blogspot.com/2013/01/ssao-tutorial.html
 *
 * Pipeline:
 *   1. Normal + depth pre-pass (view-space normals, hardware depth texture)
 *   2. SSAO hemisphere sampling
 *   3. 4x4 box blur
 *   4. Composite (multiply scene color by occlusion)
 */

import * as THREE from 'three'
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'

// ---------------------------------------------------------------------------
// Constants matching the engine
// ---------------------------------------------------------------------------

const NOISE_SIZE = 4
const BLUR_SIZE = 4

// ---------------------------------------------------------------------------
// Normal pre-pass material (outputs view-space normals, like gbufferUtil.slang)
// ---------------------------------------------------------------------------

const normalVert = /* glsl */ `
varying vec3 vEyeNormal;
void main() {
    vEyeNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const normalFrag = /* glsl */ `
varying vec3 vEyeNormal;
void main() {
    vec3 n = normalize(vEyeNormal);
    gl_FragColor = vec4((n + 1.0) / 2.0, 1.0);
}
`

// ---------------------------------------------------------------------------
// SSAO sampling -- port of fragmentSSAO from ssao.slang
// ---------------------------------------------------------------------------

const ssaoVert = /* glsl */ `
varying vec2 vTexCoord;
void main() {
    vTexCoord = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// KERNEL_SIZE is injected via ShaderMaterial.defines to match the actual
// kernel size exactly -- no wasted loop iterations or dynamic break needed.
const ssaoFrag = /* glsl */ `
uniform mat4 uProjection;
uniform mat4 uProjectionInverse;
uniform float uSsaoPower;
uniform float uDepthBias;
uniform float uSampleRadius;
uniform vec3 uKernel[KERNEL_SIZE];

uniform sampler2D tNormals;
uniform sampler2D tDepth;
uniform sampler2D tNoise;

uniform vec2 uResolution;
uniform float uCameraNear;
uniform float uCameraFar;

varying vec2 vTexCoord;

float lineariseDepth(float d) {
    return uCameraNear * uCameraFar / (uCameraFar - d * (uCameraFar - uCameraNear));
}

vec3 viewSpacePos(vec2 tc) {
    float d = texture2D(tDepth, tc).r;
    float x = tc.x * 2.0 - 1.0;
    float y = tc.y * 2.0 - 1.0;
    float z = d * 2.0 - 1.0;
    vec4 clip = vec4(x, y, z, 1.0);
    vec4 view = uProjectionInverse * clip;
    return view.xyz / view.w;
}

void main() {
    vec2 noiseScale = uResolution / ${NOISE_SIZE.toFixed(1)};
    vec3 origin = viewSpacePos(vTexCoord);
    vec3 normal = normalize(texture2D(tNormals, vTexCoord).xyz * 2.0 - 1.0);

    vec3 rfloat  = texture2D(tNoise, vTexCoord * noiseScale).xyz * 2.0 - 1.0;
    vec3 tangent = normalize(rfloat - normal * dot(rfloat, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 tbn = mat3(tangent, bitangent, normal);

    float occlusion = 0.0;
    for (int i = 0; i < KERNEL_SIZE; i++) {
        vec3 samp = tbn * uKernel[i];
        samp = origin + samp * uSampleRadius;

        vec4 offset = uProjection * vec4(samp, 1.0);
        offset.xy /= offset.w;
        offset.xy = offset.xy * 0.5 + 0.5;

        float sampleZ = lineariseDepth(texture2D(tDepth, offset.xy).r) - uDepthBias;
        float rangeCheck = abs(-origin.z - sampleZ) < uSampleRadius ? 1.0 : 0.0;
        occlusion += (sampleZ <= -samp.z ? 1.0 : 0.0) * rangeCheck;
    }

    occlusion = 1.0 - occlusion / float(KERNEL_SIZE);
    occlusion = pow(occlusion, uSsaoPower);

    // Don't darken the sky / background (depth == 1)
    float rawDepth = texture2D(tDepth, vTexCoord).r;
    occlusion = mix(occlusion, 1.0, step(1.0, rawDepth));

    gl_FragColor = vec4(vec3(occlusion), 1.0);
}
`

// ---------------------------------------------------------------------------
// Blur -- port of fragmentSSAOBlur from ssao.slang
// ---------------------------------------------------------------------------

const blurFrag = /* glsl */ `
#define BLUR_SIZE ${BLUR_SIZE}

uniform sampler2D tSSAO;
uniform vec2 uTexSize;

varying vec2 vTexCoord;

void main() {
    vec2 texelSize = 1.0 / uTexSize;
    float result = 0.0;
    vec2 hlim = vec2(float(-BLUR_SIZE) * 0.5 + 0.5);
    for (int i = 0; i < BLUR_SIZE; ++i) {
        for (int j = 0; j < BLUR_SIZE; ++j) {
            vec2 offset = (hlim + vec2(float(i), float(j))) * texelSize;
            result += texture2D(tSSAO, vTexCoord + offset).r;
        }
    }
    gl_FragColor = vec4(vec3(result / float(BLUR_SIZE * BLUR_SIZE)), 1.0);
}
`

// ---------------------------------------------------------------------------
// Composite -- port of fragmentSSAOComposite from ssao.slang
// ---------------------------------------------------------------------------

const compositeFrag = /* glsl */ `
uniform sampler2D tColor;
uniform sampler2D tSSAOBlurred;

varying vec2 vTexCoord;

void main() {
    gl_FragColor = texture2D(tColor, vTexCoord) * texture2D(tSSAOBlurred, vTexCoord);
}
`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Hemisphere sample kernel (same distribution the engine uses on CPU). */
function generateSampleKernel(size: number): THREE.Vector3[] {
  const kernel: THREE.Vector3[] = []
  for (let i = 0; i < size; i++) {
    const v = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random(),
    )
    v.normalize()
    let scale = i / size
    scale = THREE.MathUtils.lerp(0.1, 1.0, scale * scale)
    v.multiplyScalar(scale)
    kernel.push(v)
  }
  return kernel
}

/** 4x4 noise texture for TBN randomisation. */
function generateNoiseTexture(): THREE.DataTexture {
  const size = NOISE_SIZE * NOISE_SIZE
  const data = new Float32Array(size * 4)
  for (let i = 0; i < size; i++) {
    data[i * 4 + 0] = Math.random() * 2 - 1
    data[i * 4 + 1] = Math.random() * 2 - 1
    data[i * 4 + 2] = 0
    data[i * 4 + 3] = 1
  }
  const tex = new THREE.DataTexture(data, NOISE_SIZE, NOISE_SIZE, THREE.RGBAFormat, THREE.FloatType)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.needsUpdate = true
  return tex
}

// ---------------------------------------------------------------------------
// ZooSSAOPass
// ---------------------------------------------------------------------------

export interface ZooSSAOParams {
  kernelSize?: number
  ssaoPower?: number
  depthBias?: number
  sampleRadius?: number
}

export class ZooSSAOPass extends Pass {
  scene: THREE.Scene
  camera: THREE.Camera
  width: number
  height: number

  kernelSize: number
  ssaoPower: number
  depthBias: number
  sampleRadius: number

  private kernel: THREE.Vector3[]
  private noiseTexture: THREE.DataTexture

  private normalRT: THREE.WebGLRenderTarget
  private ssaoRT: THREE.WebGLRenderTarget
  private ssaoBlurRT: THREE.WebGLRenderTarget

  private normalMaterial: THREE.ShaderMaterial
  private ssaoMaterial: THREE.ShaderMaterial
  private blurMaterial: THREE.ShaderMaterial
  private compositeMaterial: THREE.ShaderMaterial

  private ssaoQuad: FullScreenQuad
  private blurQuad: FullScreenQuad
  private compositeQuad: FullScreenQuad

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    width: number,
    height: number,
    params: ZooSSAOParams = {},
  ) {
    super()
    this.scene = scene
    this.camera = camera
    this.width = width
    this.height = height

    this.kernelSize = params.kernelSize ?? 32
    this.ssaoPower = params.ssaoPower ?? 1.0
    this.depthBias = params.depthBias ?? 0.025
    this.sampleRadius = params.sampleRadius ?? 0.5

    this.kernel = generateSampleKernel(this.kernelSize)
    this.noiseTexture = generateNoiseTexture()

    // --- Render targets ---

    // Normal pass -- also captures hardware depth via depthTexture.
    this.normalRT = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      type: THREE.HalfFloatType,
    })
    this.normalRT.depthTexture = new THREE.DepthTexture(width, height)
    this.normalRT.depthTexture.type = THREE.UnsignedIntType

    this.ssaoRT = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    })

    this.ssaoBlurRT = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    })

    // --- Materials ---

    this.normalMaterial = new THREE.ShaderMaterial({
      vertexShader: normalVert,
      fragmentShader: normalFrag,
    })

    this.ssaoMaterial = new THREE.ShaderMaterial({
      vertexShader: ssaoVert,
      fragmentShader: ssaoFrag,
      defines: { KERNEL_SIZE: String(this.kernelSize) },
      uniforms: {
        uProjection: { value: new THREE.Matrix4() },
        uProjectionInverse: { value: new THREE.Matrix4() },
        uSsaoPower: { value: this.ssaoPower },
        uDepthBias: { value: this.depthBias },
        uSampleRadius: { value: this.sampleRadius },
        uKernel: { value: this.kernel },
        tNormals: { value: null },
        tDepth: { value: null },
        tNoise: { value: this.noiseTexture },
        uResolution: { value: new THREE.Vector2(width, height) },
        uCameraNear: { value: 0.1 },
        uCameraFar: { value: 1000 },
      },
    })

    this.blurMaterial = new THREE.ShaderMaterial({
      vertexShader: ssaoVert,
      fragmentShader: blurFrag,
      uniforms: {
        tSSAO: { value: null },
        uTexSize: { value: new THREE.Vector2(width, height) },
      },
    })

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: ssaoVert,
      fragmentShader: compositeFrag,
      uniforms: {
        tColor: { value: null },
        tSSAOBlurred: { value: null },
      },
    })

    this.ssaoQuad = new FullScreenQuad(this.ssaoMaterial)
    this.blurQuad = new FullScreenQuad(this.blurMaterial)
    this.compositeQuad = new FullScreenQuad(this.compositeMaterial)
  }

  render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget,
  ) {
    const autoClear = renderer.autoClear
    renderer.autoClear = false

    const oldOverride = this.scene.overrideMaterial
    const oldBackground = this.scene.background

    // ---- Pass 0: view-space normals + depth texture ----
    this.scene.overrideMaterial = this.normalMaterial
    this.scene.background = null
    renderer.setRenderTarget(this.normalRT)
    renderer.clear()
    renderer.render(this.scene, this.camera)
    this.scene.overrideMaterial = oldOverride
    this.scene.background = oldBackground

    // ---- Pass 1: SSAO sampling ----
    const proj = (this.camera as THREE.PerspectiveCamera).projectionMatrix
    this.ssaoMaterial.uniforms.uProjection.value.copy(proj)
    this.ssaoMaterial.uniforms.uProjectionInverse.value.copy(proj).invert()
    this.ssaoMaterial.uniforms.tNormals.value = this.normalRT.texture
    this.ssaoMaterial.uniforms.tDepth.value = this.normalRT.depthTexture
    this.ssaoMaterial.uniforms.uSsaoPower.value = this.ssaoPower
    this.ssaoMaterial.uniforms.uDepthBias.value = this.depthBias
    this.ssaoMaterial.uniforms.uSampleRadius.value = this.sampleRadius
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.ssaoMaterial.uniforms.uCameraNear.value = this.camera.near
      this.ssaoMaterial.uniforms.uCameraFar.value = this.camera.far
    }

    renderer.setRenderTarget(this.ssaoRT)
    renderer.clear()
    this.ssaoQuad.render(renderer)

    // ---- Pass 2: blur ----
    this.blurMaterial.uniforms.tSSAO.value = this.ssaoRT.texture

    renderer.setRenderTarget(this.ssaoBlurRT)
    renderer.clear()
    this.blurQuad.render(renderer)

    // ---- Pass 3: composite ----
    this.compositeMaterial.uniforms.tColor.value = readBuffer.texture
    this.compositeMaterial.uniforms.tSSAOBlurred.value = this.ssaoBlurRT.texture

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
    } else {
      renderer.setRenderTarget(writeBuffer)
    }
    renderer.clear()
    this.compositeQuad.render(renderer)

    renderer.autoClear = autoClear
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
    this.normalRT.setSize(width, height)
    this.ssaoRT.setSize(width, height)
    this.ssaoBlurRT.setSize(width, height)
    this.ssaoMaterial.uniforms.uResolution.value.set(width, height)
    this.blurMaterial.uniforms.uTexSize.value.set(width, height)
  }

  dispose() {
    this.normalRT.dispose()
    this.ssaoRT.dispose()
    this.ssaoBlurRT.dispose()
    this.normalMaterial.dispose()
    this.ssaoMaterial.dispose()
    this.blurMaterial.dispose()
    this.compositeMaterial.dispose()
    this.noiseTexture.dispose()
    this.ssaoQuad.dispose()
    this.blurQuad.dispose()
    this.compositeQuad.dispose()
  }
}
