import { Client } from '@kittycad/lib'
import { WebSocket as WebSocketEngine } from '@kittycad/lib-websocket-engine'
import { unzipSync } from 'fflate'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { calcBSplinePoint } from 'three/examples/jsm/curves/NURBSUtils.js'

interface EngineSettings {
  baseUrl?: string
  pool?: string
  token: string
}

interface ProjectInput {
  files: Map<string, string>
  mainKclPathName: string
  name: string
}

interface CachedGlb {
  scene: THREE.Group
  seamGroups: Array<THREE.Group | undefined>
}

type ExportMode = 'batch' | 'individual' | 'random-batches'

const els = {
  baseUrl: element<HTMLInputElement>('base-url'),
  bodies: element<HTMLOListElement>('bodies'),
  clear: element<HTMLButtonElement>('clear'),
  exportBatch: element<HTMLInputElement>('export-batch'),
  exportRandomBatches: element<HTMLInputElement>('export-random-batches'),
  file: element<HTMLInputElement>('file'),
  fitObjectsInView: element<HTMLInputElement>('fit-objects-in-view'),
  frameFirstImport: element<HTMLInputElement>('frame-first-import'),
  kcl: element<HTMLTextAreaElement>('kcl'),
  lightingDynamic: element<HTMLInputElement>('lighting-dynamic'),
  lightingMouseFollow: element<HTMLInputElement>('lighting-mouse-follow'),
  paste: element<HTMLButtonElement>('paste'),
  pool: element<HTMLInputElement>('pool'),
  run: element<HTMLButtonElement>('run'),
  status: element<HTMLOutputElement>('status'),
  token: element<HTMLInputElement>('token'),
  viewer: element<HTMLDivElement>('viewer'),
}

let viewer: Viewer
let engine: WebSocketEngine | undefined
let engineKey = ''
let selectedProject: ProjectInput | undefined
const sceneBodyIds = new Set<string>()

async function runKcl() {
  const kcl = els.kcl.value.trim()
  const input = selectedProject ?? {
    files: new Map([['main.kcl', kcl]]),
    mainKclPathName: 'main.kcl',
    name: 'textarea',
  }
  const settings = readSettings()

  if (input.files.size === 0 || !input.files.get(input.mainKclPathName)?.trim()) {
    setStatus('Add KCL source before executing.')
    return
  }

  if (!settings.token) {
    setStatus('Add a Zoo API token before connecting to the Engine API.')
    return
  }

  els.run.disabled = true

  try {
    setStatus('Connecting to Engine API...')
    const wse = await getEngine(settings)
    const exportScheduler = new ExportScheduler(wse, readExportMode())

    sceneBodyIds.clear()
    viewer.clearModel()
    renderBodies()
    setStatus(`Executing ${input.name} remotely...`)
    const poller = new SceneEntityPoller(wse, exportScheduler)
    const executionPromise = executeKclProject(wse, input)
    poller.start()
    let executionResponse: unknown
    try {
      executionResponse = await executionPromise
    } finally {
      await poller.stop()
    }
    const executionError = executionErrorMessage(executionResponse)
    if (executionError) {
      throw new Error(executionError)
    }
    renderBodies()
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error))
  } finally {
    els.run.disabled = false
  }
}

async function getEngine(settings: EngineSettings): Promise<WebSocketEngine> {
  const nextKey = JSON.stringify(settings)
  if (engine && nextKey === engineKey) return engine

  engine?.deconstructor()
  const client = new Client({ token: settings.token, baseUrl: settings.baseUrl })
  engine = new WebSocketEngine({
    client,
    fps: 24,
    pool: settings.pool,
    show_grid: true,
    webrtc: true,
    video_res_height: 720,
    video_res_width: 1280,
  })
  engineKey = nextKey
  await engine.start()
  return engine
}

