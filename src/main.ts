import { Client } from '@kittycad/lib'
import { WebSocket as WebSocketEngine } from '@kittycad/lib-websocket-engine'
import { unzipSync } from 'fflate'
import { Viewer } from './viewer.js'

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

interface ScheduledExport {
  entityIds: string[]
  generation: number
  promise: Promise<void>
  reject: (reason?: unknown) => void
  resolve: () => void
}

type ExportMode = 'batch' | 'individual' | 'random-batches'

type IFrameMessage = {
  action: 'load'
  project: Record<string, string>
}

const els = {
  app: element<HTMLElement>('app'),
  baseUrl: element<HTMLInputElement>('base-url'),
  bodies: element<HTMLOListElement>('bodies'),
  clear: element<HTMLButtonElement>('clear'),
  exportBatch: element<HTMLInputElement>('export-batch'),
  exportRandomBatches: element<HTMLInputElement>('export-random-batches'),
  edgeInfo: element<HTMLDivElement>('edge-info'),
  edgeInfoClose: element<HTMLButtonElement>('edge-info-close'),
  edgeUuid: element<HTMLInputElement>('edge-uuid'),
  edgeUuidCopy: element<HTMLButtonElement>('edge-uuid-copy'),
  file: element<HTMLInputElement>('file'),
  fitObjectsInView: element<HTMLInputElement>('fit-objects-in-view'),
  frameFirstImport: element<HTMLInputElement>('frame-first-import'),
  kcl: element<HTMLTextAreaElement>('kcl'),
  lightingDynamic: element<HTMLInputElement>('lighting-dynamic'),
  lightingMouseFollow: element<HTMLInputElement>('lighting-mouse-follow'),
  loadClipboard: element<HTMLButtonElement>('load-clipboard'),
  loadFile: element<HTMLButtonElement>('load-file'),
  loadProject: element<HTMLButtonElement>('load-project'),
  loaderFile: element<HTMLInputElement>('loader-file'),
  loaderProject: element<HTMLInputElement>('loader-project'),
  loaderProjectZip: element<HTMLInputElement>('loader-project-zip'),
  loadProjectDir: element<HTMLButtonElement>('load-project-dir'),
  loadProjectZip: element<HTMLButtonElement>('load-project-zip'),
  projectSub: element<HTMLDivElement>('project-sub'),
  loaderStatus: element<HTMLOutputElement>('loader-status'),
  loaderView: element<HTMLElement>('loader-view'),
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
    hideEdgeInfo()
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
    const changed = newIds.length > 0 || removedIds.length > 0
    if (changed) renderBodies()
    if (alwaysExport || changed) this.scheduler.schedule(Array.from(sceneBodyIds))
    return alwaysExport || changed
  }
}

class ExportScheduler {
  private displayedEntityIds = new Set<string>()
  private generation = 0
  private latestExport: Promise<void> | undefined
  private queuedExport: ScheduledExport | undefined
  private queueRunner: Promise<void> | undefined
  private randomBatches: string[][] = []

  constructor(
    private readonly wse: WebSocketEngine,
    private readonly mode: ExportMode,
  ) {}

  schedule(entityIds: string[]): Promise<void> {
    const generation = ++this.generation
    let reject!: (reason?: unknown) => void
    let resolve!: () => void
    const promise = new Promise<void>((resolvePromise, rejectPromise) => {
      reject = rejectPromise
      resolve = resolvePromise
    })

    this.queuedExport?.resolve()
    this.queuedExport = { entityIds, generation, promise, reject, resolve }
    this.latestExport = promise
    this.startQueue()
    void promise.catch(() => {})
    return promise
  }

