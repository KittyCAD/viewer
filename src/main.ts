import { Client } from '@kittycad/lib'
import { WebSocket as WebSocketEngine } from '@kittycad/lib-websocket-engine'
import { unzipSync } from 'fflate'
import { signal, effect } from '@preact/signals-core'
import { Viewer } from './viewer'
import type { ArtifactGraph, SelectionInfo } from './viewer'
import { namedViews } from './viewer'

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
  commandDot: element<HTMLSpanElement>('command-dot'),
  commandFill: element<HTMLSpanElement>('command-fill'),
  commandIndicator: element<HTMLDivElement>('command-indicator'),
  exportBatch: element<HTMLInputElement>('export-batch'),
  exportRandomBatches: element<HTMLInputElement>('export-random-batches'),
  dataPanels: element<HTMLDivElement>('data-panels'),
  disconnect: element<HTMLButtonElement>('disconnect'),
  dataPills: element<HTMLDivElement>('data-pills'),
  edgeInfo: element<HTMLDivElement>('edge-info'),
  exportOptions: element<HTMLDivElement>('export-options'),
  exportPanel: element<HTMLDivElement>('export-panel'),
  exportStatus: element<HTMLDivElement>('export-status'),
  edgeInfoClose: element<HTMLButtonElement>('edge-info-close'),
  edgeSource: element<HTMLPreElement>('edge-source'),
  edgeUuid: element<HTMLInputElement>('edge-uuid'),
  edgeUuidCopy: element<HTMLButtonElement>('edge-uuid-copy'),
  file: element<HTMLInputElement>('file'),
  fileSelect: element<HTMLSelectElement>('file-select'),
  fitObjectsInView: element<HTMLInputElement>('fit-objects-in-view'),
  frameFirstImport: element<HTMLInputElement>('frame-first-import'),
  kcl: element<HTMLTextAreaElement>('kcl'),
  lightingDynamic: element<HTMLInputElement>('lighting-dynamic'),
  lightingMouseFollow: element<HTMLInputElement>('lighting-mouse-follow'),
  lightingUniform: element<HTMLInputElement>('lighting-uniform'),
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
  parametersList: element<HTMLDivElement>('parameters-list'),
  paste: element<HTMLButtonElement>('paste'),
  photoToggle: element<HTMLButtonElement>('photo-toggle'),
  pool: element<HTMLInputElement>('pool'),
  resultsList: element<HTMLDivElement>('results-list'),
  run: element<HTMLButtonElement>('run'),
  snapshotDock: element<HTMLDivElement>('snapshot-dock'),
  tabExport: element<HTMLButtonElement>('tab-export'),
  sourceLabel: element<HTMLSpanElement>('source-label'),
  status: element<HTMLOutputElement>('status'),
  tabParameters: element<HTMLButtonElement>('tab-parameters'),
  tabResults: element<HTMLButtonElement>('tab-results'),
  token: element<HTMLInputElement>('token'),  
  xrayGroup: element<HTMLDivElement>('xray-group'),
  xrayOpacity: element<HTMLInputElement>('xray-opacity'),
  xrayToggle: element<HTMLButtonElement>('xray-toggle'),
  viewer: element<HTMLDivElement>('viewer'),
  viewsToggle: element<HTMLButtonElement>('views-toggle'),
}

let viewer: Viewer
let engine: WebSocketEngine | undefined
let engineKey = ''
const selectedProject$ = signal<ProjectInput | undefined>(undefined)
const lastExecOutcome$ = signal<ExecOutcome | undefined>(undefined)
const sceneBodyIds$ = signal<Set<string>>(new Set())
const activeTab$ = signal<'export' | 'parameters' | 'results' | null>(null)
const pendingCommands$ = signal({ total: 0, remaining: 0 })
const engineConnected$ = signal(false)
const viewsVisible$ = signal(true)
const photoMode$ = signal(false)
const xrayEnabled$ = signal(false)