async function requestSceneEntityIds(wse: WebSocketEngine): Promise<string[]> {
  const command = {
    type: 'modeling_cmd_req',
    cmd_id: crypto.randomUUID(),
    cmd: {
      type: 'scene_get_entity_ids',
      filter: ['solid3d'],
      skip: 0,
      take: 1000,
    },
  }

  return collectSceneEntityIds(await sendModelingCommandAndWait(wse, command))
}

async function executeKclProject(wse: WebSocketEngine, input: ProjectInput): Promise<unknown> {
  const requestId = crypto.randomUUID()
  const encoder = new TextEncoder()
  const request = {
    type: 'exec_kcl_project',
    request_id: requestId,
    project: {
      entrypoint: input.mainKclPathName,
      files: Array.from(input.files, ([path, contents]) => ({
        path,
        contents: Array.from(encoder.encode(contents)),
      })),
    },
  }

  return sendRequestAndWait(wse, request, requestId, 300_000)
}

async function exportGlb(wse: WebSocketEngine, entityIds: string[]): Promise<unknown> {
  const command = {
    type: 'modeling_cmd_req',
    cmd_id: crypto.randomUUID(),
    cmd: {
      type: 'export',
      entity_ids: entityIds,
      format: {
        type: 'gltf',
        storage: 'binary',
        presentation: 'compact',
      },
    },
  }

  return sendModelingCommandAndWait(wse, command)
}

class ModelingConnectionInterruptedError extends Error {
  constructor() {
    super('Modeling connection interrupted.')
  }
}

async function sendModelingCommandAndWait(wse: WebSocketEngine, command: { cmd_id: string }): Promise<unknown> {
  return sendRequestAndWait(wse, command, command.cmd_id, 30_000)
}

async function sendRequestAndWait(
  wse: WebSocketEngine,
  request: unknown,
  requestId: string,
  timeoutMs: number
): Promise<unknown> {
  const executor = wse.executor()
  const response = new Promise<unknown>((resolve, reject) => {
    let timeout = 0

    const onMessage = (ev: MessageEvent) => {
      const msg = ev.data
      if (!isRecord(msg) || msg.from !== 'websocket' || !isRecord(msg.payload)) return
      const parsed = parseMaybeJsonDeep(msg.payload.data)
      if (!isRecord(parsed) || parsed.request_id !== requestId) return

      window.clearTimeout(timeout)
      executor.removeEventListener(onMessage)
      if (isModelingConnectionInterrupted(parsed)) {
        reject(new ModelingConnectionInterruptedError())
        return
      }
      resolve(parsed)
    }

    timeout = window.setTimeout(() => {
      executor.removeEventListener(onMessage)
      reject(new Error(`Timed out waiting for Engine response ${requestId}.`))
    }, timeoutMs)

    executor.addEventListener(onMessage)
  })

  void wse.send(JSON.stringify(request))
  return response
}

class SceneEntityPoller {
  private active = false
  private error: unknown
  private loopPromise: Promise<void> | undefined

  constructor(
    private readonly wse: WebSocketEngine,
    private readonly scheduler: ExportScheduler
  ) {}

  start() {
    this.active = true
    this.loopPromise = this.run().catch((error: unknown) => {
      this.error = error
      this.active = false
    })
  }

  async stop() {
    this.active = false
    await this.loopPromise
    if (this.error) throw this.error
    const scheduledFinalExport = await this.poll(false)
    await this.scheduler.finish(scheduledFinalExport)
  }

  private async run() {
    while (this.active) {
      await this.poll()
      if (this.active) await delay(1000)
    }
  }

  private async poll(alwaysExport = true): Promise<boolean> {
    const ids = await requestSceneEntityIds(this.wse)
    const currentIds = new Set(ids)
    const newIds = ids.filter((id) => !sceneBodyIds.has(id))
    const removedIds = Array.from(sceneBodyIds).filter((id) => !currentIds.has(id))

    for (const id of removedIds) sceneBodyIds.delete(id)
    for (const id of newIds) sceneBodyIds.add(id)
    if (removedIds.length > 0) {
      viewer.removeEntityIds(removedIds)
    }
    const changed = newIds.length > 0 || removedIds.length > 0
    if (changed) renderBodies()
    if (alwaysExport || changed) this.scheduler.schedule(Array.from(sceneBodyIds))
    return alwaysExport || changed
  }
}