  async finish(announceExport: boolean) {
    const entityIds = Array.from(sceneBodyIds)
    const finalExport = this.latestExport ?? this.schedule(entityIds)
    if (entityIds.length === 0) {
      await finalExport
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
    renderBodies()
    setStatus(`Loaded ${entityIds.length} scene bodies.`)
  }

  private startQueue() {
    if (this.queueRunner) return
    const runner = this.runQueue()
    this.queueRunner = runner
    void runner.finally(() => {
      if (this.queueRunner !== runner) return
      this.queueRunner = undefined
      if (this.queuedExport) this.startQueue()
    })
  }

  private async runQueue() {
    while (this.queuedExport) {
      const scheduled = this.queuedExport
      this.queuedExport = undefined
      try {
        await this.exportSnapshot(scheduled.entityIds, scheduled.generation)
        scheduled.resolve()
      } catch (error) {
        scheduled.reject(error)
      }
    }
  }

  private async exportSnapshot(entityIds: string[], generation: number) {
    if (this.mode === 'individual') {
      await Promise.all(entityIds.map((entityId) => this.exportWithRetry([entityId], generation)))
    } else if (this.mode === 'random-batches') {
      const batches = this.randomBatchesFor(entityIds)
      await Promise.all(batches.map((batch) => this.exportWithRetry(batch, generation)))
    } else if (entityIds.length > 0) {
      await this.exportWithRetry(entityIds, generation)
    }

    if (generation !== this.generation) return
    const currentEntityIds = new Set(entityIds)
    const removedIds = Array.from(this.displayedEntityIds).filter((id) => !currentEntityIds.has(id))
    if (removedIds.length > 0) viewer.removeEntityIds(removedIds)
    this.displayedEntityIds = currentEntityIds
  }

  private randomBatchesFor(entityIds: string[]): string[][] {
    const currentIds = new Set(entityIds)
    this.randomBatches = this.randomBatches
      .map((batch) => batch.filter((id) => currentIds.has(id)))
      .filter((batch) => batch.length > 0)

    const assignedIds = new Set(this.randomBatches.flat())
    const newIds = entityIds.filter((id) => !assignedIds.has(id))
    for (let index = newIds.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      ;[newIds[index], newIds[swapIndex]] = [newIds[swapIndex], newIds[index]]
    }
    for (const id of newIds) {
      const availableBatches = this.randomBatches.filter((batch) => batch.length < 10)
      const batch = availableBatches[Math.floor(Math.random() * availableBatches.length)]
      if (batch) batch.push(id)
      else this.randomBatches.push([id])
    }

    return this.randomBatches.map((batch) => [...batch])
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

  try {
    await loadFile(file)
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error))
  }
}

async function loadFile(file: File) {
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

async function readDirectoryProject(fileList: FileList): Promise<ProjectInput> {
  const selectedFiles = Array.from(fileList)
  if (selectedFiles.length === 0) throw new Error('The selected project is empty.')

  const paths = selectedFiles.map((file) => normalizeArchivePath(file.webkitRelativePath || file.name))
  const root = commonRoot(paths)
  const files = new Map<string, string>()
  await Promise.all(
    selectedFiles.map(async (file, index) => {
      const pathName = paths[index]
      const projectPath = root && pathName.startsWith(`${root}/`) ? pathName.slice(root.length + 1) : pathName
      if (!projectPath || shouldSkipArchivePath(projectPath)) return
      files.set(projectPath, await file.text())
    })
  )

  const mainKclPathName = chooseMainKclPath(files)
  if (!mainKclPathName) throw new Error('The selected project does not contain a .kcl file.')
  return {
    files,
    mainKclPathName,
    name: root ?? 'selected project',
  }
}

async function loadFromLauncher(load: () => Promise<void>) {
  setLauncherBusy(true)
  els.loaderStatus.value = 'Loading...'
  try {
    await load()
    els.loaderView.hidden = true
    els.app.classList.remove('loader-active')
    if (els.token.value.trim()) {
      await runKcl()
    } else {
      setStatus('Source loaded. Add a Zoo API token, then execute it.')
    }
  } catch (error) {
    els.loaderStatus.value = error instanceof Error ? error.message : String(error)
  } finally {
    setLauncherBusy(false)
  }
}

function setLauncherBusy(busy: boolean) {
  els.loaderView.ariaBusy = String(busy)
  els.loadProject.disabled = busy
  els.loadFile.disabled = busy
  els.loadClipboard.disabled = busy
}

function embeddedProjectFromMessageData(data: unknown): Record<string, string> | null {
  let value = data
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value)
    } catch {
      return null
    }
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const message = value as Partial<IFrameMessage>
  if (message.action !== 'load') return null
  if (!message.project || typeof message.project !== 'object' || Array.isArray(message.project)) return null
  const entries = Object.entries(message.project).filter(
    ([path, content]) => typeof path === 'string' && path.length > 0 && typeof content === 'string',
  )
  if (!entries.length) return null
  return Object.fromEntries(entries)
}