async function runKcl() {
  const kcl = els.kcl.value.trim()
  const input = selectedProject$.value ?? {
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
    engineConnected$.value = true
    const exportScheduler = new ExportScheduler(wse, readExportMode())

    sceneBodyIds$.value = new Set()
    viewer.clearModel()
    hideEdgeInfo()
    resetPendingCommands()
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
    const outcome = execOutcomeFromResponse(executionResponse)
    if (outcome) {
      viewer.setArtifactGraph(outcome.artifactGraph)
      lastExecOutcome$.value = outcome
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

type ExportFormat = 'step' | 'stl' | 'obj' | 'ply' | 'gltf' | 'glb' | 'fbx'

const exportFormats: ReadonlyArray<{ key: ExportFormat; label: string }> = [
  { key: 'step', label: 'STEP' },
  { key: 'stl', label: 'STL' },
  { key: 'obj', label: 'OBJ' },
  { key: 'ply', label: 'PLY' },
  { key: 'glb', label: 'GLB' },
  { key: 'gltf', label: 'glTF' },
  { key: 'fbx', label: 'FBX' },
]

const defaultExportCoords = {
  forward: { axis: 'y', direction: 'negative' },
  up: { axis: 'z', direction: 'positive' },
}

function outputFormatForExport(format: ExportFormat): Record<string, unknown> {
  switch (format) {
    case 'glb': return { type: 'gltf', storage: 'binary', presentation: 'pretty' }
    case 'gltf': return { type: 'gltf', storage: 'embedded', presentation: 'pretty' }
    case 'fbx': return { type: 'fbx', storage: 'binary' }
    case 'obj': return { type: 'obj', coords: defaultExportCoords, units: 'mm' }
    case 'ply': return { type: 'ply', coords: defaultExportCoords, units: 'mm', storage: 'ascii', selection: { type: 'default_scene' } }
    case 'stl': return { type: 'stl', coords: defaultExportCoords, units: 'mm', storage: 'ascii', selection: { type: 'default_scene' } }
    case 'step': return { type: 'step' }
  }
}

async function exportModel(format: ExportFormat) {
  if (!engine) return
  els.exportStatus.textContent = `Exporting ${format.toUpperCase()}...`
  for (const btn of els.exportOptions.querySelectorAll('button')) {
    (btn as HTMLButtonElement).disabled = true
  }
  try {
    const command = {
      type: 'modeling_cmd_req',
      cmd_id: crypto.randomUUID(),
      cmd: {
        type: 'export',
        entity_ids: [],
        format: outputFormatForExport(format),
      },
    }
    const response = parseMaybeJsonDeep(await sendModelingCommandAndWait(engine, command))
    const files = extractExportFiles(response)
    if (files.length === 0) throw new Error('No files returned.')
    downloadFiles(files)
    els.exportStatus.textContent = files.length === 1
      ? `Downloaded ${files[0].name}`
      : `Downloaded ${files.length} files`
  } catch (error) {
    els.exportStatus.textContent = `Export failed: ${error instanceof Error ? error.message : String(error)}`
  } finally {
    for (const btn of els.exportOptions.querySelectorAll('button')) {
      (btn as HTMLButtonElement).disabled = false
    }
  }
}

function extractExportFiles(value: unknown): Array<{ name: string; bytes: Uint8Array }> {
  const files: Array<{ name: string; bytes: Uint8Array }> = []
  walk(value, (node) => {
    if (!isRecord(node) || !Array.isArray(node.files)) return
    for (const file of node.files) {
      if (!isRecord(file) || typeof file.name !== 'string') continue
      const bytes = bytesFromContents(file.contents)
      if (bytes) files.push({ name: file.name, bytes })
    }
  })
  return files
}

function downloadFiles(files: Array<{ name: string; bytes: Uint8Array }>) {
  for (const file of files) {
    const url = URL.createObjectURL(new Blob([new Uint8Array(file.bytes)]))
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    link.hidden = true
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }
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

  registerPendingCommand()
  void wse.send(JSON.stringify(request))
  return response.finally(resolvePendingCommand)
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
    const newIds = ids.filter((id) => !sceneBodyIds$.value.has(id))
    const removedIds = Array.from(sceneBodyIds$.value).filter((id) => !currentIds.has(id))

    const changed = newIds.length > 0 || removedIds.length > 0
    if (changed) {
      const next = new Set(sceneBodyIds$.value)
      for (const id of removedIds) next.delete(id)
      for (const id of newIds) next.add(id)
      sceneBodyIds$.value = next
    }
    if (alwaysExport || changed) this.scheduler.schedule(Array.from(sceneBodyIds$.value))
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
    const entityIds = Array.from(sceneBodyIds$.value)
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
    if (loaded && generation === this.generation) {
      viewer.fitModelOutwardSmooth()
      refreshSnapshots()
    }
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
    const project = await readZipProject(file)
    selectedProject$.value = project
    els.kcl.value = project.files.get(project.mainKclPathName) ?? ''
    setStatus(`Loaded ${file.name}: ${project.files.size} files, entrypoint ${project.mainKclPathName}.`)
    return
  }

  selectedProject$.value = undefined
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
    selectedProject$.value = { files, mainKclPathName, name: 'Embedded project' }
    els.kcl.value = files.get(mainKclPathName) ?? ''
    setStatus(`Loaded embedded project: ${files.size} files, entrypoint ${mainKclPathName}.`)
  })
}