class ExportScheduler {
  private generation = 0
  private latestExport: Promise<void> | undefined
  private readonly pending = new Set<Promise<void>>()

  constructor(
    private readonly wse: WebSocketEngine,
    private readonly mode: ExportMode,
  ) {}

  schedule(entityIds: string[]) {
    this.latestExport = this.dispatch(entityIds)
    void this.latestExport.catch(() => {})
  }

  async finish(announceExport: boolean) {
    const entityIds = Array.from(sceneBodyIds)
    const finalExport = this.latestExport ?? this.dispatch(entityIds)
    const earlierExports = Array.from(this.pending).filter((task) => task !== finalExport)
    if (entityIds.length === 0) {
      await finalExport
      await Promise.allSettled(earlierExports)
      return
    }

    if (announceExport) {
      if (this.mode === 'individual') {
        setStatus(`Exporting ${entityIds.length} scene bodies individually...`)
      } else if (this.mode === 'random-batches') {
        setStatus(`Exporting ${entityIds.length} scene bodies in random batches of 10...`)
      } else {
        setStatus(`Exporting all ${entityIds.length} scene bodies in one batch...`)
      }
    }

    await finalExport
    await Promise.allSettled(earlierExports)
    renderBodies()
    setStatus(`Loaded ${entityIds.length} scene bodies.`)
  }

  private dispatch(entityIds: string[]): Promise<void> {
    const generation = ++this.generation
    const task = this.exportSnapshot(entityIds, generation).finally(() => this.pending.delete(task))
    this.pending.add(task)
    return task
  }

  private async exportSnapshot(entityIds: string[], generation: number) {
    if (entityIds.length === 0) return
    if (this.mode === 'individual') {
      await Promise.all(entityIds.map((entityId) => this.exportWithRetry([entityId], generation)))
      return
    }
    if (this.mode === 'random-batches') {
      const shuffledIds = [...entityIds]
      for (let index = shuffledIds.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffledIds[index], shuffledIds[swapIndex]] = [shuffledIds[swapIndex], shuffledIds[index]]
      }
      const batches: string[][] = []
      for (let index = 0; index < shuffledIds.length; index += 10) {
        batches.push(shuffledIds.slice(index, index + 10))
      }
      await Promise.all(batches.map((batch) => this.exportWithRetry(batch, generation)))
      return
    }
    await this.exportWithRetry(entityIds, generation)
  }

  private async exportWithRetry(entityIds: string[], generation: number) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      if (generation !== this.generation) return
      try {
        await this.exportEntities(entityIds, generation)
        return
      } catch (error) {
        if (generation !== this.generation) return
        if (attempt === 5) throw error
        await delay(Math.min(150 * 2 ** attempt, 1500))
      }
    }
  }

  private async exportEntities(entityIds: string[], generation: number) {
    const exportResponse = parseMaybeJsonDeep(await exportGlb(this.wse, entityIds))
    if (generation !== this.generation) return
    const glb = firstGlbFile(exportResponse)
    if (!glb) {
      throw new Error(`No GLB file was found for bodies ${entityIds.join(', ')}.\n${summarize(exportResponse)}`)
    }

    const loaded = await viewer.loadGlbPart(
      glb.bytes,
      entityIds,
      true,
      () => generation === this.generation
    )
    if (loaded && generation === this.generation) viewer.fitModelOutwardSmooth()
  }
}

async function readSelectedFile() {
  const file = els.file.files?.[0]
  if (!file) return

  if (isZipFile(file)) {
    selectedProject = await readZipProject(file)
    els.kcl.value = selectedProject.files.get(selectedProject.mainKclPathName) ?? ''
    setStatus(`Loaded ${file.name}: ${selectedProject.files.size} files, entrypoint ${selectedProject.mainKclPathName}.`)
    return
  }

  selectedProject = undefined
  els.kcl.value = await file.text()
  setStatus(`Loaded ${file.name}.`)
}

