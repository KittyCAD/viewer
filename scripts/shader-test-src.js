import * as THREE from 'three'

document.title = 'stage1'

// --- Same patches as viewer.ts ---
{
  const attChunk = THREE.ShaderChunk.lights_pars_begin
  THREE.ShaderChunk.lights_pars_begin = attChunk.replace(
    'float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );',
    'float distanceFalloff = 1.0 / max( pow( 0.01 * lightDistance, decayExponent ), 1e-6 );'
  )
  const physChunk = THREE.ShaderChunk.lights_physical_fragment
  THREE.ShaderChunk.lights_physical_fragment = physChunk
    .replace('material.roughness += geometryRoughness;', '')
    .replace('max( roughnessFactor, 0.0525 )', 'max( roughnessFactor, 0.001 )')
  const bsdfChunk = THREE.ShaderChunk.lights_physical_pars_fragment
  let patched = bsdfChunk.replace(
    'float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n' +
    '\tfloat a2 = pow2( alpha );\n' +
    '\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n' +
    '\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n' +
    '\treturn 0.5 / max( gv + gl, EPSILON );\n' +
    '}',
    'float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n' +
    '\tfloat r = sqrt( alpha );\n' +
    '\tfloat k = pow2( r + 1.0 ) / 8.0;\n' +
    '\tfloat gv = dotNV / ( dotNV * ( 1.0 - k ) + k );\n' +
    '\tfloat gl = dotNL / ( dotNL * ( 1.0 - k ) + k );\n' +
    '\treturn gv * gl / max( 4.0 * dotNV * dotNL, EPSILON );\n' +
    '}'
  )
  patched = patched.replace(
    'reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n' +
    '\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );',
    'reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n' +
    '\tvec3 zooH = normalize( directLight.direction + geometryViewDir );\n' +
    '\tfloat zooVdH = saturate( dot( geometryViewDir, zooH ) );\n' +
    '\tvec3 zooF = material.specularColor + ( 1.0 - material.specularColor ) * pow( 1.0 - zooVdH, 5.0 );\n' +
    '\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor ) * ( 1.0 - zooF );'
  )
  THREE.ShaderChunk.lights_physical_pars_fragment = patched
  const csChunk = THREE.ShaderChunk.colorspace_fragment
  THREE.ShaderChunk.colorspace_fragment = csChunk.replace(
    'gl_FragColor = linearToOutputTexel( gl_FragColor );',
    'gl_FragColor = vec4( pow( clamp( gl_FragColor.rgb, 0.0, 1.0 ), vec3( 1.0 / 2.2 ) ), gl_FragColor.a );'
  )
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x080b11)
scene.add(new THREE.AmbientLight(0xffffff, 0.003))

const light0 = new THREE.PointLight(0xffffff, 0.32)
light0.position.set(-5, -30, 55)
light0.decay = 2
const light1 = new THREE.PointLight(0xffffff, 0.24)
light1.position.set(15, -8, -15)
light1.decay = 2
const cameraLight = new THREE.PointLight(0xffffff, 1)
cameraLight.decay = 2
scene.add(light0, light1, cameraLight)

const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0.55, 0.42, 0.30),
  metalness: 0.6,
  roughness: 0.4,
  side: THREE.DoubleSide,
})
const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.3), material)
box.position.set(0, 0, 0.15)
scene.add(box)

const camera = new THREE.PerspectiveCamera(45, 2, 0.01, 100)
camera.up.set(0, 0, 1)
camera.position.set(0, -2.8, 1.0)
camera.lookAt(0, 0, 0.15)

const dist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0.15))
const camDist = 0.015 * dist
cameraLight.position.copy(camera.position)
cameraLight.intensity = camDist * camDist * 0.6

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setSize(800, 400)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.0
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

const gl = renderer.getContext()
function sample(x, y) {
  const px = new Uint8Array(4)
  gl.readPixels(x, gl.drawingBufferHeight - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px)
  return [px[0], px[1], px[2]]
}
const report = {
  frontCenter: sample(400, 260),
  frontLeft: sample(180, 260),
  topCenter: sample(400, 150),
}
document.title = JSON.stringify(report)