async function pasteKcl() {
  try {
    selectedProject$.value = undefined
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

function refreshSnapshots() {
  for (const view of namedViews) {
    const img = els.snapshotDock.querySelector<HTMLImageElement>(`[data-snapshot-img="${view.key}"]`)
    const empty = img?.parentElement?.querySelector<HTMLElement>('.snapshot-empty')
    const dataUrl = viewer.renderSnapshot(view)
    if (img && dataUrl) {
      img.src = dataUrl
      img.hidden = false
      if (empty) empty.hidden = true
    } else if (img) {
      img.hidden = true
      if (empty) empty.hidden = false
    }
  }
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

function registerPendingCommand() {
  const prev = pendingCommands$.value
  pendingCommands$.value = { total: prev.total + 1, remaining: prev.remaining + 1 }
}

function resolvePendingCommand() {
  const prev = pendingCommands$.value
  const remaining = Math.max(0, prev.remaining - 1)
  pendingCommands$.value = remaining === 0 ? { total: 0, remaining: 0 } : { total: prev.total, remaining }
}

function resetPendingCommands() {
  pendingCommands$.value = { total: 0, remaining: 0 }
}

function disconnectEngine() {
  engine?.deconstructor()
  engine = undefined
  engineKey = ''
  engineConnected$.value = false
  resetPendingCommands()
  sceneBodyIds$.value = new Set()
  lastExecOutcome$.value = undefined
  viewer.clearModel()
  hideEdgeInfo()
  selectedProject$.value = undefined
  els.loaderView.hidden = false
  els.app.classList.add('loader-active')
  setStatus('Idle')
}

function renderBodies() {
  els.bodies.replaceChildren(
    ...Array.from(sceneBodyIds$.value, (id) => {
      const li = document.createElement('li')
      li.textContent = `${id}, ${viewer.meshCount(id)} meshes`
      return li
    })
  )
}

function renderFileSelect(project: ProjectInput | undefined) {
  if (!project) {
    els.sourceLabel.textContent = 'No file loaded'
    els.fileSelect.hidden = true
    return
  }
  els.sourceLabel.textContent = project.name
  if (project.files.size <= 1) {
    els.fileSelect.hidden = true
    return
  }
  els.fileSelect.hidden = false
  const paths = Array.from(project.files.keys())
    .filter((p) => p.toLowerCase().endsWith('.kcl'))
    .sort()
  els.fileSelect.replaceChildren(
    ...paths.map((path) => {
      const option = document.createElement('option')
      option.value = path
      option.textContent = path
      option.selected = path === project.mainKclPathName
      return option
    })
  )
}

interface ParameterEntry {
  name: string
  path: string
  kind: 'number' | 'boolean'
  value: number | boolean
  min?: number
  max?: number
  step?: number
  valueStart: number
  valueEnd: number
}

interface ResultEntry {
  name: string
  path: string
  kind: 'number' | 'boolean' | 'string' | 'structure'
  value: unknown
}

function topLevelAssignmentsFromSource(sourceText: string) {
  const assignments = new Map<string, { valueStart: number; valueEnd: number; literalText: string | null }>()
  let lineStart = 0
  for (const line of sourceText.split('\n')) {
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$/.exec(line)
    if (!match?.[1]) { lineStart += line.length + 1; continue }
    const name = match[1]
    if (assignments.has(name)) { lineStart += line.length + 1; continue }
    const literalMatch = /(-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|true|false)(?=\s*(?:$|\/\/|#))/.exec(match[2] ?? '')
    const literalText = literalMatch?.[1] ?? null
    const valueStart = literalText ? lineStart + line.lastIndexOf(literalText) : lineStart + line.length
    assignments.set(name, { valueStart, valueEnd: valueStart + (literalText?.length ?? 0), literalText })
    lineStart += line.length + 1
  }
  return assignments
}

function numberFromExecutorValue(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (!value || typeof value !== 'object') return null
  const record = value as Record<string, unknown>
  if (typeof record.value === 'number' && Number.isFinite(record.value)) return record.value
  if (typeof record.value === 'string') { const n = Number(record.value); return Number.isFinite(n) ? n : null }
  return null
}

function booleanFromExecutorValue(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value
  if (!value || typeof value !== 'object') return null
  const record = value as Record<string, unknown>
  if (typeof record.value === 'boolean') return record.value
  if (record.value === 'true') return true
  if (record.value === 'false') return false
  return null
}

function parameterRangeForValue(value: number) {
  if (value === 0) return { min: -1, max: 1, step: 0.2 }
  const magnitude = 10 ** Math.ceil(Math.log10(Math.max(1, Math.abs(value))))
  const min = value < 0 ? -magnitude : 0
  const max = value < 0 ? 0 : magnitude
  return { min, max, step: (max - min) / 10 }
}

function formatParameterNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : Number(value.toPrecision(12)).toString()
}

function buildParameterEntries(): ParameterEntry[] {
  const outcome = lastExecOutcome$.value
  const project = selectedProject$.value
  if (!outcome || !project) return []

  const executorNumbers = new Map<string, number>()
  const executorBooleans = new Map<string, boolean>()
  for (const [name, value] of Object.entries(outcome.variables)) {
    const n = numberFromExecutorValue(value)
    if (n !== null) executorNumbers.set(name, n)
    const b = booleanFromExecutorValue(value)
    if (b !== null) executorBooleans.set(name, b)
  }

  const entries: ParameterEntry[] = []
  const seen = new Set<string>()

  for (const [path, sourceText] of project.files) {
    if (!path.toLowerCase().endsWith('.kcl')) continue
    for (const [name, assignment] of topLevelAssignmentsFromSource(sourceText)) {
      if (seen.has(name) || !assignment.literalText) continue
      seen.add(name)

      if (assignment.literalText === 'true' || assignment.literalText === 'false') {
        entries.push({
          name, path, kind: 'boolean',
          value: executorBooleans.get(name) ?? (assignment.literalText === 'true'),
          valueStart: assignment.valueStart, valueEnd: assignment.valueEnd,
        })
      } else {
        const literalValue = Number(assignment.literalText)
        const value = executorNumbers.get(name) ?? literalValue
        if (Number.isFinite(value)) {
          const { min, max, step } = parameterRangeForValue(value)
          entries.push({
            name, path, kind: 'number', value, min, max, step,
            valueStart: assignment.valueStart, valueEnd: assignment.valueEnd,
          })
        }
      }
    }
  }

  // Sort: parameters.kcl/params.kcl first, then active file, then alphabetical
  const mainPath = project.mainKclPathName
  entries.sort((a, b) => {
    const aSpecial = isSpecialParameterFile(a.path)
    const bSpecial = isSpecialParameterFile(b.path)
    if (aSpecial !== bSpecial) return aSpecial ? -1 : 1
    const aActive = a.path === mainPath
    const bActive = b.path === mainPath
    if (aActive !== bActive) return aActive ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  return entries
}

function isSpecialParameterFile(path: string): boolean {
  const base = path.split('/').pop()?.toLowerCase() ?? ''
  return base === 'parameters.kcl' || base === 'params.kcl'
}

function buildResultEntries(): ResultEntry[] {
  const outcome = lastExecOutcome$.value
  const project = selectedProject$.value
  if (!outcome) return []

  // Map variable names to file paths via source assignments
  const pathByName = new Map<string, string>()
  if (project) {
    for (const [path, sourceText] of project.files) {
      if (!path.toLowerCase().endsWith('.kcl')) continue
      for (const name of topLevelAssignmentsFromSource(sourceText).keys()) {
        if (!pathByName.has(name)) pathByName.set(name, path)
      }
    }
  }

  const entries: ResultEntry[] = []
  for (const [name, rawValue] of Object.entries(outcome.variables)) {
    const path = pathByName.get(name) ?? ''
    const kind = typeof rawValue === 'number' ? 'number'
      : typeof rawValue === 'boolean' ? 'boolean'
      : typeof rawValue === 'string' ? 'string'
      : 'structure'
    entries.push({ name, path, kind, value: rawValue })
  }
  return entries.sort((a, b) => a.name.localeCompare(b.name))
}

function applyParameterValue(entry: ParameterEntry, nextValue: number | boolean) {
  const project = selectedProject$.value
  if (!project) return
  const sourceText = project.files.get(entry.path)
  if (!sourceText) return

  const literal = entry.kind === 'boolean' ? String(nextValue) : formatParameterNumber(nextValue as number)
  const nextSource = sourceText.slice(0, entry.valueStart) + literal + sourceText.slice(entry.valueEnd)
  const nextFiles = new Map(project.files)
  nextFiles.set(entry.path, nextSource)
  selectedProject$.value = { ...project, files: nextFiles }
  els.kcl.value = nextFiles.get(project.mainKclPathName) ?? ''
  void runKcl()
}

function renderDataPanels() {
  const parameters = buildParameterEntries()
  const results = buildResultEntries()
  renderParametersList(parameters)
  renderResultsList(results)
}

function renderParametersList(entries: ParameterEntry[]) {
  if (entries.length === 0) {
    els.parametersList.innerHTML = '<div class="data-empty">No parameters found.</div>'
    return
  }
  els.parametersList.replaceChildren(
    ...entries.map((entry) => {
      const row = document.createElement('div')
      row.className = 'data-entry'
      const nameSpan = document.createElement('span')
      nameSpan.className = 'data-entry-name'
      nameSpan.textContent = entry.name
      nameSpan.title = `${entry.path}:${entry.name}`

      if (entry.kind === 'boolean') {
        const toggle = document.createElement('input')
        toggle.type = 'checkbox'
        toggle.checked = entry.value as boolean
        toggle.className = 'param-toggle'
        toggle.addEventListener('change', () => applyParameterValue(entry, toggle.checked))
        row.append(nameSpan, toggle)
      } else {
        const value = entry.value as number
        const controls = document.createElement('span')
        controls.className = 'param-controls'
        const slider = document.createElement('input')
        slider.type = 'range'
        slider.className = 'param-slider'
        slider.min = formatParameterNumber(entry.min ?? 0)
        slider.max = formatParameterNumber(entry.max ?? 0)
        slider.step = formatParameterNumber(entry.step ?? 1)
        slider.value = formatParameterNumber(value)
        const numInput = document.createElement('input')
        numInput.type = 'number'
        numInput.className = 'param-number'
        numInput.step = formatParameterNumber(entry.step ?? 1)
        numInput.value = formatParameterNumber(value)
        slider.addEventListener('input', () => { numInput.value = slider.value })
        slider.addEventListener('change', () => applyParameterValue(entry, Number(slider.value)))
        numInput.addEventListener('change', () => applyParameterValue(entry, Number(numInput.value)))
        controls.append(slider, numInput)
        row.style.flexDirection = 'column'
        row.style.alignItems = 'stretch'
        row.append(nameSpan, controls)
      }
      return row
    })
  )
}

function renderResultsList(entries: ResultEntry[]) {
  if (entries.length === 0) {
    els.resultsList.innerHTML = '<div class="data-empty">No results available.</div>'
    return
  }
  els.resultsList.replaceChildren(
    ...entries.map(({ name, path, kind, value }) => {
      const row = document.createElement('div')
      row.className = 'data-entry'
      const nameSpan = document.createElement('span')
      nameSpan.className = 'data-entry-name'
      nameSpan.textContent = name
      if (path) nameSpan.title = `${path}:${name}`
      if (kind === 'structure') {
        const pre = document.createElement('pre')
        pre.className = 'data-entry-structure'
        pre.textContent = stringifyStructure(value)
        row.style.flexDirection = 'column'
        row.style.alignItems = 'stretch'
        row.append(nameSpan, pre)
      } else {
        const valueSpan = document.createElement('span')
        valueSpan.className = 'data-entry-value'
        valueSpan.textContent = String(value)
        row.append(nameSpan, valueSpan)
      }
      return row
    })
  )
}

function stringifyStructure(value: unknown): string {
  const seen = new WeakSet<object>()
  try {
    return JSON.stringify(
      value,
      (_key, nested) => {
        if (typeof nested === 'bigint') return nested.toString()
        if (nested && typeof nested === 'object') {
          if (seen.has(nested)) return '[Circular]'
          seen.add(nested)
        }
        return nested
      },
      2
    ) ?? String(value)
  } catch {
    return String(value)
  }
}

function setStatus(message: string) {
  els.status.value = message
}

function showEdgeInfo(info: SelectionInfo) {
  els.edgeUuid.value = info.uuid
  els.edgeInfo.hidden = false

  const snippet = sourceSnippetForSelection(info)
  if (snippet) {
    els.edgeSource.hidden = false
    els.edgeSource.textContent = ''
    const label = document.createElement('span')
    label.className = 'edge-source-label'
    label.textContent = snippet.label
    els.edgeSource.append(label, snippet.code)
  } else {
    els.edgeSource.hidden = true
  }

  els.edgeUuid.focus()
  els.edgeUuid.select()
}

function sourceSnippetForSelection(info: SelectionInfo): { label: string; code: string } | undefined {
  if (!info.sourceRange || !lastExecOutcome$.value || !selectedProject$.value) return undefined
  const [startByte, endByte, moduleId] = info.sourceRange
  const filename = lastExecOutcome$.value.filenames.get(moduleId) ?? `module ${moduleId}`
  const sourceText = selectedProject$.value.files.get(filename)
  if (!sourceText) return undefined

  const bytes = new TextEncoder().encode(sourceText)
  const clamped = bytes.slice(Math.max(0, startByte), Math.min(bytes.length, endByte))
  const code = new TextDecoder().decode(clamped)
  if (!code.trim()) return undefined

  const { line, column } = lineAndColumnFromByteOffset(sourceText, startByte)
  return { label: `${filename}:${line}:${column}`, code }
}

function lineAndColumnFromByteOffset(source: string, byteOffset: number): { line: number; column: number } {
  const bytes = new TextEncoder().encode(source)
  const prefix = new TextDecoder().decode(bytes.slice(0, byteOffset))
  const lines = prefix.split('\n')
  return { line: lines.length, column: lines[lines.length - 1].length + 1 }
}

function hideEdgeInfo() {
  els.edgeInfo.hidden = true
  els.edgeSource.hidden = true
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

interface ExecOutcome {
  artifactGraph: ArtifactGraph
  filenames: Map<number, string>
  variables: Record<string, unknown>
}

function execOutcomeFromResponse(value: unknown): ExecOutcome | undefined {
  const parsed = parseMaybeJsonDeep(value)
  let outcome: Record<string, unknown> | undefined
  walk(parsed, (node) => {
    if (!isRecord(node) || node.type !== 'exec_kcl_project' || !isRecord(node.data)) return
    const result = node.data.result
    if (isRecord(result) && isRecord(result.Ok)) {
      const execOutcome = isRecord(result.Ok.exec_outcome) ? result.Ok.exec_outcome : result.Ok
      if (isRecord(execOutcome)) outcome = execOutcome
    }
  })
  if (!outcome) return undefined

  const rawGraph = outcome.artifactGraph ?? outcome.artifact_graph
  const graph: ArtifactGraph = {}
  if (isRecord(rawGraph)) {
    // Could be { map: [[id, node], ...] } or a direct record.
    const entries = Array.isArray(rawGraph.map) ? rawGraph.map : Object.entries(rawGraph)
    if (Array.isArray(entries)) {
      for (const entry of entries) {
        if (Array.isArray(entry) && typeof entry[0] === 'string' && isRecord(entry[1])) {
          graph[entry[0]] = entry[1] as Record<string, unknown>
        }
      }
    }
  }

  const rawFilenames = outcome.filenames
  const filenames = new Map<number, string>()
  if (isRecord(rawFilenames)) {
    for (const [key, value] of Object.entries(rawFilenames)) {
      const moduleId = Number(key)
      if (Number.isFinite(moduleId) && typeof value === 'string') filenames.set(moduleId, value)
    }
  } else if (Array.isArray(rawFilenames)) {
    for (const entry of rawFilenames) {
      if (Array.isArray(entry) && typeof entry[1] === 'string') {
        const moduleId = Number(entry[0])
        if (Number.isFinite(moduleId)) filenames.set(moduleId, entry[1])
      }
    }
  }

  const rawVariables = outcome.variables ?? outcome.values
  const variables: Record<string, unknown> = {}
  if (isRecord(rawVariables)) {
    for (const [name, value] of Object.entries(rawVariables)) {
      variables[name] = value
    }
  }

  return { artifactGraph: graph, filenames, variables }
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
      const project = await readDirectoryProject(files)
      selectedProject$.value = project
      els.kcl.value = project.files.get(project.mainKclPathName) ?? ''
      setStatus(
        `Loaded ${project.name}: ${project.files.size} files, entrypoint ${project.mainKclPathName}.`
      )
    })
  })
  els.loaderProjectZip.addEventListener('change', () => {
    const file = els.loaderProjectZip.files?.[0]
    if (!file) return
    void loadFromLauncher(async () => {
      const project = await readZipProject(file)
      selectedProject$.value = project
      els.kcl.value = project.files.get(project.mainKclPathName) ?? ''
      setStatus(
        `Loaded ${project.name}: ${project.files.size} files, entrypoint ${project.mainKclPathName}.`
      )
    })
  })
  els.loadClipboard.addEventListener('click', () => {
    els.loaderStatus.value = ''
    void loadFromLauncher(async () => {
      const kcl = (await navigator.clipboard.readText()).trim()
      if (!kcl) throw new Error('The clipboard does not contain KCL source.')
      selectedProject$.value = undefined
      els.kcl.value = kcl
      setStatus('Loaded KCL from clipboard.')
    })
  })
  els.kcl.addEventListener('input', () => {
    selectedProject$.value = undefined
  })
  els.paste.addEventListener('click', () => void pasteKcl())
  els.run.addEventListener('click', () => void runKcl())
  els.edgeInfoClose.addEventListener('click', hideEdgeInfo)
  els.edgeUuid.addEventListener('click', () => els.edgeUuid.select())
  els.edgeUuidCopy.addEventListener('click', () => void copyEdgeUuid())
  const updateLighting = () => {
    const mode = els.lightingDynamic.checked ? 'dynamic' : els.lightingMouseFollow.checked ? 'mouse' : 'uniform'
    viewer.setLighting(mode)
  }
  els.lightingUniform.addEventListener('change', updateLighting)
  els.lightingDynamic.addEventListener('change', updateLighting)
  els.lightingMouseFollow.addEventListener('change', updateLighting)
  updateLighting()
  const updateViewFitting = () => viewer.setViewFitting(els.frameFirstImport.checked, els.fitObjectsInView.checked)
  els.frameFirstImport.addEventListener('change', updateViewFitting)
  els.fitObjectsInView.addEventListener('change', updateViewFitting)
  updateViewFitting()
  els.clear.addEventListener('click', () => {
    viewer.clearModel()
    sceneBodyIds$.value = new Set()
    hideEdgeInfo()
    setStatus('Scene cleared')
  })

  els.fileSelect.addEventListener('change', () => {
    if (!selectedProject$.value) return
    const path = els.fileSelect.value
    if (!path || path === selectedProject$.value.mainKclPathName) return
    selectedProject$.value = { ...selectedProject$.value, mainKclPathName: path }
    els.kcl.value = selectedProject$.value.files.get(path) ?? ''
    void runKcl()
  })

  els.tabExport.addEventListener('click', () => {
    activeTab$.value = activeTab$.value === 'export' ? null : 'export'
  })
  els.tabParameters.addEventListener('click', () => {
    activeTab$.value = activeTab$.value === 'parameters' ? null : 'parameters'
  })
  els.tabResults.addEventListener('click', () => {
    activeTab$.value = activeTab$.value === 'results' ? null : 'results'
  })
  els.exportOptions.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof HTMLButtonElement) || !target.dataset.exportFormat) return
    void exportModel(target.dataset.exportFormat as ExportFormat)
  })
  els.snapshotDock.addEventListener('click', (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-view]')
    if (!card) return
    const view = namedViews.find((v) => v.key === card.dataset.view)
    if (view) viewer.lookAtView(view)
  })

  els.disconnect.addEventListener('click', disconnectEngine)
  els.xrayToggle.addEventListener('click', () => { xrayEnabled$.value = !xrayEnabled$.value })
  els.xrayOpacity.addEventListener('input', () => {
    if (!xrayEnabled$.value) xrayEnabled$.value = true
    viewer.setXray(true, Number(els.xrayOpacity.value))
  })
  els.viewsToggle.addEventListener('click', () => { viewsVisible$.value = !viewsVisible$.value })
  els.photoToggle.addEventListener('click', () => { photoMode$.value = !photoMode$.value })

  window.addEventListener('message', handleEmbeddedMessage)

  for (const input of [els.token, els.baseUrl, els.pool]) {
    input.addEventListener('change', persistSettings)
  }

  // Reactive DOM updates
  effect(() => {
    renderFileSelect(selectedProject$.value)
  })

  effect(() => {
    lastExecOutcome$.value  // read to track
    renderDataPanels()
  })

  effect(() => {
    sceneBodyIds$.value  // read to track
    renderBodies()
  })

  effect(() => {
    const tab = activeTab$.value
    els.tabExport.classList.toggle('active', tab === 'export')
    els.tabParameters.classList.toggle('active', tab === 'parameters')
    els.tabResults.classList.toggle('active', tab === 'results')
    els.dataPanels.hidden = tab === null
    els.exportPanel.hidden = tab !== 'export'
    els.parametersList.hidden = tab !== 'parameters'
    els.resultsList.hidden = tab !== 'results'
  })

  effect(() => {
    const connected = engineConnected$.value
    els.commandIndicator.hidden = !connected
    els.disconnect.hidden = !connected
    els.dataPills.hidden = !connected
    els.viewsToggle.hidden = !connected
    els.photoToggle.hidden = !connected
    els.xrayGroup.hidden = !connected
  })

  effect(() => {
    const enabled = xrayEnabled$.value
    viewer.setXray(enabled, Number(els.xrayOpacity.value))
    els.xrayToggle.dataset.active = enabled ? 'true' : 'false'
    els.xrayToggle.title = enabled ? 'Disable xray' : 'Xray'
    els.xrayOpacity.hidden = !enabled
  })

  effect(() => {
    const visible = viewsVisible$.value
    els.snapshotDock.hidden = !visible
    els.viewsToggle.dataset.active = visible ? 'true' : 'false'
    els.viewsToggle.title = visible ? 'Hide views' : 'Show views'
  })

  effect(() => {
    const active = photoMode$.value
    els.app.classList.toggle('photo-mode', active)
    els.photoToggle.dataset.active = active ? 'true' : 'false'
    els.photoToggle.title = active ? 'Show UI' : 'Photo'
  })

  effect(() => {
    const { total, remaining } = pendingCommands$.value
    const ratio = total > 0 ? remaining / total : 0
    els.commandFill.style.transform = `scaleX(${ratio})`
    els.commandDot.dataset.loading = total > 0 ? 'true' : 'false'
  })

  // Render export format buttons (static, once)
  els.exportOptions.replaceChildren(
    ...exportFormats.map(({ key, label }) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.dataset.exportFormat = key
      btn.textContent = label
      return btn
    })
  )
}

initialize()