async function pasteKcl() {
  try {
    selectedProject = undefined
    els.kcl.value = await navigator.clipboard.readText()
    setStatus('Pasted KCL from clipboard.')
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error))
  }
}

async function readZipProject(file: File): Promise<ProjectInput> {
  const archive = unzipSync(new Uint8Array(await file.arrayBuffer()))
  const rawFiles = new Map<string, Uint8Array>()

  for (const [rawPath, contents] of Object.entries(archive)) {
    const pathName = normalizeArchivePath(rawPath)
    if (!pathName || shouldSkipArchivePath(pathName)) continue
    rawFiles.set(pathName, contents)
  }

  const root = commonRoot(Array.from(rawFiles.keys()))
  const files = new Map<string, string>()
  const decoder = new TextDecoder()
  for (const [pathName, contents] of rawFiles) {
    const projectPath = root && pathName.startsWith(`${root}/`) ? pathName.slice(root.length + 1) : pathName
    if (!projectPath || shouldSkipArchivePath(projectPath)) continue
    files.set(projectPath, decoder.decode(contents))
  }

  const mainKclPathName = chooseMainKclPath(files)
  if (!mainKclPathName) {
    throw new Error(`${file.name} does not contain a .kcl file.`)
  }

  return { files, mainKclPathName, name: file.name }
}

function restoreSettings() {
  els.token.value = localStorage.getItem('viewer2.token') ?? ''
  els.baseUrl.value = localStorage.getItem('viewer2.baseUrl') ?? 'https://api.zoo.dev'
  els.pool.value = localStorage.getItem('viewer2.pool') ?? ''
}

function persistSettings() {
  localStorage.setItem('viewer2.token', els.token.value.trim())
  localStorage.setItem('viewer2.baseUrl', els.baseUrl.value.trim())
  localStorage.setItem('viewer2.pool', els.pool.value.trim())
}

function readSettings(): EngineSettings {
  persistSettings()
  return {
    baseUrl: els.baseUrl.value.trim() || undefined,
    pool: els.pool.value.trim() || undefined,
    token: els.token.value.trim(),
  }
}

function readExportMode(): ExportMode {
  if (els.exportBatch.checked) return 'batch'
  return els.exportRandomBatches.checked ? 'random-batches' : 'individual'
}

function renderBodies() {
  els.bodies.replaceChildren(
    ...Array.from(sceneBodyIds, (id) => {
      const li = document.createElement('li')
      li.textContent = `${id}, ${viewer.meshCount(id)} meshes`
      return li
    })
  )
}

function setStatus(message: string) {
  els.status.value = message
}

function element<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing #${id}`)
  return el as T
}

class Viewer {
  private readonly cachedGeometries = new WeakSet<THREE.BufferGeometry>()
  private readonly camera: THREE.PerspectiveCamera
  private readonly controls: OrbitControls
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
  private fitAnimation = 0
  private fitObjectsInView = true
  private frameFirstImport = true
  private hasFramedModel = false
  private dynamicLighting = true
  private lightRadius = 6
  private mouseFollowLighting = false
  private model = new THREE.Group()

  constructor(private readonly container: HTMLElement) {
    this.scene.background = new THREE.Color(0x080b11)
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
      const bounds = this.container.getBoundingClientRect()
      this.lightPointer.set(
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
        1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2
      )
    })
    this.container.addEventListener('pointerleave', () => this.lightPointer.set(0, 0))

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
        this.fadeIn(group)
      }
      return true
    }

    if (entityIds.length > 1 && !allowSharedGroup) return false

    this.removeParts(entityIds)
    for (const seamGroup of seamGroups) {
      if (seamGroup) gltf.scene.add(seamGroup)
    }
    this.model.add(gltf.scene)
    for (const id of entityIds) this.partGroups.set(id, gltf.scene)
    this.fadeIn(gltf.scene)
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
    this.disposeObject(this.model)
    this.model.clear()
    this.partGroups.clear()
    this.hasFramedModel = false
    this.lightCenter.set(0, 0, 0)
    this.lightRadius = 6
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
    const seamGroups = seamGroupsFromGlb(bytes)
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