// --- CPU reference: engine evalPbr (pbrBasic.slang) for the same points ---
function evalPbrEngine(P, N, albedo, metallic, roughness, ao, camPos, lights) {
  const sub = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]]
  const add = (a,b) => [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
  const mul = (a,s) => [a[0]*s,a[1]*s,a[2]*s]
  const mulv = (a,b) => [a[0]*b[0],a[1]*b[1],a[2]*b[2]]
  const dot = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
  const len = (a) => Math.hypot(a[0],a[1],a[2])
  const norm = (a) => mul(a, 1/len(a))
  const mix = (a,b,t) => a.map((v,i) => v*(1-t)+b[i]*t)

  const V = norm(sub(camPos, P))
  const F0 = mix([0.04,0.04,0.04], albedo, metallic)
  let Lo = [0,0,0]
  for (const light of lights) {
    let L, radiance
    if (light.directional) {
      L = norm(mul(light.direction, -1))
      radiance = light.radiance
    } else {
      const d = sub(light.position, P)
      const dist = len(d)
      L = mul(d, 1/dist)
      const attenDist = 0.01 * dist
      radiance = mul(light.radiance, 1/(attenDist*attenDist))
    }
    const H = norm(add(V, L))
    const NdotH = Math.max(dot(N,H), 0)
    const a = roughness*roughness, a2 = a*a
    let denom = NdotH*NdotH*(a2-1)+1
    const NDF = a2 / (Math.PI*denom*denom + 1e-5)
    const k = (roughness+1)**2/8
    const g1 = (x) => x/(x*(1-k)+k)
    const NdotV = Math.max(dot(N,V), 0)
    const NdotL = Math.max(dot(N,L), 0)
    const G = g1(NdotV)*g1(NdotL)
    const HdotV = Math.max(dot(H,V), 0)
    const F = F0.map(f => f + (1-f)*Math.pow(1-HdotV,5))
    const kD = F.map(f => (1-f)*(1-metallic))
    const brdfScale = NDF*G/(4*NdotV*NdotL + 1e-5)
    const brdf = mul(F, brdfScale)
    const diffuse = mulv(kD, mul(albedo, 1/Math.PI))
    Lo = add(Lo, mulv(add(diffuse, brdf), mul(radiance, NdotL)))
  }
  const ambient = mul(albedo, 0.03*ao)
  let c = add(ambient, Lo)
  c = c.map(v => v/(v+1))                    // Reinhard
  c = c.map(v => Math.pow(v, 1/2.2))         // gamma
  return c.map(v => Math.round(v*255))
}

const camPos = [camera.position.x, camera.position.y, camera.position.z]
const lights = [
  { position: [-5,-30,55], radiance: [0.32,0.32,0.32] },
  { position: [15,-8,-15], radiance: [0.24,0.24,0.24] },
  { position: camPos, radiance: [cameraLight.intensity, cameraLight.intensity, cameraLight.intensity] },
]
const albedo = [0.55, 0.42, 0.30]

// Sample specific 3D points on the front face (y=-0.2, normal (0,-1,0))
const testPoints = [
  { name: 'front-center', P: [0, -0.2, 0.15], N: [0,-1,0] },
  { name: 'front-left',   P: [-0.6, -0.2, 0.15], N: [0,-1,0] },
  { name: 'top-center',   P: [0, 0, 0.3], N: [0,0,1] },
]
const comparison = testPoints.map(({name, P, N}) => {
  const engine = evalPbrEngine(P, N, albedo, 0.6, 0.4, 0.1, camPos, lights)
  const proj = new THREE.Vector3(...P).project(camera)
  const sx = Math.round((proj.x + 1) / 2 * 800)
  const sy = Math.round((1 - proj.y) / 2 * 400)
  const gpu = sample(sx, sy)
  return { name, engineCPU: engine, threeGPU: Array.from(gpu), px: [sx, sy] }
})
document.title = JSON.stringify(comparison)