function handleEmbeddedMessage(event: MessageEvent) {
  const project = embeddedProjectFromMessageData(event.data)
  if (!project) return

  const files = new Map(Object.entries(project))
  const mainKclPathName = chooseMainKclPath(files)
  if (!mainKclPathName) return

  void loadFromLauncher(async () => {
    selectedProject = { files, mainKclPathName, name: 'Embedded project' }
    els.kcl.value = files.get(mainKclPathName) ?? ''
    setStatus(`Loaded embedded project: ${files.size} files, entrypoint ${mainKclPathName}.`)
  })
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

function showEdgeInfo(uuid: string) {
  els.edgeUuid.value = uuid
  els.edgeInfo.hidden = false
  els.edgeUuid.focus()
  els.edgeUuid.select()
}

function hideEdgeInfo() {
  els.edgeInfo.hidden = true
  els.edgeUuidCopy.textContent = 'Copy'
}

async function copyEdgeUuid() {
  try {
    await navigator.clipboard.writeText(els.edgeUuid.value)
    els.edgeUuidCopy.textContent = 'Copied'
    window.setTimeout(() => {
      els.edgeUuidCopy.textContent = 'Copy'
    }, 1200)
  } catch {
    els.edgeUuid.focus()
    els.edgeUuid.select()
  }
}

function element<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing #${id}`)
  return el as T
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

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

function summarize(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2).slice(0, 1200)
  } catch {
    return String(value)
  }
}

function initialize() {
  viewer = new Viewer(els.viewer, { onEntitySelected: showEdgeInfo })

  restoreSettings()
  renderBodies()

  els.file.addEventListener('change', () => void readSelectedFile())
  els.loadFile.addEventListener('click', () => {
    els.loaderStatus.value = ''
    els.loaderFile.value = ''
    els.loaderFile.click()
  })
  els.loaderFile.addEventListener('change', () => {
    const file = els.loaderFile.files?.[0]
    if (file) void loadFromLauncher(() => loadFile(file))
  })
  els.loadProject.addEventListener('click', () => {
    els.loaderStatus.value = ''
    els.projectSub.hidden = !els.projectSub.hidden
  })
  els.loadProjectDir.addEventListener('click', () => {
    els.projectSub.hidden = true
    els.loaderProject.value = ''
    els.loaderProject.click()
  })
  els.loadProjectZip.addEventListener('click', () => {
    els.projectSub.hidden = true
    els.loaderProjectZip.value = ''
    els.loaderProjectZip.click()
  })
  els.loaderProject.addEventListener('change', () => {
    const files = els.loaderProject.files
    if (!files?.length) return
    void loadFromLauncher(async () => {
      selectedProject = await readDirectoryProject(files)
      els.kcl.value = selectedProject.files.get(selectedProject.mainKclPathName) ?? ''
      setStatus(
        `Loaded ${selectedProject.name}: ${selectedProject.files.size} files, entrypoint ${selectedProject.mainKclPathName}.`
      )
    })
  })
  els.loaderProjectZip.addEventListener('change', () => {
    const file = els.loaderProjectZip.files?.[0]
    if (!file) return
    void loadFromLauncher(async () => {
      selectedProject = await readZipProject(file)
      els.kcl.value = selectedProject.files.get(selectedProject.mainKclPathName) ?? ''
      setStatus(
        `Loaded ${selectedProject.name}: ${selectedProject.files.size} files, entrypoint ${selectedProject.mainKclPathName}.`
      )
    })
  })
  els.loadClipboard.addEventListener('click', () => {
    els.loaderStatus.value = ''
    void loadFromLauncher(async () => {
      const kcl = (await navigator.clipboard.readText()).trim()
      if (!kcl) throw new Error('The clipboard does not contain KCL source.')
      selectedProject = undefined
      els.kcl.value = kcl
      setStatus('Loaded KCL from clipboard.')
    })
  })
  els.kcl.addEventListener('input', () => {
    selectedProject = undefined
  })
  els.paste.addEventListener('click', () => void pasteKcl())
  els.run.addEventListener('click', () => void runKcl())
  els.edgeInfoClose.addEventListener('click', hideEdgeInfo)
  els.edgeUuid.addEventListener('click', () => els.edgeUuid.select())
  els.edgeUuidCopy.addEventListener('click', () => void copyEdgeUuid())
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
    hideEdgeInfo()
    renderBodies()
    setStatus('Scene cleared')
  })

  window.addEventListener('message', handleEmbeddedMessage)

  for (const input of [els.token, els.baseUrl, els.pool]) {
    input.addEventListener('change', persistSettings)
  }
}

initialize()