function seamGroupsFromGlb(bytes: Uint8Array): Array<THREE.Group | undefined> {
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
            if (edgeId !== undefined) {
              seamEdgeIds.add(edgeId)
            }
          }
        }
      }
    }

    // Production Engine currently strips seam trims while retaining their 3D edges.
    if (!hasTraceMetadata && solids.length === 1) {
      for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
        if (!referencedEdgeIds.has(edgeId)) {
          seamEdgeIds.add(edgeId)
        }
      }
    }

    // In B-rep terminology most visible surface boundaries are mates or boundaries,
    // not closed-surface "seam" trims. Render those edges as surface seams too.
    for (const edgeId of referencedEdgeIds) seamEdgeIds.add(edgeId)
    if (solids.length === 1) {
      for (let edgeId = 0; edgeId < edges.length; edgeId += 1) seamEdgeIds.add(edgeId)
    }

    const segments: THREE.Vector3[] = []
    for (const edgeId of seamEdgeIds) {
      const edge = edges[edgeId]
      if (!edge) continue
      const curveId = orientedIndex(edge.curve)
      if (curveId === undefined || !curves[curveId]) continue
      const points = sampleBrepCurve(curves[curveId], edge.t)
      for (let index = 1; index < points.length; index += 1) {
        segments.push(points[index - 1], points[index])
      }
    }
    if (segments.length === 0) return undefined

    const geometry = new THREE.BufferGeometry().setFromPoints(segments)
    const material = new THREE.LineBasicMaterial({
      color: 0x8f9aa8,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
    })
    const lines = new THREE.LineSegments(geometry, material)
    lines.name = 'brep-surface-edges'
    lines.renderOrder = 2
    const group = new THREE.Group()
    group.name = 'brep-seams'
    group.add(lines)
    return group
  })
  return groups
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

function firstGlbFile(value: unknown): { bytes: Uint8Array; name: string } | undefined {
  value = parseMaybeJsonDeep(value)
  const files: Array<{ contents?: unknown; name?: unknown }> = []
  walk(value, (node) => {
    if (!isRecord(node) || !Array.isArray(node.files)) return
    for (const file of node.files) {
      if (isRecord(file)) files.push(file)
    }
  })

  for (const file of files) {
    const bytes = bytesFromContents(file.contents)
    if (bytes) return { bytes, name: typeof file.name === 'string' ? file.name : 'model.glb' }
  }
  return undefined
}

function collectSceneEntityIds(value: unknown): string[] {
  const ids: string[] = []
  walk(value, (node) => {
    if (!isRecord(node) || node.type !== 'scene_get_entity_ids') return
    const data = isRecord(node.data) ? node.data : node
    if (!Array.isArray(data.entity_ids)) return

    for (const group of data.entity_ids) {
      if (!Array.isArray(group)) continue
      for (const id of group) {
        if (typeof id === 'string') ids.push(id)
      }
    }
  })
  return unique(ids)
}

function executionErrorMessage(value: unknown): string | undefined {
  const parsed = parseMaybeJsonDeep(value)
  if (!isRecord(parsed)) return undefined
  if (parsed.success === false) return `Engine request failed.\n${summarize(parsed.errors)}`

  let executionError: Record<string, unknown> | undefined
  walk(parsed, (node) => {
    if (!isRecord(node) || node.type !== 'exec_kcl_project' || !isRecord(node.data)) return
    const result = node.data.result
    if (isRecord(result) && isRecord(result.Err)) executionError = result.Err
  })
  if (!executionError) return undefined

  const fatal = isRecord(executionError.error) ? executionError.error : undefined
  const details = isRecord(fatal?.details) ? fatal.details : undefined
  const msg = typeof details?.msg === 'string' ? details.msg : summarize(executionError)
  return `KCL execution failed.\n${msg}`
}

function isModelingConnectionInterrupted(value: unknown): boolean {
  let interrupted = false
  walk(parseMaybeJsonDeep(value), (node) => {
    if (
      isRecord(node) &&
      node.error_code === 'internal_api' &&
      node.message === 'modeling connection interrupted; please reconnect and retry'
    ) {
      interrupted = true
    }
  })
  return interrupted
}

function bytesFromContents(contents: unknown): Uint8Array | undefined {
  if (contents instanceof Uint8Array) return contents
  if (Array.isArray(contents) && contents.every((item) => typeof item === 'number')) return new Uint8Array(contents)
  if (typeof contents !== 'string') return undefined

  const binary = atob(contents)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function walk(value: unknown, visit: (value: unknown) => void, seen = new Set<unknown>()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return
  seen.add(value)
  visit(value)
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit, seen)
    return
  }
  if (value instanceof Map) {
    for (const item of value.values()) walk(item, visit, seen)
    return
  }
  for (const item of Object.values(value)) walk(item, visit, seen)
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function parseMaybeJsonDeep(value: unknown): unknown {
  let parsed = value
  for (let i = 0; i < 3; i += 1) {
    const next = parseMaybeJson(parsed)
    if (next === parsed) return parsed
    parsed = next
  }
  return parsed
}

function isZipFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.zip') || file.type === 'application/zip'
}

function normalizeArchivePath(pathName: string): string {
  return pathName.replaceAll('\\', '/').replace(/^\.\/+/, '').replace(/^\/+/g, '').replace(/\/+/g, '/')
}

function shouldSkipArchivePath(pathName: string): boolean {
  return (
    pathName.endsWith('/') ||
    pathName.startsWith('__MACOSX/') ||
    pathName.split('/').some((part) => part === '.DS_Store' || part === '')
  )
}

function commonRoot(paths: string[]): string | undefined {
  if (paths.length === 0) return undefined
  const roots = new Set(paths.map((pathName) => pathName.split('/')[0]).filter(Boolean))
  if (roots.size !== 1) return undefined
  const [root] = roots
  return paths.every((pathName) => pathName.includes('/') && pathName.startsWith(`${root}/`)) ? root : undefined
}

function chooseMainKclPath(files: Map<string, string>): string | undefined {
  const paths = Array.from(files.keys()).filter((pathName) => pathName.toLowerCase().endsWith('.kcl')).sort()
  return paths.find((pathName) => pathName === 'main.kcl') ?? paths.find((pathName) => pathName.endsWith('/main.kcl')) ?? paths[0]
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

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', toArrayBuffer(bytes)))
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function summarize(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2).slice(0, 1200)
  } catch {
    return String(value)
  }
}

function initialize() {
  viewer = new Viewer(els.viewer)

  restoreSettings()
  renderBodies()

  els.file.addEventListener('change', () => void readSelectedFile())
  els.kcl.addEventListener('input', () => {
    selectedProject = undefined
  })
  els.paste.addEventListener('click', () => void pasteKcl())
  els.run.addEventListener('click', () => void runKcl())
  const updateLighting = () => viewer.setLighting(els.lightingDynamic.checked, els.lightingMouseFollow.checked)
  els.lightingDynamic.addEventListener('change', updateLighting)
  els.lightingMouseFollow.addEventListener('change', updateLighting)
  updateLighting()
  const updateViewFitting = () => viewer.setViewFitting(els.frameFirstImport.checked, els.fitObjectsInView.checked)
  els.frameFirstImport.addEventListener('change', updateViewFitting)
  els.fitObjectsInView.addEventListener('change', updateViewFitting)
  updateViewFitting()
  els.clear.addEventListener('click', () => {
    viewer.clearModel()
    sceneBodyIds.clear()
    renderBodies()
    setStatus('Scene cleared')
  })

  for (const input of [els.token, els.baseUrl, els.pool]) {
    input.addEventListener('change', persistSettings)
  }
}

initialize()
