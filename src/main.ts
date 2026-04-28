import * as zoo from '@kittycad/lib'
import { ZooWebView } from '@kittycad/web-view'

declare global {
  interface Window {
    zooExecutorResult?: unknown
    zooSelectedFeatures?: Array<{ type: string; uuid: string; objectId?: string }>
    zooLastSelectionResponse?: unknown
    zooLastSelectionResolvedFeatures?: Array<{ type: string; uuid: string; objectId?: string }>
  }
}

declare const __APP_COMMIT_HASH__: string | undefined

type SelectionMode = 'body' | 'feature'
type SelectedFeature = { type: string; uuid: string; objectId?: string }
type SelectedFeatureSourceMapping = {
  type: string
  uuid: string
  artifactId: string
  filename: string
  sourceRange: SourceRange
  sourceCode: string
  location: string
}
type SelectionDisplay = {
  pillText: string
  pillTitle: string
  overlayTitle: string
  overlayCode: string
  hasSelection: boolean
  targetDirectoryFilePath: string
}
type SelectionMappingsCache = {
  executorResult: unknown
  input: ExecutionInput
  featureKey: string
  mappings: SelectedFeatureSourceMapping[]
}
type SelectionDisplayCache = {
  mappings: SelectedFeatureSourceMapping[]
  activeDirectoryFilePath: string
  display: SelectionDisplay
}

type BrowserDirectoryFile = {
  path: string
  file: File
}

type SourceSelection =
  | { kind: 'file'; handle: FileSystemFileHandle; label: string }
  | { kind: 'directory'; handle: FileSystemDirectoryHandle; label: string }
  | { kind: 'browser-file'; file: File; label: string }
  | { kind: 'browser-directory'; files: BrowserDirectoryFile[]; label: string }
  | { kind: 'clipboard'; text: string; label: string }
  | { kind: 'snapshot'; input: string | Map<string, string>; label: string }

type ClientLike = {
  token?: string
}

type MaterialParams = {
  color: { r: number; g: number; b: number; a: number }
  metalness: number
  roughness: number
  ambient_occlusion: number
}

type ComponentTransform = {
  rotate_angle_axis?: {
    origin?: unknown
    property: { x: number; y: number; z: number; w: number }
    set: boolean
  } | null
  rotate_rpy?: {
    origin?: unknown
    property: { x: number; y: number; z: number }
    set: boolean
  } | null
  scale?: {
    origin?: unknown
    property: { x: number; y: number; z: number }
    set: boolean
  } | null
  translate?: {
    origin?: unknown
    property: { x: number; y: number; z: number }
    set: boolean
  } | null
}

type ExplodeMode = 'horizontal' | 'vertical' | 'radial' | 'grid'
type SnapshotView = 'top' | 'profile' | 'front'
type DiffSide = 'base' | 'compare'

type ExecutorLike = {
  addEventListener?: (
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ) => void
  removeEventListener?: (
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ) => void
  submit: (
    input: string | Map<string, string>,
    options?: { mainKclPathName?: string },
  ) => Promise<unknown>
}

type WebViewLike = EventTarget & {
  el: HTMLElement
  rtc?: {
    executor: () => ExecutorLike
    send?: (message: string) => Promise<unknown> | unknown
    wasm?: (funcName: string, ...args: unknown[]) => Promise<unknown>
    deconstructor?: () => Promise<unknown> | unknown
    addEventListener?: (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions,
    ) => void
    removeEventListener?: (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions,
    ) => void
  }
  deconstructor?: () => Promise<unknown> | unknown
}

type AppDeps = {
  showOpenFilePicker: typeof window.showOpenFilePicker
  showDirectoryPicker: typeof window.showDirectoryPicker
  readClipboardText: () => Promise<string>
  writeClipboardText: (text: string) => Promise<void>
  fetch: (
    input: string,
    init?: RequestInit,
  ) => Promise<Pick<Response, 'ok' | 'status' | 'headers'>>
  navigator: Pick<Navigator, 'userAgent' | 'vendor'>
  location: Pick<Location, 'hostname' | 'href'>
  redirectToLogin: (url: string) => void
  createClient: (token: string) => ClientLike
  createWebView: (args: {
    zooClient: ClientLike
    size: { width: number; height: number }
  }) => WebViewLike
  setTimeout: typeof window.setTimeout
  clearTimeout: typeof window.clearTimeout
  storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
  document: Document
  measure: (element: HTMLElement) => { width: number; height: number }
}

type ExecutionInput = string | Map<string, string>
type SourceRange = [number, number, number]
type KclErrorDisplay = {
  message: string
  location: string
}

type WritableFileStream = {
  write: (
    data:
      | string
      | Blob
      | BufferSource
      | {
          type: 'write'
          position: number
          data: string | Blob | BufferSource
        },
  ) => Promise<unknown>
  close: () => Promise<unknown>
}

type WritableFileHandle = FileSystemFileHandle & {
  createWritable: () => Promise<WritableFileStream>
}

const diffBaseMarkerHex = '#0000ff'
const diffCompareMarkerHex = '#00ff00'
const websocketPipeFilename = 'websocket.pipe'
const errorsLogFilename = 'errors.log'
const websocketBridgeFilenames = new Set([websocketPipeFilename, errorsLogFilename])
const ignoredDirectoryNames = new Set([
  '.git',
  '.idea',
  '.vscode',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.turbo',
])
const browserBannerMarkup = `
  <span>Live reloading only available in</span>
  <span class="browser-banner-icons">
    <a class="browser-banner-link browser-banner-option" href="https://www.google.com/chrome/" target="_blank" rel="noreferrer" aria-label="Download Google Chrome">
      <span class="browser-banner-icon" aria-hidden="true"><img src="./chrome.svg" alt=""></span>
      <span>Google Chrome</span>
    </a>
    <span class="browser-banner-option" aria-label="Microsoft Edge">
      <span class="browser-banner-icon" aria-hidden="true"><img src="./edge.svg" alt=""></span>
      <span>Microsoft Edge</span>
    </span>
  </span>
`
const defaultDisconnectMessage =
  'Disconnected from Zoo. Choose a file, project, or clipboard contents to reconnect.'
const disconnectBannerMarkup = (message: string) => `
  <span>${message}</span>
`

export function createApp(root: HTMLElement, partialDeps: Partial<AppDeps> = {}) {
  const appCommitHash =
    typeof __APP_COMMIT_HASH__ !== 'undefined' && __APP_COMMIT_HASH__
      ? __APP_COMMIT_HASH__
      : 'dev'
  const fallbackPicker = async () => {
    throw new DOMException('aborted', 'AbortError')
  }
  const deps: AppDeps = {
    showOpenFilePicker:
      window.showOpenFilePicker?.bind(window) ??
      (fallbackPicker as typeof window.showOpenFilePicker),
    showDirectoryPicker:
      window.showDirectoryPicker?.bind(window) ??
      (fallbackPicker as typeof window.showDirectoryPicker),
    readClipboardText: () => navigator.clipboard.readText(),
    writeClipboardText: text => navigator.clipboard.writeText(text),
    fetch: (input, init) => fetch(input, init),
    navigator: window.navigator,
    location: window.location,
    redirectToLogin: url => {
      window.location.href = url
    },
    createClient: token =>
      new zoo.Client({
        token,
        baseUrl: 'wss://api.zoo.dev',
      }),
    createWebView: args =>
      new ZooWebView({
        zooClient: args.zooClient as zoo.Client,
        size: args.size,
      }) as unknown as WebViewLike,
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    storage: window.localStorage,
    document,
    measure: element => {
      const rect = element.getBoundingClientRect()
      return { width: rect.width, height: rect.height }
    },
    ...partialDeps,
  }

  root.innerHTML = `
    <div class="app-shell">
      <div class="viewer-wrap">
        <div class="snapshot-column">
          <div class="snapshot-rail" data-snapshot-rail>
            <div class="snapshot-card" data-snapshot-card="top">
              <span class="snapshot-label">Top</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="top" alt="Top snapshot">
                <div class="snapshot-empty" data-snapshot-empty="top"></div>
              </div>
            </div>
            <div class="snapshot-card" data-snapshot-card="profile">
              <span class="snapshot-label">Profile</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="profile" alt="Profile snapshot">
                <div class="snapshot-empty" data-snapshot-empty="profile"></div>
              </div>
            </div>
            <div class="snapshot-card" data-snapshot-card="front">
              <span class="snapshot-label">Front</span>
              <div class="snapshot-frame">
                <img data-snapshot-image="front" alt="Front snapshot">
                <div class="snapshot-empty" data-snapshot-empty="front"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="viewer-stage">
          <div class="viewer-ui viewer-ui-left">
            <span class="viewer-version" data-version-badge></span>
            <label class="token-field">
              <input
                type="text"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                placeholder="Paste Zoo API token"
                data-token-input
              >
            </label>
            <div class="kcl-error" data-kcl-error hidden role="status" aria-live="polite">
              <span class="kcl-error-label" data-kcl-error-label>KCL error</span>
              <pre data-kcl-error-text></pre>
            </div>
          </div>
          <div class="viewer-ui viewer-ui-right">
          <div class="meta">
              <button type="button" data-edges aria-label="Toggle edges"></button>
              <button type="button" data-xray aria-label="Toggle xray"></button>
              <div class="explode-group">
                <div class="explode-controls">
                  <div class="explode-modes">
                    <button type="button" data-explode-horizontal aria-label="Horizontal explode">H</button>
                    <button type="button" data-explode-vertical aria-label="Vertical explode">V</button>
                    <button type="button" data-explode-radial aria-label="Radial explode">R</button>
                    <button type="button" data-explode-grid aria-label="Grid explode">G</button>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value="10"
                    data-explode-spacing
                    aria-label="Explode spacing"
                  >
                </div>
                <button type="button" data-explode aria-label="Open explode modes"></button>
              </div>
              <div class="diff-group">
                <div class="diff-controls">
                  <div class="diff-loaders">
                    <button type="button" data-diff-original aria-label="Compare against original"></button>
                    <button type="button" data-diff-directory aria-label="Load project"></button>
                    <button type="button" data-diff-file aria-label="Load KCL file"></button>
                    <button type="button" data-diff-clipboard aria-label="Use clipboard contents"></button>
                  </div>
                </div>
                <button type="button" data-diff aria-label="Toggle diff mode"></button>
              </div>
          </div>
          </div>
          <div class="viewer-connection">
            <div class="viewer-connection-row">
              <div class="viewer-source-stack">
                <span data-source>none</span>
                <label class="directory-file-field" data-directory-file-field hidden>
                  <select data-directory-file-select aria-label="Active project file"></select>
                </label>
              </div>
              <span data-status aria-label="Connection status"></span>
              <button type="button" data-disconnect aria-label="Disconnect"></button>
            </div>
            <div class="viewer-connection-file-row" data-directory-file-row hidden>
              <div class="selection-mode-toggle" role="group" aria-label="Selection mode">
                <button type="button" data-selection-mode-body aria-label="Select bodies">Body</button>
                <button type="button" data-selection-mode-feature aria-label="Select faces and edges">Face/Edge</button>
              </div>
              <div class="selection-popover-anchor">
                <button
                  type="button"
                  class="selection-range"
                  data-selection-range
                  aria-label="Show selected source range"
                  hidden
                ></button>
                <div class="selection-overlay-backdrop" data-selection-overlay hidden>
                  <div
                    class="selection-overlay"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="selection-overlay-title"
                  >
                    <div class="selection-overlay-header">
                      <span class="selection-overlay-title" id="selection-overlay-title" data-selection-overlay-title></span>
                      <button type="button" class="selection-overlay-close" data-selection-overlay-close aria-label="Close source preview">X</button>
                    </div>
                    <pre class="selection-overlay-code" data-selection-overlay-code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="viewer" data-viewer></div>
        </div>
      </div>
    </div>
  `

  const tokenInput = root.querySelector<HTMLInputElement>('[data-token-input]')!
  const directoryFileRow =
    root.querySelector<HTMLElement>('[data-directory-file-row]')!
  const directoryFileField =
    root.querySelector<HTMLLabelElement>('[data-directory-file-field]')!
  const directoryFileSelect =
    root.querySelector<HTMLSelectElement>('[data-directory-file-select]')!
  const kclError = root.querySelector<HTMLElement>('[data-kcl-error]')!
  const kclErrorLabel = root.querySelector<HTMLElement>('[data-kcl-error-label]')!
  const kclErrorText = root.querySelector<HTMLElement>('[data-kcl-error-text]')!
  const viewerUiLeft = root.querySelector<HTMLElement>('.viewer-ui-left')!
  const viewerConnection = root.querySelector<HTMLElement>('.viewer-connection')!
  const viewerStage = root.querySelector<HTMLElement>('.viewer-stage')!
  const versionBadge = root.querySelector<HTMLElement>('[data-version-badge]')!
  const sourceValue = root.querySelector<HTMLElement>('[data-source]')!
  const statusValue = root.querySelector<HTMLElement>('[data-status]')!
  const edgesButton = root.querySelector<HTMLButtonElement>('[data-edges]')!
  const xrayButton = root.querySelector<HTMLButtonElement>('[data-xray]')!
  const selectionRangeValue =
    root.querySelector<HTMLButtonElement>('[data-selection-range]')!
  const selectionModeBodyButton =
    root.querySelector<HTMLButtonElement>('[data-selection-mode-body]')!
  const selectionModeFeatureButton =
    root.querySelector<HTMLButtonElement>('[data-selection-mode-feature]')!
  const selectionOverlay =
    root.querySelector<HTMLElement>('[data-selection-overlay]')!
  const selectionOverlayTitle =
    root.querySelector<HTMLElement>('[data-selection-overlay-title]')!
  const selectionOverlayCode =
    root.querySelector<HTMLElement>('[data-selection-overlay-code]')!
  const selectionOverlayClose =
    root.querySelector<HTMLButtonElement>('[data-selection-overlay-close]')!
  const explodeButton = root.querySelector<HTMLButtonElement>('[data-explode]')!
  const diffButton = root.querySelector<HTMLButtonElement>('[data-diff]')!
  const diffOriginalButton =
    root.querySelector<HTMLButtonElement>('[data-diff-original]')!
  const diffDirectoryButton =
    root.querySelector<HTMLButtonElement>('[data-diff-directory]')!
  const diffFileButton = root.querySelector<HTMLButtonElement>('[data-diff-file]')!
  const diffClipboardButton =
    root.querySelector<HTMLButtonElement>('[data-diff-clipboard]')!
  const explodeHorizontalButton =
    root.querySelector<HTMLButtonElement>('[data-explode-horizontal]')!
  const explodeVerticalButton =
    root.querySelector<HTMLButtonElement>('[data-explode-vertical]')!
  const explodeRadialButton = root.querySelector<HTMLButtonElement>('[data-explode-radial]')!
  const explodeGridButton = root.querySelector<HTMLButtonElement>('[data-explode-grid]')!
  const explodeSpacingInput = root.querySelector<HTMLInputElement>('[data-explode-spacing]')!
  const disconnectButton = root.querySelector<HTMLButtonElement>('[data-disconnect]')!
  const viewer = root.querySelector<HTMLElement>('[data-viewer]')!
  const snapshotRail = root.querySelector<HTMLElement>('[data-snapshot-rail]')!
  const snapshotCards = {
    top: root.querySelector<HTMLElement>('[data-snapshot-card="top"]')!,
    profile: root.querySelector<HTMLElement>('[data-snapshot-card="profile"]')!,
    front: root.querySelector<HTMLElement>('[data-snapshot-card="front"]')!,
  } as const
  const snapshotImages = {
    top: root.querySelector<HTMLImageElement>('[data-snapshot-image="top"]')!,
    profile: root.querySelector<HTMLImageElement>('[data-snapshot-image="profile"]')!,
    front: root.querySelector<HTMLImageElement>('[data-snapshot-image="front"]')!,
  } as const
  const snapshotEmptyStates = {
    top: root.querySelector<HTMLElement>('[data-snapshot-empty="top"]')!,
    profile: root.querySelector<HTMLElement>('[data-snapshot-empty="profile"]')!,
    front: root.querySelector<HTMLElement>('[data-snapshot-empty="front"]')!,
  } as const
  diffOriginalButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7.5a7 7 0 0 1 11 2.1M17 4.5v5h-5M17 16.5a7 7 0 0 1-11-2.1M7 19.5v-5h5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>'
  diffDirectoryButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
  diffFileButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
  diffClipboardButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'

  const measured = deps.measure(viewer)
  const size = {
    width: Math.max(320, Math.floor(measured.width || viewer.clientWidth || 960)),
    height: Math.max(240, Math.floor(measured.height || viewer.clientHeight || 540)),
  }

  const tokenStorageKey = 'zoo-api-token'
  const usesZooCookieAuth =
    deps.location.hostname === 'zoo.dev' || deps.location.hostname.endsWith('.zoo.dev')
  const isMicrosoftEdge = /Edg\/\d+/.test(deps.navigator.userAgent)
  const isGoogleChrome =
    deps.navigator.vendor === 'Google Inc.' &&
    /Chrome\/\d+/.test(deps.navigator.userAgent) &&
    !/Edg\/|OPR\/|Brave\//.test(deps.navigator.userAgent)
  const isSupportedBrowser = isGoogleChrome || isMicrosoftEdge
  const isJsdomNavigator = /jsdom/i.test(deps.navigator.userAgent)
  const usesRegularPickerFallback = !isSupportedBrowser && !isJsdomNavigator
  const loginUrl = `https://zoo.dev/signin?callbackUrl=${encodeURIComponent(deps.location.href)}`
  const state: {
    token: string
    source: SourceSelection | null
    originalSourceInput: ExecutionInput | null
    disconnectMessage: string
    webView: WebViewLike | null
    executor: ExecutorLike | null
    pollTimer: number
    websocketPollTimer: number
    websocketPipeModified: number
    lastModified: number
    execution: Promise<unknown> | null
    executorMessageHandler: ((event: Event) => void) | null
    rtcCloseHandler: ((event: Event) => void) | null
    kclErrors: string[]
    kclErrorLocations: string[]
    executorValues: unknown
    directoryFilePaths: string[]
    activeDirectoryFilePath: string
    lastExecutionInput: ExecutionInput | null
    edgeLinesVisible: boolean
    edgeLinesVisibleBeforeDiff: boolean
    xrayVisible: boolean
    diffEnabled: boolean
    diffCompareSource: SourceSelection | null
    diffBodyOwnershipByArtifactId: Record<string, DiffSide>
    diffBodyOwnershipSequence: DiffSide[]
    diffObjectOwnershipById: Record<string, DiffSide>
    seenObjectIdsInSendOrder: string[]
    explodeMenuVisible: boolean
    explodeMode: ExplodeMode | null
    explodeSpacing: number
    snapshotUrls: Record<SnapshotView, string>
    snapshotRefreshing: boolean
    selectionMode: SelectionMode
    selectionOverlayOpen: boolean
    pendingSelectionRequestId: string
    bodyArtifactIds: string[]
    pendingBodyArtifactIds: string[]
    materialByObjectId: Record<string, MaterialParams>
    pendingMaterialByObjectId: Record<string, MaterialParams>
    transformByObjectId: Record<string, ComponentTransform[]>
    pendingTransformByObjectId: Record<string, ComponentTransform[]>
    explodeOffsetByObjectId: Record<string, { x: number; y: number; z: number }>
    solidObjectIds: string[]
    pendingSolidObjectIdsRequestId: string
    ignoredOutgoingCommandIds: Set<string>
  } = {
    token: usesZooCookieAuth ? '' : (deps.storage.getItem(tokenStorageKey)?.trim() ?? ''),
    source: null,
    originalSourceInput: null,
    disconnectMessage: '',
    webView: null,
    executor: null,
    pollTimer: 0,
    websocketPollTimer: 0,
    websocketPipeModified: 0,
    lastModified: 0,
    execution: null,
    executorMessageHandler: null,
    rtcCloseHandler: null,
    kclErrors: [],
    kclErrorLocations: [],
    executorValues: null,
    directoryFilePaths: [],
    activeDirectoryFilePath: '',
    lastExecutionInput: null,
    edgeLinesVisible: true,
    edgeLinesVisibleBeforeDiff: true,
    xrayVisible: false,
    diffEnabled: false,
    diffCompareSource: null,
    diffBodyOwnershipByArtifactId: {},
    diffBodyOwnershipSequence: [],
    diffObjectOwnershipById: {},
    seenObjectIdsInSendOrder: [],
    explodeMenuVisible: false,
    explodeMode: null,
    explodeSpacing: 10,
    snapshotUrls: {
      top: '',
      profile: '',
      front: '',
    },
    snapshotRefreshing: false,
    selectionMode: 'body',
    selectionOverlayOpen: false,
    pendingSelectionRequestId: '',
    bodyArtifactIds: [],
    pendingBodyArtifactIds: [],
    materialByObjectId: {},
    pendingMaterialByObjectId: {},
    transformByObjectId: {},
    pendingTransformByObjectId: {},
    explodeOffsetByObjectId: {},
    solidObjectIds: [],
    pendingSolidObjectIdsRequestId: '',
    ignoredOutgoingCommandIds: new Set<string>(),
  }
  let requestNumber = 0
  let selectionMappingsCache: SelectionMappingsCache | null = null
  let selectionDisplayCache: SelectionDisplayCache | null = null
  const selectionOwnerObjectIdByEntityId = new Map<string, string>()
  const nextRequestId = () =>
    globalThis.crypto?.randomUUID?.() ??
    `00000000-0000-4000-8000-${`${++requestNumber}`.padStart(12, '0')}`
  const zooGlobalRecord = () => {
    const zooRecord = (window as Window & { zoo?: Record<string, unknown> }).zoo
    return zooRecord && typeof zooRecord === 'object' ? zooRecord : null
  }
  const currentExecutorResult = () => {
    const zooRecord = zooGlobalRecord()
    if (zooRecord?.executorResult !== undefined) {
      return zooRecord.executorResult
    }
    return window.zooExecutorResult
  }
  const setCurrentExecutorResult = (result: unknown) => {
    let zooRecord = zooGlobalRecord()
    if (!zooRecord) {
      zooRecord = {}
      ;(window as Window & { zoo?: Record<string, unknown> }).zoo = zooRecord
    }
    zooRecord.executorResult = result
    window.zooExecutorResult = result
  }
  const cloneExecutionInput = (input: ExecutionInput) =>
    typeof input === 'string' ? input : new Map(input)
  const normalizeOffset = (value: number) =>
    Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6))
  const bodyResponseTypes = new Set([
    'extrude',
    'extrude_to_reference',
    'twist_extrude',
    'revolve',
    'revolve_about_edge',
    'sweep',
    'loft',
  ])
  const bodyOperationNames = new Set([
    'extrude',
    'extrudeToReference',
    'twistExtrude',
    'revolve',
    'revolveAboutEdge',
    'sweep',
    'loft',
  ])
  const xrayOpacity = 0.22
  const gridSpacingMultiplier = 7.5
  const diffBaseMarkerColor = { r: 0, g: 0, b: 1 }
  const diffCompareMarkerColor = { r: 0, g: 1, b: 0 }
  const selectionFiltersByMode: Record<SelectionMode, string[]> = {
    body: ['solid3d'],
    feature: ['face', 'edge'],
  }
  const snapshotViews = [
    {
      key: 'top' as const,
      label: 'Top',
      vantage: { x: 0, y: 0, z: 128 },
      up: { x: 0, y: 1, z: 0 },
    },
    {
      key: 'profile' as const,
      label: 'Profile',
      vantage: { x: 128, y: 0, z: 0 },
      up: { x: 0, y: 0, z: 1 },
    },
    {
      key: 'front' as const,
      label: 'Front',
      vantage: { x: 0, y: -128, z: 0 },
      up: { x: 0, y: 0, z: 1 },
    },
  ]
  const defaultMaterial: MaterialParams = {
    color: {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    metalness: 0,
    roughness: 0.01,
    ambient_occlusion: 0,
  }
  const zoomToFitRequest = () =>
    JSON.stringify({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'zoom_to_fit',
            object_ids: [],
            padding: 0,
          },
          cmd_id: nextRequestId(),
        },
      ],
      batch_id: nextRequestId(),
      responses: true,
    })
  const zoomToFitEntityRequest = (objectId: string) =>
    JSON.stringify({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'zoom_to_fit',
            object_ids: [objectId],
            padding: 0,
          },
          cmd_id: nextRequestId(),
        },
      ],
      batch_id: nextRequestId(),
      responses: true,
    })
  const selectionFilterRequest = (cmd_id: string) =>
    JSON.stringify({
      type: 'modeling_cmd_req',
      cmd_id,
      cmd: {
        type: 'set_selection_filter',
        filter: selectionFiltersByMode[state.selectionMode],
      },
    })
  const modelingResponseFromRtcSend = (value: unknown) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as {
          success?: boolean
          request_id?: string
          resp?: {
            type?: string
            data?: {
              modeling_response?: {
                type?: string
                data?: Record<string, unknown>
              }
            }
          }
        }
      } catch {
        return null
      }
    }
    return value && typeof value === 'object'
      ? (value as {
          success?: boolean
          request_id?: string
          resp?: {
            type?: string
            data?: {
              modeling_response?: {
                type?: string
                data?: Record<string, unknown>
              }
            }
          }
        })
      : null
  }
  const selectedFeaturesFromUnknown = (
    value: unknown,
    seen = new Set<string>(),
  ): SelectedFeature[] => {
    if (!value || typeof value !== 'object') {
      return []
    }
    if (Array.isArray(value)) {
      return value.flatMap(entry => selectedFeaturesFromUnknown(entry, seen))
    }
    const record = value as Record<string, unknown>
    const typeCandidate =
      typeof record.feature_type === 'string'
        ? record.feature_type
        : typeof record.entity_type === 'string'
          ? record.entity_type
          : typeof record.object_type === 'string'
            ? record.object_type
            : typeof record.kind === 'string'
            ? record.kind
              : typeof record.type === 'string'
                ? record.type
                : ''
    const uuidCandidate =
      typeof record.uuid === 'string'
        ? record.uuid
        : typeof record.entity_id === 'string'
          ? record.entity_id
          : typeof record.object_id === 'string'
            ? record.object_id
            : typeof record.id === 'string'
              ? record.id
              : ''
    const objectIdCandidate =
      typeof record.object_id === 'string'
        ? record.object_id
        : typeof record.entity_id === 'string'
          ? record.entity_id
          : ''
    const next =
      uuidCandidate && typeCandidate && !seen.has(`${typeCandidate}\u0000${uuidCandidate}`)
        ? (() => {
            seen.add(`${typeCandidate}\u0000${uuidCandidate}`)
            return [
              {
                type: typeCandidate,
                uuid: uuidCandidate,
                objectId:
                  objectIdCandidate && objectIdCandidate !== uuidCandidate
                    ? objectIdCandidate
                    : undefined,
              },
            ]
          })()
        : []
    return [
      ...next,
      ...Object.values(record).flatMap(entry => selectedFeaturesFromUnknown(entry, seen)),
    ]
  }
  const selectedFeatureIdsFromUnknown = (
    value: unknown,
    allowBareString = false,
    seenObjects = new Set<unknown>(),
    seenIds = new Set<string>(),
  ): string[] => {
    if (typeof value === 'string') {
      if (!allowBareString || seenIds.has(value)) {
        return []
      }
      seenIds.add(value)
      return [value]
    }
    if (!value || typeof value !== 'object' || seenObjects.has(value)) {
      return []
    }
    seenObjects.add(value)
    if (Array.isArray(value)) {
      return value.flatMap(entry =>
        selectedFeatureIdsFromUnknown(entry, true, seenObjects, seenIds),
      )
    }
    const record = value as Record<string, unknown>
    const direct = ['uuid', 'entity_id', 'object_id', 'id'].flatMap(key => {
      const entry = record[key]
      if (typeof entry !== 'string' || seenIds.has(entry)) {
        return []
      }
      seenIds.add(entry)
      return [entry]
    })
    return [
      ...direct,
      ...Object.entries(record).flatMap(([key, entry]) => {
        if (
          key === 'type' ||
          key === 'kind' ||
          key === 'feature_type' ||
          key === 'entity_type' ||
          key === 'object_type'
        ) {
          return []
        }
        const nextAllowBareString =
          key === 'selection' ||
          key === 'selected' ||
          key === 'entities' ||
          key === 'ids' ||
          key === 'uuids' ||
          key.endsWith('_ids') ||
          key.endsWith('_uuids')
        return selectedFeatureIdsFromUnknown(
          entry,
          nextAllowBareString,
          seenObjects,
          seenIds,
        )
      }),
    ]
  }
  const selectedFeaturesForSelectionMode = (
    value: unknown,
    selectionMode: SelectionMode,
  ): SelectedFeature[] => {
    const directFeatures = selectedFeaturesFromUnknown(value)
    if (directFeatures.length) {
      return directFeatures
    }
    if (selectionMode === 'feature') {
      return selectedFeatureIdsFromUnknown(value).map(uuid => ({
        type: 'feature',
        uuid,
      }))
    }
    return selectedFeatureIdsFromUnknown(value).map(uuid => ({
      type: 'solid3d',
      uuid,
    }))
  }
  const selectionFeaturesScore = (features: SelectedFeature[]) =>
    features.reduce((score, feature) => {
      const typeScore = feature.type === 'feature' ? 0 : feature.type === 'solid3d' ? 1 : 2
      const objectIdScore = feature.objectId ? 1 : 0
      return score + typeScore + objectIdScore
    }, 0)
  const preferredSelectionFeatures = (
    primary: SelectedFeature[],
    fallback: SelectedFeature[],
  ) => {
    if (!primary.length) {
      return fallback
    }
    if (!fallback.length) {
      return primary
    }
    const primaryScore = selectionFeaturesScore(primary)
    const fallbackScore = selectionFeaturesScore(fallback)
    if (primaryScore !== fallbackScore) {
      return primaryScore > fallbackScore ? primary : fallback
    }
    return primary.length >= fallback.length ? primary : fallback
  }
  const resolveSelectionFeaturesForSourceMapping = async (features: SelectedFeature[]) => {
    if (!features.length || !state.executor) {
      return features
    }
    return Promise.all(
      features.map(async feature => {
        if (feature.objectId || feature.type === 'solid3d') {
          return feature
        }
        const cachedObjectId = selectionOwnerObjectIdByEntityId.get(feature.uuid)
        if (cachedObjectId) {
          return {
            ...feature,
            objectId: cachedObjectId,
          }
        }
        try {
          const response = await requestModelingResponse({
            type: 'entity_get_parent_id',
            entity_id: feature.uuid,
          })
          if (
            !response.success ||
            response.resp?.type !== 'modeling' ||
            response.resp.data?.modeling_response?.type !== 'entity_get_parent_id'
          ) {
            return feature
          }
          const objectId = (
            response.resp.data.modeling_response.data as { entity_id?: string } | undefined
          )?.entity_id
          if (!objectId) {
            return feature
          }
          selectionOwnerObjectIdByEntityId.set(feature.uuid, objectId)
          return {
            ...feature,
            objectId,
          }
        } catch {
          return feature
        }
      }),
    )
  }
  const clearSnapshotUrls = () => {
    state.snapshotUrls = {
      top: '',
      profile: '',
      front: '',
    }
  }
  const clearSelectedFeatureState = () => {
    state.pendingSelectionRequestId = ''
    state.selectionOverlayOpen = false
    selectionOwnerObjectIdByEntityId.clear()
    window.zooSelectedFeatures = []
    window.zooLastSelectionResponse = undefined
    window.zooLastSelectionResolvedFeatures = []
  }
  const utf8Slice = (sourceText: string, start: number, end: number) => {
    const encoded = new TextEncoder().encode(sourceText)
    const safeStart = Math.max(0, Math.min(encoded.length, Math.floor(start)))
    const safeEnd = Math.max(safeStart, Math.min(encoded.length, Math.floor(end)))
    return new TextDecoder().decode(encoded.slice(safeStart, safeEnd))
  }
  const streamSize = (width: number, height: number) => ({
    width: Math.max(4, Math.floor(Math.max(4, width) / 4) * 4),
    height: Math.max(4, Math.floor(Math.max(4, height) / 4) * 4),
  })
  const snapshotUrlFromContents = (contents?: string) => {
    const normalized = contents?.trim() ?? ''
    if (!normalized) {
      return ''
    }
    if (normalized.startsWith('data:image/')) {
      return normalized
    }
    const compact = normalized.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/')
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(compact)) {
      const remainder = compact.length % 4
      if (remainder !== 1) {
        const padded = `${compact}${remainder ? '='.repeat(4 - remainder) : ''}`
        try {
          if (typeof globalThis.atob === 'function' && typeof globalThis.btoa === 'function') {
            const decoded = globalThis.atob(padded)
            const reencoded = globalThis.btoa(decoded).replace(/=+$/g, '')
            if (reencoded === padded.replace(/=+$/g, '')) {
              return `data:image/png;base64,${padded}`
            }
          } else {
            return `data:image/png;base64,${padded}`
          }
        } catch {}
      }
    }
    try {
      return typeof globalThis.btoa === 'function'
        ? `data:image/png;base64,${globalThis.btoa(normalized)}`
        : ''
    } catch {
      return ''
    }
  }
  const normalizeKclErrorMessages = (messages: string[]) =>
    [...new Set(messages.map(message => message.trim()).filter(Boolean))]
  const normalizeKclErrorDisplays = (entries: KclErrorDisplay[]) => {
    const seen = new Set<string>()
    return entries.flatMap(entry => {
      const message = entry.message.trim()
      const location = entry.location.trim()
      if (!message) {
        return []
      }
      const key = `${location}\u0000${message}`
      if (seen.has(key)) {
        return []
      }
      seen.add(key)
      return [{ message, location }]
    })
  }
  const basenameFromPath = (path: string) => {
    const segments = path.split(/[\\/]/).filter(Boolean)
    return segments[segments.length - 1] ?? path
  }
  const normalizeExecutionPath = (path: string) =>
    path.trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '')
  const entryPathForInput = (input: ExecutionInput) => {
    if (typeof input === 'string') {
      return 'main.kcl'
    }
    const normalizedEntries = [...input.keys()].map(path => normalizeExecutionPath(path))
    if (normalizedEntries.includes('main.kcl')) {
      return 'main.kcl'
    }
    const kclPaths = normalizedEntries.filter(path => path.endsWith('.kcl')).sort()
    return kclPaths[0] ?? 'main.kcl'
  }
  const defaultDirectoryFilePath = (paths: string[]) => {
    const normalizedPaths = paths.map(path => normalizeExecutionPath(path)).filter(Boolean).sort()
    if (normalizedPaths.includes('main.kcl')) {
      return 'main.kcl'
    }
    return normalizedPaths[0] ?? ''
  }
  const isDirectorySourceSelection = (
    source: SourceSelection | null,
  ): source is
    | { kind: 'directory'; handle: FileSystemDirectoryHandle; label: string }
    | { kind: 'browser-directory'; files: BrowserDirectoryFile[]; label: string } =>
    source?.kind === 'directory' || source?.kind === 'browser-directory'
  const activeDirectoryFilePathForInput = (input: ExecutionInput, preferredPath: string) => {
    if (typeof input === 'string') {
      return 'main.kcl'
    }
    const normalizedEntries = [...input.keys()].map(path => normalizeExecutionPath(path))
    const normalizedPreferredPath = normalizeExecutionPath(preferredPath)
    if (normalizedPreferredPath && normalizedEntries.includes(normalizedPreferredPath)) {
      return normalizedPreferredPath
    }
    return entryPathForInput(input)
  }
  const resolveDirectoryFilePath = (path: string, candidates: string[]) => {
    const normalizedPath = normalizeExecutionPath(path)
    if (!normalizedPath) {
      return ''
    }
    const normalizedCandidates = candidates.map(candidate => normalizeExecutionPath(candidate))
    const exactIndex = normalizedCandidates.indexOf(normalizedPath)
    if (exactIndex >= 0) {
      return candidates[exactIndex] ?? ''
    }
    const suffixMatches = normalizedCandidates.flatMap((candidate, index) =>
      candidate.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidate}`)
        ? [candidates[index] ?? '']
        : [],
    )
    if (suffixMatches.length === 1) {
      return suffixMatches[0]!
    }
    const basename = basenameFromPath(normalizedPath)
    if (!basename) {
      return ''
    }
    const basenameMatches = normalizedCandidates.flatMap((candidate, index) =>
      basenameFromPath(candidate) === basename ? [candidates[index] ?? ''] : [],
    )
    return basenameMatches.length === 1 ? basenameMatches[0]! : ''
  }
  const directoryFilePathForFilename = (filename: string) => {
    if (!isDirectorySourceSelection(state.source)) {
      return ''
    }
    return resolveDirectoryFilePath(filename, state.directoryFilePaths)
  }
  const currentDirectoryFilePath = () => {
    if (!isDirectorySourceSelection(state.source) || !state.lastExecutionInput) {
      return state.activeDirectoryFilePath
    }
    return activeDirectoryFilePathForInput(state.lastExecutionInput, state.activeDirectoryFilePath)
  }
  const selectionFeatureKey = (features: SelectedFeature[]) =>
    features
      .map(feature => `${feature.type}\u0000${feature.uuid}\u0000${feature.objectId ?? ''}`)
      .join('\u0001')
  const diffEntryPathForInput = (input: ExecutionInput, prefix: string) => {
    return `${prefix}/${entryPathForInput(input)}`
  }
  const sourceCanPoll = (source: SourceSelection | null) =>
    source?.kind === 'file' || source?.kind === 'directory'
  const sourceExecutesImmediately = (source: SourceSelection | null) =>
    source?.kind === 'clipboard' ||
    source?.kind === 'browser-file' ||
    source?.kind === 'browser-directory'
  const isNotFoundError = (error: unknown) =>
    error instanceof DOMException && error.name === 'NotFoundError'
  const markerCandidatesFromSourceTextFallback = (sourceText: string) => {
    const bodyLikeTokens = [
      'extrude(',
      'extrude_to_reference(',
      'twistExtrude(',
      'twist_extrude(',
      'revolve(',
      'revolveAboutEdge(',
      'revolve_about_edge(',
      'sweep(',
      'loft(',
      'hole(',
      'chamfer(',
      'fillet(',
      'shell(',
      'hollow(',
      'union(',
      'subtract(',
      'intersect(',
      'patternCircular3d(',
      'patternLinear3d(',
      'patternTransform(',
      'translate(',
      'rotate(',
      'scale(',
      'clone(',
      'appearance(',
    ]
    const statements: string[] = []
    let currentStatement = ''
    for (const rawLine of sourceText.split('\n')) {
      const line = rawLine.replace(/\/\/.*$/, '')
      const isTopLevel =
        line.trim().length > 0 &&
        !line.startsWith(' ') &&
        !line.startsWith('\t')
      if (isTopLevel && currentStatement.trim()) {
        statements.push(currentStatement)
        currentStatement = ''
      }
      currentStatement += `${currentStatement ? '\n' : ''}${line}`
    }
    if (currentStatement.trim()) {
      statements.push(currentStatement)
    }
    const next = new Set<string>()
    const importAliases = new Set<string>()
    const assignedNames = new Set<string>()
    let lastTopLevelIdentifier = ''
    for (const statement of statements) {
      const trimmed = statement.trim()
      const importAlias = trimmed.match(
        /^import\s+["'][^"']+["']\s+as\s+([A-Za-z_][A-Za-z0-9_]*)/,
      )?.[1]
      if (importAlias) {
        importAliases.add(importAlias)
        continue
      }
      const assignedName = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/)?.[1]
      if (assignedName) {
        assignedNames.add(assignedName)
        if (bodyLikeTokens.some(token => statement.includes(token))) {
          next.add(assignedName)
        }
        continue
      }
      const bareIdentifier = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)$/)?.[1]
      if (bareIdentifier) {
        lastTopLevelIdentifier = bareIdentifier
      }
    }
    if (
      lastTopLevelIdentifier &&
      (importAliases.has(lastTopLevelIdentifier) || assignedNames.has(lastTopLevelIdentifier))
    ) {
      next.add(lastTopLevelIdentifier)
    }
    return [...next]
  }
  const diffMarkerOperationNames = new Set([
    'appearance',
    'chamfer',
    'clone',
    'extrude',
    'extrudeToReference',
    'extrude_to_reference',
    'fillet',
    'hollow',
    'hole',
    'intersect',
    'loft',
    'patternCircular3d',
    'patternLinear3d',
    'patternTransform',
    'pattern_circular3d',
    'pattern_linear3d',
    'pattern_transform',
    'revolve',
    'revolveAboutEdge',
    'revolve_about_edge',
    'rotate',
    'scale',
    'shell',
    'subtract',
    'sweep',
    'translate',
    'twistExtrude',
    'twist_extrude',
    'union',
  ])
  const identifierNameFromAstNode = (node: unknown): string => {
    if (!node || typeof node !== 'object') {
      return ''
    }
    const record = node as Record<string, unknown>
    if (record.type === 'Identifier' && typeof record.name === 'string') {
      return record.name
    }
    if (record.type === 'Name') {
      return identifierNameFromAstNode(record.name)
    }
    if (typeof record.name === 'string') {
      return record.name
    }
    return ''
  }
  const callNameFromAstNode = (node: unknown): string => {
    if (!node || typeof node !== 'object') {
      return ''
    }
    const record = node as Record<string, unknown>
    if (record.type === 'CallExpressionKw') {
      return callNameFromAstNode(record.callee)
    }
    if (record.type === 'Name') {
      return identifierNameFromAstNode(record.name)
    }
    return identifierNameFromAstNode(node)
  }
  const astContainsDiffMarkerOperation = (node: unknown): boolean => {
    if (!node || typeof node !== 'object') {
      return false
    }
    const record = node as Record<string, unknown>
    if (
      record.type === 'CallExpressionKw' &&
      diffMarkerOperationNames.has(callNameFromAstNode(record.callee))
    ) {
      return true
    }
    for (const value of Object.values(record)) {
      if (Array.isArray(value)) {
        if (value.some(entry => astContainsDiffMarkerOperation(entry))) {
          return true
        }
        continue
      }
      if (astContainsDiffMarkerOperation(value)) {
        return true
      }
    }
    return false
  }
  const markerCandidatesFromProgramAst = (program: unknown) => {
    if (!program || typeof program !== 'object') {
      return []
    }
    const body = Array.isArray((program as { body?: unknown[] }).body)
      ? ((program as { body: unknown[] }).body as unknown[])
      : []
    if (!body.length) {
      return []
    }
    const next = new Set<string>()
    const importAliases = new Set<string>()
    const assignedNames = new Set<string>()
    for (const statement of body) {
      if (!statement || typeof statement !== 'object') {
        continue
      }
      const record = statement as Record<string, unknown>
      if (record.type === 'ImportStatement') {
        const alias = identifierNameFromAstNode(
          (record.selector as Record<string, unknown> | undefined)?.alias,
        )
        if (alias) {
          importAliases.add(alias)
        }
        continue
      }
      if (record.type !== 'VariableDeclaration') {
        continue
      }
      const declaration = record.declaration as Record<string, unknown> | undefined
      const assignedName = identifierNameFromAstNode(declaration?.id)
      if (!assignedName) {
        continue
      }
      assignedNames.add(assignedName)
      if (astContainsDiffMarkerOperation(declaration?.init)) {
        next.add(assignedName)
      }
    }
    const lastStatement = body.at(-1)
    const lastExpressionIdentifier =
      lastStatement &&
      typeof lastStatement === 'object' &&
      (lastStatement as Record<string, unknown>).type === 'ExpressionStatement'
        ? identifierNameFromAstNode((lastStatement as Record<string, unknown>).expression)
        : ''
    if (
      lastExpressionIdentifier &&
      (importAliases.has(lastExpressionIdentifier) || assignedNames.has(lastExpressionIdentifier))
    ) {
      next.add(lastExpressionIdentifier)
    }
    return [...next]
  }
  const sourceTextWithDiffMarkersFallback = (sourceText: string, markerHex: string) => {
    const markerCandidates = markerCandidatesFromSourceTextFallback(sourceText)
    if (!markerCandidates.length) {
      return sourceText
    }
    return `${sourceText}\n\n${markerCandidates
      .map(name => `appearance(${name}, color = "${markerHex}")`)
      .join('\n')}\n`
  }
  const callRtcWasm = async (funcName: string, ...args: unknown[]) => {
    if (!state.webView?.rtc?.wasm) {
      return null
    }
    let timeoutId = 0
    try {
      return await Promise.race([
        state.webView.rtc.wasm(funcName, ...args),
        new Promise<null>(resolve => {
          timeoutId = globalThis.setTimeout(() => resolve(null), 1000)
        }),
      ])
    } finally {
      if (timeoutId) {
        globalThis.clearTimeout(timeoutId)
      }
    }
  }
  const sourceTextWithDiffMarkers = async (sourceText: string, markerHex: string) => {
    const parsedProgram = await callRtcWasm('parse_wasm', sourceText)
    if (!Array.isArray(parsedProgram) || !parsedProgram[0] || typeof parsedProgram[0] !== 'object') {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex)
    }
    const markerCandidates = markerCandidatesFromProgramAst(parsedProgram[0])
    if (!markerCandidates.length) {
      return sourceText
    }
    const markerProgram = await callRtcWasm(
      'parse_wasm',
      `${markerCandidates.map(name => `appearance(${name}, color = "${markerHex}")`).join('\n')}\n`,
    )
    if (!Array.isArray(markerProgram) || !markerProgram[0] || typeof markerProgram[0] !== 'object') {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex)
    }
    const programAst = parsedProgram[0] as { body?: unknown[] }
    const markerAst = markerProgram[0] as { body?: unknown[] }
    if (!Array.isArray(programAst.body) || !Array.isArray(markerAst.body) || !markerAst.body.length) {
      return sourceTextWithDiffMarkersFallback(sourceText, markerHex)
    }
    const insertIndex =
      programAst.body.at(-1) &&
      typeof programAst.body.at(-1) === 'object' &&
      (programAst.body.at(-1) as Record<string, unknown>).type === 'ExpressionStatement'
        ? programAst.body.length - 1
        : programAst.body.length
    programAst.body.splice(insertIndex, 0, ...markerAst.body)
    const recastedSource = await callRtcWasm('recast_wasm', JSON.stringify(programAst))
    return typeof recastedSource === 'string' && recastedSource.trim()
      ? recastedSource
      : sourceTextWithDiffMarkersFallback(sourceText, markerHex)
  }
  const prefixedProjectInput = async (
    input: ExecutionInput,
    prefix: string,
    markerHex: string,
  ) => {
    const entryPath = entryPathForInput(input)
    if (typeof input === 'string') {
      return new Map([[`${prefix}/main.kcl`, await sourceTextWithDiffMarkers(input, markerHex)]])
    }
    return new Map(
      await Promise.all(
        [...input.entries()].map(async ([path, sourceText]) => [
          `${prefix}/${normalizeExecutionPath(path)}`,
          normalizeExecutionPath(path) === entryPath
            ? await sourceTextWithDiffMarkers(sourceText, markerHex)
            : sourceText,
        ]),
      ),
    )
  }
  const buildMergedDiffInput = async (baseInput: ExecutionInput, compareInput: ExecutionInput) => {
    const basePrefix = '__codex_base'
    const comparePrefix = '__codex_compare'
    const merged = new Map<string, string>([
      ...(await prefixedProjectInput(baseInput, basePrefix, diffBaseMarkerHex)),
      ...(await prefixedProjectInput(compareInput, comparePrefix, diffCompareMarkerHex)),
    ])
    const baseEntryPath = diffEntryPathForInput(baseInput, basePrefix)
    const compareEntryPath = diffEntryPathForInput(compareInput, comparePrefix)
    merged.set(
      'main.kcl',
      [
        `import "${baseEntryPath}" as codexBaseModel`,
        `import "${compareEntryPath}" as codexCompareModel`,
        'codexCompareModel',
      ].join('\n'),
    )
    return merged
  }
  const kclErrorMessagesFromUnknown = (value: unknown, depth = 0): string[] => {
    if (depth > 5 || value == null) {
      return []
    }
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (!trimmed) {
        return []
      }
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed) as unknown
          const nested = kclErrorMessagesFromUnknown(parsed, depth + 1)
          if (nested.length) {
            return nested
          }
        } catch {}
      }
      return [trimmed]
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return [String(value)]
    }
    if (value instanceof Error) {
      return kclErrorMessagesFromUnknown(value.message, depth + 1)
    }
    if (Array.isArray(value)) {
      return normalizeKclErrorMessages(
        value.flatMap(entry => kclErrorMessagesFromUnknown(entry, depth + 1)),
      )
    }
    if (typeof value !== 'object') {
      return []
    }
    const record = value as Record<string, unknown>
    if (record.errors !== undefined) {
      const nested = kclErrorMessagesFromUnknown(record.errors, depth + 1)
      if (nested.length) {
        return nested
      }
    }
    for (const key of ['message', 'msg', 'reason', 'details', 'description', 'text']) {
      const nested = kclErrorMessagesFromUnknown(record[key], depth + 1)
      if (nested.length) {
        return nested
      }
    }
    return []
  }
  const executorResultRecord = (result: unknown) => {
    if (typeof result === 'string') {
      const trimmed = result.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed) as unknown
          return typeof parsed === 'object' && parsed !== null
            ? (parsed as Record<string, unknown>)
            : null
        } catch {
          return null
        }
      }
      return null
    }
    return typeof result === 'object' && result !== null
      ? (result as Record<string, unknown>)
      : null
  }
  const modulePathValue = (value: unknown) => {
    if (typeof value === 'string') {
      return value
    }
    if (!value || typeof value !== 'object') {
      return ''
    }
    const record = value as Record<string, unknown>
    return typeof record.value === 'string'
      ? record.value
      : typeof record.path === 'string'
        ? record.path
        : ''
  }
  const entriesFromMapLike = (value: unknown): Array<[string, unknown]> => {
    if (value instanceof Map) {
      return [...value.entries()].flatMap(entry =>
        typeof entry[0] === 'string' ? [[entry[0], entry[1]]] : [],
      )
    }
    if (Array.isArray(value)) {
      return value.flatMap(entry =>
        Array.isArray(entry) && entry.length >= 2 && typeof entry[0] === 'string'
          ? [[entry[0], entry[1]]]
          : [],
      )
    }
    if (value && typeof value === 'object') {
      return Object.entries(value as Record<string, unknown>)
    }
    return []
  }
  const valueFromMapLike = (value: unknown, key: string | number): unknown => {
    if (value instanceof Map) {
      return value.get(key) ?? value.get(String(key))
    }
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (
          Array.isArray(entry) &&
          entry.length >= 2 &&
          (entry[0] === key || entry[0] === String(key))
        ) {
          return entry[1]
        }
      }
      return undefined
    }
    if (value && typeof value === 'object') {
      const record = value as Record<string, unknown>
      if ('map' in record) {
        const nested = valueFromMapLike(record.map, key)
        if (nested !== undefined) {
          return nested
        }
      }
      return record[String(key)]
    }
    return undefined
  }
  const sourceTextForExecutionPath = (input: ExecutionInput, path: string) => {
    if (typeof input === 'string') {
      return input
    }
    const direct = input.get(path)
    if (typeof direct === 'string') {
      return direct
    }
    const normalizedPath = normalizeExecutionPath(path)
    for (const [candidatePath, sourceText] of input) {
      if (normalizeExecutionPath(candidatePath) === normalizedPath) {
        return sourceText
      }
    }
    const basename = basenameFromPath(normalizedPath)
    if (!basename) {
      return ''
    }
    const basenameMatches = [...input.entries()].filter(
      ([candidatePath]) => basenameFromPath(normalizeExecutionPath(candidatePath)) === basename,
    )
    return basenameMatches.length === 1 ? basenameMatches[0]![1] : ''
  }
  const mainKclPathNameForSource = (filePath: string) => {
    const normalizedPath = normalizeExecutionPath(filePath)
    return normalizedPath || 'main.kcl'
  }
  const sourceRangeFromUnknown = (value: unknown): SourceRange | null => {
    if (!Array.isArray(value) || value.length < 3) {
      return null
    }
    const [start, end, moduleId] = value
    if (
      typeof start !== 'number' ||
      typeof end !== 'number' ||
      typeof moduleId !== 'number' ||
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      !Number.isFinite(moduleId)
    ) {
      return null
    }
    return [start, end, moduleId]
  }
  const preferredSourceRange = (errorLike: Record<string, unknown>): SourceRange | null => {
    const direct =
      sourceRangeFromUnknown(errorLike.sourceRange) ??
      sourceRangeFromUnknown(errorLike.source_range)
    if (direct) {
      return direct
    }
    const sourceRanges = Array.isArray(errorLike.sourceRanges)
      ? errorLike.sourceRanges
      : Array.isArray(errorLike.source_ranges)
        ? errorLike.source_ranges
        : []
    for (const sourceRange of sourceRanges) {
      const parsed = sourceRangeFromUnknown(sourceRange)
      if (parsed) {
        return parsed
      }
    }
    const details =
      errorLike.details && typeof errorLike.details === 'object'
        ? (errorLike.details as Record<string, unknown>)
        : null
    if (!details) {
      return null
    }
    const detailDirect =
      sourceRangeFromUnknown(details.sourceRange) ??
      sourceRangeFromUnknown(details.source_range)
    if (detailDirect) {
      return detailDirect
    }
    const detailRanges = Array.isArray(details.sourceRanges)
      ? details.sourceRanges
      : Array.isArray(details.source_ranges)
        ? details.source_ranges
        : []
    for (const sourceRange of detailRanges) {
      const parsed = sourceRangeFromUnknown(sourceRange)
      if (parsed) {
        return parsed
      }
    }
    return null
  }
  const filenameForModuleId = (
    filenames: unknown,
    moduleId: number,
    source: SourceSelection | null,
  ) => {
    const filename = modulePathValue(valueFromMapLike(filenames, moduleId))
    if (filename) {
      return filename
    }
    return source?.kind === 'file' ? source.label : ''
  }
  const lineAndColumnFromUtf8Offset = (sourceText: string, offset: number) => {
    const encoded = new TextEncoder().encode(sourceText)
    const safeOffset = Math.max(0, Math.min(encoded.length, Math.floor(offset)))
    const decoded = new TextDecoder().decode(encoded.slice(0, safeOffset))
    const lines = decoded.split('\n')
    return {
      line: lines.length,
      column: (lines[lines.length - 1]?.length ?? 0) + 1,
    }
  }
  const locationForSourceRange = (
    sourceRange: SourceRange,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ) => {
    const filename = filenameForModuleId(filenames, sourceRange[2], source)
    if (!filename) {
      return ''
    }
    const sourceText = sourceTextForExecutionPath(input, filename)
    if (!sourceText) {
      return ''
    }
    const { line, column } = lineAndColumnFromUtf8Offset(sourceText, sourceRange[0])
    return `${filename}:${line}:${column}`
  }
  const labelForSourceRange = (
    sourceRange: SourceRange,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ) => {
    const location = locationForSourceRange(sourceRange, filenames, input, source)
    if (location) {
      return location
    }
    const filename = filenameForModuleId(filenames, sourceRange[2], source)
    if (filename) {
      return `${filename} [${sourceRange[0]}, ${sourceRange[1]}, ${sourceRange[2]}]`
    }
    return `[${sourceRange[0]}, ${sourceRange[1]}, ${sourceRange[2]}]`
  }
  const locationForErrorLike = (
    errorLike: Record<string, unknown>,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ) => {
    const sourceRange = preferredSourceRange(errorLike)
    if (!sourceRange) {
      return ''
    }
    return locationForSourceRange(sourceRange, filenames, input, source)
  }
  const kclErrorDisplaysFromErrorValue = (
    value: unknown,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
    depth = 0,
  ): KclErrorDisplay[] => {
    if (depth > 5 || value == null) {
      return []
    }
    if (Array.isArray(value)) {
      return normalizeKclErrorDisplays(
        value.flatMap(entry =>
          kclErrorDisplaysFromErrorValue(entry, filenames, input, source, depth + 1),
        ),
      )
    }
    const location =
      typeof value === 'object' && value !== null
        ? locationForErrorLike(value as Record<string, unknown>, filenames, input, source)
        : ''
    return normalizeKclErrorMessages(kclErrorMessagesFromUnknown(value, depth)).map(message => ({
      message,
      location,
    }))
  }
  const kclErrorDisplaysFromExecutorResult = (
    result: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ) => {
    const record = executorResultRecord(result)
    if (!record) {
      return []
    }
    return normalizeKclErrorDisplays([
      ...kclErrorDisplaysFromErrorValue(record.error, record.filenames, input, source),
      ...kclErrorDisplaysFromErrorValue(record.errors, record.filenames, input, source),
    ])
  }
  const executorValuesFromResult = (result: unknown) => {
    const record = executorResultRecord(result)
    if (!record) {
      return null
    }
    if ('values' in record) {
      return record.values
    }
    if ('variables' in record) {
      return record.variables
    }
    const execOutcome = execOutcomeRecordFromResult(result)
    if (execOutcome && 'variables' in execOutcome) {
      return execOutcome.variables
    }
    if (execOutcome && 'values' in execOutcome) {
      return execOutcome.values
    }
    return null
  }
  const execOutcomeRecordFromResult = (result: unknown) => {
    const record = executorResultRecord(result)
    if (!record) {
      return null
    }
    const execOutcome =
      record.exec_outcome && typeof record.exec_outcome === 'object'
        ? (record.exec_outcome as Record<string, unknown>)
        : null
    return execOutcome ?? record
  }
  const artifactGraphFromResult = (result: unknown) => {
    const execOutcome = execOutcomeRecordFromResult(result)
    if (!execOutcome) {
      return {} as Record<string, Record<string, unknown>>
    }
    const artifactGraph =
      execOutcome.artifactGraph && typeof execOutcome.artifactGraph === 'object'
        ? (execOutcome.artifactGraph as Record<string, unknown>)
        : null
    if (!artifactGraph) {
      return {} as Record<string, Record<string, unknown>>
    }
    const next: Record<string, Record<string, unknown>> = {}
    const graphMap =
      'map' in artifactGraph && artifactGraph.map && typeof artifactGraph.map === 'object'
        ? artifactGraph.map
        : artifactGraph
    for (const [artifactId, artifact] of entriesFromMapLike(graphMap)) {
      if (artifact && typeof artifact === 'object') {
        next[artifactId] = artifact as Record<string, unknown>
      }
    }
    return next
  }
  const filenamesFromResult = (result: unknown) => execOutcomeRecordFromResult(result)?.filenames
  const operationsFromResult = (result: unknown) => {
    const execOutcome = execOutcomeRecordFromResult(result)
    if (!execOutcome || !Array.isArray(execOutcome.operations)) {
      return []
    }
    return execOutcome.operations.filter(
      (operation): operation is Record<string, unknown> =>
        Boolean(operation) && typeof operation === 'object',
    )
  }
  const diffSideFromFilename = (filename: string): DiffSide | null => {
    const normalized = normalizeExecutionPath(filename)
    if (normalized.startsWith('__codex_base/')) {
      return 'base'
    }
    if (normalized.startsWith('__codex_compare/')) {
      return 'compare'
    }
    return null
  }
  const directSourceRangeFromArtifact = (artifact: Record<string, unknown>) => {
    const codeRef =
      artifact.codeRef && typeof artifact.codeRef === 'object'
        ? (artifact.codeRef as Record<string, unknown>)
        : null
    return (
      sourceRangeFromUnknown(codeRef?.range) ??
      sourceRangeFromUnknown(codeRef?.sourceRange) ??
      sourceRangeFromUnknown(artifact.sourceRange)
    )
  }
  const artifactReferenceIds = (
    value: unknown,
    artifactGraph: Record<string, Record<string, unknown>>,
    seen = new Set<unknown>(),
  ) => {
    if (
      value == null ||
      seen.has(value) ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return [] as string[]
    }
    seen.add(value)
    if (typeof value === 'string') {
      return artifactGraph[value] ? [value] : []
    }
    if (Array.isArray(value)) {
      return [...new Set(value.flatMap(entry => artifactReferenceIds(entry, artifactGraph, seen)))]
    }
    if (typeof value !== 'object') {
      return []
    }
    return [
      ...new Set(
        Object.values(value as Record<string, unknown>).flatMap(entry =>
          artifactReferenceIds(entry, artifactGraph, seen),
        ),
      ),
    ]
  }
  const relatedArtifactIdsForArtifactId = (
    artifactId: string,
    artifactGraph: Record<string, Record<string, unknown>>,
  ): string[] => {
    const artifact = artifactGraph[artifactId]
    if (!artifact) {
      return []
    }
    const childArtifactIds = artifactReferenceIds(artifact, artifactGraph).filter(
      childArtifactId => childArtifactId !== artifactId,
    )
    const parentArtifactIds = Object.entries(artifactGraph).flatMap(([parentArtifactId, parentArtifact]) =>
      parentArtifactId !== artifactId &&
      artifactReferenceIds(parentArtifact, artifactGraph).includes(artifactId)
        ? [parentArtifactId]
        : [],
    )
    return [...new Set([artifactId, ...childArtifactIds, ...parentArtifactIds])]
  }
  const sourceRangesForArtifactId = (
    artifactId: string,
    artifactGraph: Record<string, Record<string, unknown>>,
  ): SourceRange[] => {
    const seenRanges = new Set<string>()
    return relatedArtifactIdsForArtifactId(artifactId, artifactGraph).flatMap(relatedArtifactId => {
      const directRange = directSourceRangeFromArtifact(artifactGraph[relatedArtifactId] ?? {})
      if (!directRange) {
        return []
      }
      const key = directRange.join(':')
      if (seenRanges.has(key)) {
        return []
      }
      seenRanges.add(key)
      return [directRange]
    })
  }
  const sourceRangeForArtifactId = (artifactId: string, artifactGraph: Record<string, Record<string, unknown>>) =>
    sourceRangesForArtifactId(artifactId, artifactGraph)[0] ?? null
  const recordContainsUuid = (
    value: unknown,
    uuid: string,
    seen = new Set<unknown>(),
  ): boolean => {
    if (value == null || seen.has(value)) {
      return false
    }
    seen.add(value)
    if (typeof value === 'string') {
      return value === uuid
    }
    if (Array.isArray(value)) {
      return value.some(entry => recordContainsUuid(entry, uuid, seen))
    }
    if (typeof value !== 'object') {
      return false
    }
    const record = value as Record<string, unknown>
    if (
      record.uuid === uuid ||
      record.entity_id === uuid ||
      record.object_id === uuid ||
      record.id === uuid
    ) {
      return true
    }
    return Object.values(record).some(entry => recordContainsUuid(entry, uuid, seen))
  }
  const matchingArtifactIdsForUuid = (
    uuid: string,
    artifactGraph: Record<string, Record<string, unknown>>,
  ) =>
    Object.entries(artifactGraph).flatMap(([artifactId, artifact]) =>
      artifactId === uuid || recordContainsUuid(artifact, uuid) ? [artifactId] : [],
    )
  const selectedFeatureSourceMappingsFromArtifactId = (
    feature: SelectedFeature,
    artifactId: string,
    artifactGraph: Record<string, Record<string, unknown>>,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ): SelectedFeatureSourceMapping[] => {
    return sourceRangesForArtifactId(artifactId, artifactGraph).flatMap(sourceRange => {
      const filename = filenameForModuleId(filenames, sourceRange[2], source)
      const sourceText = filename ? sourceTextForExecutionPath(input, filename) : ''
      const sourceCode = sourceText
        ? utf8Slice(sourceText, sourceRange[0], sourceRange[1]).trim()
        : ''
      return [
        {
          type: feature.type,
          uuid: feature.uuid,
          artifactId,
          filename,
          sourceRange,
          sourceCode,
          location: labelForSourceRange(sourceRange, filenames, input, source),
        },
      ]
    })
  }
  const selectedFeatureSourceMappingFromSourceRange = (
    feature: SelectedFeature,
    sourceRange: SourceRange,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
    artifactId = '',
  ): SelectedFeatureSourceMapping | null => {
    const filename = filenameForModuleId(filenames, sourceRange[2], source)
    const sourceText = filename ? sourceTextForExecutionPath(input, filename) : ''
    const sourceCode = sourceText ? utf8Slice(sourceText, sourceRange[0], sourceRange[1]).trim() : ''
    return {
      type: feature.type,
      uuid: feature.uuid,
      artifactId,
      filename,
      sourceRange,
      sourceCode,
      location: labelForSourceRange(sourceRange, filenames, input, source),
    }
  }
  const orderedBodySourceRangesFromResult = (
    result: unknown,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
  ) => {
    const artifactGraph = artifactGraphFromResult(result)
    const bodyArtifactIds = Object.entries(artifactGraph)
      .flatMap(([artifactId, artifact]) => {
        if (
          (artifact.type !== 'sweep' && artifact.type !== 'compositeSolid') ||
          artifact.consumed === true
        ) {
          return []
        }
        const sourceRange = sourceRangeForArtifactId(artifactId, artifactGraph)
        const mapping = sourceRange
          ? selectedFeatureSourceMappingFromSourceRange(
              { type: 'solid3d', uuid: artifactId },
              sourceRange,
              filenames,
              input,
              source,
              artifactId,
            )
          : null
        return mapping ? [mapping] : []
      })
      .sort((left, right) => {
        if (left.sourceRange[2] !== right.sourceRange[2]) {
          return left.sourceRange[2] - right.sourceRange[2]
        }
        if (left.sourceRange[0] !== right.sourceRange[0]) {
          return left.sourceRange[0] - right.sourceRange[0]
        }
        return left.sourceRange[1] - right.sourceRange[1]
      })
    if (bodyArtifactIds.length) {
      return bodyArtifactIds
    }
    return operationsFromResult(result)
      .flatMap(operation => {
        if (
          operation.type !== 'StdLibCall' ||
          typeof operation.name !== 'string' ||
          !bodyOperationNames.has(operation.name)
        ) {
          return []
        }
        const sourceRange =
          sourceRangeFromUnknown(operation.sourceRange) ??
          sourceRangeFromUnknown(operation.source_range)
        if (!sourceRange) {
          return []
        }
        const mapping = selectedFeatureSourceMappingFromSourceRange(
          { type: 'solid3d', uuid: `${operation.name}:${sourceRange.join(':')}` },
          sourceRange,
          filenames,
          input,
          source,
        )
        return mapping ? [mapping] : []
      })
      .sort((left, right) => {
        if (left.sourceRange[2] !== right.sourceRange[2]) {
          return left.sourceRange[2] - right.sourceRange[2]
        }
        if (left.sourceRange[0] !== right.sourceRange[0]) {
          return left.sourceRange[0] - right.sourceRange[0]
        }
        return left.sourceRange[1] - right.sourceRange[1]
      })
  }
  const selectedFeatureSourceMappingFromBodyIndex = (
    feature: SelectedFeature,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
    result: unknown,
  ) => {
    const objectIndex = state.solidObjectIds.indexOf(feature.objectId ?? feature.uuid)
    if (objectIndex < 0) {
      return null
    }
    const orderedMappings = orderedBodySourceRangesFromResult(result, filenames, input, source)
    const mapping = orderedMappings[objectIndex]
    if (!mapping) {
      return null
    }
    return {
      ...mapping,
      type: feature.type,
      uuid: feature.uuid,
    }
  }
  const bodyArtifactIdForObjectId = (objectId: string) => {
    const objectIndex = state.solidObjectIds.indexOf(objectId)
    if (objectIndex < 0) {
      return ''
    }
    const directArtifactId = state.bodyArtifactIds[objectIndex]
    if (directArtifactId) {
      return directArtifactId
    }
    const executorResult = currentExecutorResult()
    const fallbackBodyArtifactIds = executorResult
      ? Object.entries(artifactGraphFromResult(executorResult))
          .flatMap(([artifactId, artifact]) => {
            if (
              (artifact.type !== 'sweep' && artifact.type !== 'compositeSolid') ||
              artifact.consumed === true
            ) {
              return []
            }
            const range = directSourceRangeFromArtifact(artifact)
            return [{ artifactId, range }]
          })
          .sort((left, right) => {
            if (!left.range && !right.range) {
              return 0
            }
            if (!left.range) {
              return 1
            }
            if (!right.range) {
              return -1
            }
            if (left.range[2] !== right.range[2]) {
              return left.range[2] - right.range[2]
            }
            if (left.range[0] !== right.range[0]) {
              return left.range[0] - right.range[0]
            }
            return left.range[1] - right.range[1]
          })
          .map(entry => entry.artifactId)
      : []
    return fallbackBodyArtifactIds[objectIndex] ?? ''
  }
  const lineColumnFromLocation = (location: string) => {
    const match = /:(\d+):(\d+)$/.exec(location)
    return match ? { line: match[1], column: match[2] } : null
  }
  const locationParts = (location: string) => {
    const match = /^(.*):(\d+):(\d+)$/.exec(location)
    if (!match) {
      return null
    }
    return {
      path: normalizeExecutionPath(match[1] ?? ''),
      line: Number(match[2] ?? 0),
      column: Number(match[3] ?? 0),
    }
  }
  const importedPathFromSourceCode = (sourceCode: string) => {
    const match = /^\s*import\s+['"]([^'"]+)['"]/m.exec(sourceCode)
    return normalizeExecutionPath(match?.[1] ?? '')
  }
  const escapedRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sourceEntriesFromInput = (input: ExecutionInput) =>
    typeof input === 'string' ? [['main.kcl', input] as const] : [...input.entries()]
  const variableNamesFromSourceCode = (sourceCode: string) => {
    const matches = sourceCode.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) ?? []
    return [...new Set(matches)]
  }
  const lineForOffset = (sourceText: string, offset: number) =>
    lineAndColumnFromUtf8Offset(sourceText, offset).line
  const relatedVariableBlocksFromMappings = (mappings: SelectedFeatureSourceMapping[]) => {
    if (!state.lastExecutionInput) {
      return [] as Array<{ location: string; code: string }>
    }
    const variableNames = [...new Set(mappings.flatMap(mapping => variableNamesFromSourceCode(mapping.sourceCode)))]
    const mappingKeys = new Set(
      mappings.map(mapping => `${mapping.location || '[Unknown source range]'}\u0000${mapping.sourceCode || '[Source unavailable]'}`),
    )
    const seen = new Set<string>()
    const blocks = variableNames.flatMap(name => {
      const definitionPattern = new RegExp(`^\\s*(?:export\\s+)?${escapedRegex(name)}\\s*=.*$`, 'm')
      for (const [path, sourceText] of sourceEntriesFromInput(state.lastExecutionInput!)) {
        const match = definitionPattern.exec(sourceText)
        if (!match || match.index == null) {
          continue
        }
        const line = lineForOffset(sourceText, match.index)
        const location = `${normalizeExecutionPath(path)}:${line}:1`
        const code = match[0]!.trim()
        const key = `${location}\u0000${code}`
        if (seen.has(key) || mappingKeys.has(key)) {
          return []
        }
        seen.add(key)
        return [{ location, code }]
      }
      return []
    })
    return blocks
  }
  const sourceLineForMapping = (mapping: SelectedFeatureSourceMapping) => {
    if (!state.lastExecutionInput) {
      return mapping.sourceCode || '[Source unavailable]'
    }
    const location = locationParts(mapping.location || '')
    const sourceText = mapping.filename
      ? sourceTextForExecutionPath(state.lastExecutionInput, mapping.filename)
      : ''
    if (!location || !sourceText) {
      return mapping.sourceCode || '[Source unavailable]'
    }
    const lines = sourceText.split('\n')
    return lines[Math.max(0, location.line - 1)]?.trim() || mapping.sourceCode || '[Source unavailable]'
  }
  const overlayCodeForMappings = (mappings: SelectedFeatureSourceMapping[]) => {
    if (!mappings.length) {
      return ''
    }
    if (state.selectionMode === 'feature') {
      const primary = primarySelectionMapping(mappings) ?? mappings[0]!
      const location = primary.location || '[Unknown source range]'
      const source = sourceLineForMapping(primary)
      return `${location}\n${source}`
    }
    const mappingBlocks = mappings.map(mapping => ({
      location: mapping.location || '[Unknown source range]',
      code: mapping.sourceCode || '[Source unavailable]',
    }))
    const variableBlocks = relatedVariableBlocksFromMappings(mappings)
    return [...mappingBlocks, ...variableBlocks]
      .sort((left, right) => {
        const leftParts = locationParts(left.location)
        const rightParts = locationParts(right.location)
        if (!leftParts && !rightParts) {
          return left.location.localeCompare(right.location)
        }
        if (!leftParts) {
          return 1
        }
        if (!rightParts) {
          return -1
        }
        if (leftParts.path !== rightParts.path) {
          return leftParts.path.localeCompare(rightParts.path)
        }
        if (leftParts.line !== rightParts.line) {
          return leftParts.line - rightParts.line
        }
        return leftParts.column - rightParts.column
      })
      .map(block => `${block.location}\n${block.code}`)
      .join('\n\n' + '─'.repeat(80) + '\n\n')
  }
  const selectionMappingPriority = (mapping: SelectedFeatureSourceMapping) => {
    const normalizedFilename = normalizeExecutionPath(mapping.filename)
    const directoryFilePath = normalizedFilename
      ? directoryFilePathForFilename(normalizedFilename)
      : ''
    const importedDirectoryFilePath = isDirectorySourceSelection(state.source)
      ? resolveDirectoryFilePath(importedPathFromSourceCode(mapping.sourceCode), state.directoryFilePaths)
      : ''
    const activeDirectoryFilePath = currentDirectoryFilePath()
    const importTargetDirectoryFilePath =
      importedDirectoryFilePath && importedDirectoryFilePath !== activeDirectoryFilePath
        ? importedDirectoryFilePath
        : ''
    const isImportedFileTarget =
      Boolean(directoryFilePath) && directoryFilePath !== activeDirectoryFilePath
    const isOtherFile =
      Boolean(normalizedFilename) &&
      normalizedFilename !== activeDirectoryFilePath &&
      directoryFilePath !== activeDirectoryFilePath
    return {
      normalizedFilename,
      directoryFilePath,
      importTargetDirectoryFilePath,
      isImportedFileTarget,
      isOtherFile,
      score: isImportedFileTarget ? 4 : importTargetDirectoryFilePath ? 3 : isOtherFile ? 2 : normalizedFilename ? 1 : 0,
    }
  }
  const primarySelectionMapping = (mappings: SelectedFeatureSourceMapping[]) =>
    mappings.reduce<SelectedFeatureSourceMapping | null>((best, mapping) => {
      if (!best) {
        return mapping
      }
      const bestPriority = selectionMappingPriority(best)
      const nextPriority = selectionMappingPriority(mapping)
      if (bestPriority.score !== nextPriority.score) {
        return nextPriority.score > bestPriority.score ? mapping : best
      }
      return best
    }, null)
  const selectionDisplayFromMappings = (
    mappings: SelectedFeatureSourceMapping[],
  ): SelectionDisplay => {
    const activeDirectoryFilePath = currentDirectoryFilePath()
    if (
      selectionDisplayCache &&
      selectionDisplayCache.mappings === mappings &&
      selectionDisplayCache.activeDirectoryFilePath === activeDirectoryFilePath
    ) {
      return selectionDisplayCache.display
    }
    const primary = primarySelectionMapping(mappings)
    if (!primary) {
      const display = {
        pillText: 'N/A',
        pillTitle: 'N/A',
        overlayTitle: 'No selection',
        overlayCode: 'No selection',
        hasSelection: false,
        targetDirectoryFilePath: '',
      }
      selectionDisplayCache = {
        mappings,
        activeDirectoryFilePath,
        display,
      }
      return display
    }
    const location = primary.location || '[Unknown source range]'
    const lineColumn = lineColumnFromLocation(location)
    const {
      normalizedFilename,
      directoryFilePath,
      importTargetDirectoryFilePath,
      isOtherFile,
    } =
      selectionMappingPriority(primary)
    const targetDirectoryFilePath = importTargetDirectoryFilePath || directoryFilePath
    const canJumpToDirectoryFile =
      Boolean(targetDirectoryFilePath) && targetDirectoryFilePath !== activeDirectoryFilePath
    const importDisplayPath = importTargetDirectoryFilePath || (isOtherFile ? targetDirectoryFilePath || normalizedFilename : '')
    const pillText = importDisplayPath
      ? importDisplayPath
      : lineColumn
        ? `${lineColumn.line}:${lineColumn.column}`
        : location
    const display = {
      pillText,
      pillTitle: location,
      overlayTitle: location,
      overlayCode: overlayCodeForMappings(mappings),
      hasSelection: true,
      targetDirectoryFilePath: canJumpToDirectoryFile ? targetDirectoryFilePath : '',
    }
    selectionDisplayCache = {
      mappings,
      activeDirectoryFilePath,
      display,
    }
    return display
  }
  const candidateArtifactIdsForFeature = (
    feature: SelectedFeature,
    artifactGraph: Record<string, Record<string, unknown>>,
  ) => {
    const candidateArtifactIds = new Set<string>()
    const addDirectFeatureArtifactIds = () => {
      if (artifactGraph[feature.uuid]) {
        candidateArtifactIds.add(feature.uuid)
      }
      matchingArtifactIdsForUuid(feature.uuid, artifactGraph).forEach(artifactId =>
        candidateArtifactIds.add(artifactId),
      )
    }
    const addBodyArtifactIds = () => {
      const directBodyArtifactId = bodyArtifactIdForObjectId(feature.objectId ?? feature.uuid)
      if (directBodyArtifactId) {
        candidateArtifactIds.add(directBodyArtifactId)
      }
    }
    if (feature.type === 'solid3d') {
      addBodyArtifactIds()
      addDirectFeatureArtifactIds()
    } else {
      addDirectFeatureArtifactIds()
      addBodyArtifactIds()
    }
    if (feature.objectId && feature.objectId !== feature.uuid) {
      if (artifactGraph[feature.objectId]) {
        candidateArtifactIds.add(feature.objectId)
      }
      matchingArtifactIdsForUuid(feature.objectId, artifactGraph).forEach(artifactId =>
        candidateArtifactIds.add(artifactId),
      )
    }
    return candidateArtifactIds
  }
  const selectedFeatureSourceMappingsForFeature = (
    feature: SelectedFeature,
    artifactGraph: Record<string, Record<string, unknown>>,
    filenames: unknown,
    input: ExecutionInput,
    source: SourceSelection | null,
    result: unknown,
  ) => {
    const candidateArtifactIds = candidateArtifactIdsForFeature(feature, artifactGraph)
    const mappings: SelectedFeatureSourceMapping[] = []
    for (const artifactId of candidateArtifactIds) {
      selectedFeatureSourceMappingsFromArtifactId(
        feature,
        artifactId,
        artifactGraph,
        filenames,
        input,
        source,
      ).forEach(mapping => mappings.push(mapping))
    }
    if (feature.type === 'solid3d') {
      const fallbackMapping = selectedFeatureSourceMappingFromBodyIndex(
        feature,
        filenames,
        input,
        source,
        result,
      )
      if (fallbackMapping) {
        mappings.push(fallbackMapping)
      }
    }
    return mappings
  }
  const selectedFeatureSourceMappingsFromFeatures = (features: SelectedFeature[]) => {
    const executorResult = currentExecutorResult()
    if (!features.length || !state.lastExecutionInput || !executorResult) {
      return [] as SelectedFeatureSourceMapping[]
    }
    const featureKey = selectionFeatureKey(features)
    if (
      selectionMappingsCache &&
      selectionMappingsCache.executorResult === executorResult &&
      selectionMappingsCache.input === state.lastExecutionInput &&
      selectionMappingsCache.featureKey === featureKey
    ) {
      return selectionMappingsCache.mappings
    }
    const artifactGraph = artifactGraphFromResult(executorResult)
    const filenames = filenamesFromResult(executorResult)
    const mappings = features.flatMap(feature =>
      selectedFeatureSourceMappingsForFeature(
        feature,
        artifactGraph,
        filenames,
        state.lastExecutionInput!,
        state.source,
        executorResult,
      ),
    )
    const seen = new Set<string>()
    const dedupedMappings = mappings.flatMap(mapping => {
      if (!mapping) {
        return []
      }
      const key = `${mapping.uuid}\u0000${mapping.location}\u0000${mapping.sourceCode}`
      if (seen.has(key)) {
        return []
      }
      seen.add(key)
      return [mapping]
    })
    selectionMappingsCache = {
      executorResult,
      input: state.lastExecutionInput,
      featureKey,
      mappings: dedupedMappings,
    }
    return dedupedMappings
  }
  const diffSideFromArtifact = (
    artifactId: string,
    artifactGraph: Record<string, Record<string, unknown>>,
    filenames: unknown,
    seen = new Set<string>(),
  ): DiffSide | null => {
    if (seen.has(artifactId)) {
      return null
    }
    seen.add(artifactId)
    const artifact = artifactGraph[artifactId]
    if (!artifact) {
      return null
    }
    const range = directSourceRangeFromArtifact(artifact)
    if (range) {
      const filename = filenameForModuleId(filenames, range[2], null)
      const side = filename ? diffSideFromFilename(filename) : null
      if (side) {
        return side
      }
    }
    for (const nested of Object.values(artifact)) {
      if (!nested) {
        continue
      }
      if (typeof nested === 'string') {
        const side = artifactGraph[nested]
          ? diffSideFromArtifact(nested, artifactGraph, filenames, seen)
          : null
        if (side) {
          return side
        }
        continue
      }
      if (Array.isArray(nested)) {
        for (const entry of nested) {
          if (typeof entry === 'string' && artifactGraph[entry]) {
            const side = diffSideFromArtifact(entry, artifactGraph, filenames, seen)
            if (side) {
              return side
            }
          }
        }
        continue
      }
      if (typeof nested !== 'object') {
        continue
      }
      for (const entry of Object.values(nested as Record<string, unknown>)) {
        if (typeof entry === 'string' && artifactGraph[entry]) {
          const side = diffSideFromArtifact(entry, artifactGraph, filenames, seen)
          if (side) {
            return side
          }
          continue
        }
        if (!Array.isArray(entry)) {
          continue
        }
        for (const child of entry) {
          if (typeof child === 'string' && artifactGraph[child]) {
            const side = diffSideFromArtifact(child, artifactGraph, filenames, seen)
            if (side) {
              return side
            }
          }
        }
      }
    }
    return null
  }
  const diffBodyOwnershipByArtifactIdFromResult = (result: unknown) => {
    const artifactGraph = artifactGraphFromResult(result)
    const filenames = filenamesFromResult(result)
    const next: Record<string, DiffSide> = {}
    for (const [artifactId, artifact] of Object.entries(artifactGraph)) {
      if (
        (artifact.type !== 'sweep' && artifact.type !== 'compositeSolid') ||
        artifact.consumed === true
      ) {
        continue
      }
      const side = diffSideFromArtifact(artifactId, artifactGraph, filenames)
      if (side) {
        next[artifactId] = side
      }
    }
    return next
  }
  const diffBodyOwnershipSequenceFromResult = (result: unknown) => {
    const artifactGraph = artifactGraphFromResult(result)
    const filenames = filenamesFromResult(result)
    const sequence = Object.entries(artifactGraph)
      .flatMap(([artifactId, artifact]) => {
        if (
          (artifact.type !== 'sweep' && artifact.type !== 'compositeSolid') ||
          artifact.consumed === true
        ) {
          return []
        }
        const range = directSourceRangeFromArtifact(artifact)
        if (!range) {
          return []
        }
        const side = diffSideFromArtifact(artifactId, artifactGraph, filenames)
        if (!side) {
          return []
        }
        return [{ side, range }]
      })
      .sort((left, right) => {
        if (left.range[2] !== right.range[2]) {
          return left.range[2] - right.range[2]
        }
        if (left.range[0] !== right.range[0]) {
          return left.range[0] - right.range[0]
        }
        return left.range[1] - right.range[1]
      })
      .map(entry => entry.side)
    if (sequence.length) {
      return sequence
    }
    return operationsFromResult(result).flatMap(operation => {
      if (
        operation.type !== 'StdLibCall' ||
        typeof operation.name !== 'string' ||
        !bodyOperationNames.has(operation.name)
      ) {
        return []
      }
      const range =
        sourceRangeFromUnknown(operation.sourceRange) ??
        sourceRangeFromUnknown(operation.source_range)
      if (!range) {
        return []
      }
      const filename = filenameForModuleId(filenames, range[2], null)
      const side = filename ? diffSideFromFilename(filename) : null
      return side ? [side] : []
    })
  }
  const replaceKclErrorDisplays = (entries: KclErrorDisplay[]) => {
    const normalized = normalizeKclErrorDisplays(entries)
    state.kclErrors = normalized.map(entry =>
      entry.location ? `${entry.location}\n${entry.message}` : entry.message,
    )
    state.kclErrorLocations = normalizeKclErrorMessages(
      normalized.map(entry => entry.location).filter(Boolean),
    )
  }
  const replaceKclErrors = (messages: string[]) => {
    replaceKclErrorDisplays(messages.map(message => ({ message, location: '' })))
  }
  const snapshotViewRequest = (snapshotView: (typeof snapshotViews)[number]) =>
    JSON.stringify({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'default_camera_look_at',
            center: { x: 0, y: 0, z: 0 },
            vantage: snapshotView.vantage,
            up: snapshotView.up,
          },
          cmd_id: nextRequestId(),
        },
        {
          cmd: {
            type: 'zoom_to_fit',
            object_ids: [],
            padding: 0.1,
          },
          cmd_id: nextRequestId(),
        },
      ],
      batch_id: nextRequestId(),
      responses: true,
    })
  const edgeVisibilityRequest = (visible: boolean) =>
    JSON.stringify({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'edge_lines_visible',
            hidden: !visible,
          },
          cmd_id: nextRequestId(),
        },
      ],
      batch_id: nextRequestId(),
      responses: true,
    })
  const bodyIdsFromWebSocketResponse = (response: {
    request_id?: string
    resp?: {
      type?: string
      data?: {
        modeling_response?: {
          type?: string
          data?: { solid_id?: string }
        }
        responses?: Record<
          string,
          | {
              response?: {
                type?: string
                data?: { solid_id?: string }
              }
            }
          | {
              errors?: Array<{ message?: string }>
            }
        >
      }
    }
    success?: boolean
  }) => {
    if (!response.success || !response.resp?.type) {
      return []
    }
    if (response.resp.type === 'modeling') {
      const modelingResponse = response.resp.data?.modeling_response
      if (
        !response.request_id ||
        !modelingResponse?.type ||
        !bodyResponseTypes.has(modelingResponse.type)
      ) {
        return []
      }
      return [modelingResponse.data?.solid_id ?? response.request_id]
    }
    if (response.resp.type !== 'modeling_batch') {
      return []
    }
    return Object.entries(response.resp.data?.responses ?? {}).flatMap(([requestId, batchResponse]) => {
      const modelingResponse =
        'response' in batchResponse ? batchResponse.response : undefined
      if (!modelingResponse?.type || !bodyResponseTypes.has(modelingResponse.type)) {
        return []
      }
      return [modelingResponse.data?.solid_id ?? requestId]
    })
  }
  const cloneTransforms = (transforms: ComponentTransform[]) =>
    transforms.map(transform => ({
      ...transform,
      rotate_angle_axis:
        transform.rotate_angle_axis === null
          ? null
          : transform.rotate_angle_axis
        ? {
            ...transform.rotate_angle_axis,
            property: { ...transform.rotate_angle_axis.property },
          }
        : undefined,
      rotate_rpy:
        transform.rotate_rpy === null
          ? null
          : transform.rotate_rpy
        ? {
            ...transform.rotate_rpy,
            property: { ...transform.rotate_rpy.property },
          }
        : undefined,
      scale:
        transform.scale === null
          ? null
          : transform.scale
        ? {
            ...transform.scale,
            property: { ...transform.scale.property },
          }
        : undefined,
      translate:
        transform.translate === null
          ? null
          : transform.translate
        ? {
            ...transform.translate,
            property: { ...transform.translate.property },
          }
        : undefined,
    }))
  const translationFromTransforms = (transforms: ComponentTransform[]) =>
    transforms.reduce(
      (current, transform) => {
        if (!transform.translate) {
          return current
        }
        return transform.translate.set
          ? {
              x: transform.translate.property.x,
              y: transform.translate.property.y,
              z: transform.translate.property.z,
            }
          : {
              x: current.x + transform.translate.property.x,
              y: current.y + transform.translate.property.y,
              z: current.z + transform.translate.property.z,
            }
      },
      { x: 0, y: 0, z: 0 },
    )
  const commandEntriesFromCommandData = (data: unknown): Array<{
    cmd_id?: string
    cmd: Record<string, unknown>
  }> => {
    const request =
      typeof data === 'string'
        ? (() => {
            if (!data.startsWith('{')) {
              return null
            }
            try {
              return JSON.parse(data) as unknown
            } catch {
              return null
            }
          })()
        : data
    const normalizedRequest =
      Array.isArray(request) && request.length === 1 ? request[0] : request
    if (!normalizedRequest || typeof normalizedRequest !== 'object') {
      if (typeof normalizedRequest === 'string' && normalizedRequest.startsWith('{')) {
        try {
          return commandEntriesFromCommandData(JSON.parse(normalizedRequest) as unknown)
        } catch {
          return []
        }
      }
      return []
    }
    const normalizeEntry = (entry: unknown): Array<{ cmd_id?: string; cmd: Record<string, unknown> }> => {
      if (!entry || typeof entry !== 'object') {
        return []
      }
      if ('cmd' in entry && entry.cmd && typeof entry.cmd === 'object') {
        return [
          {
            cmd_id: 'cmd_id' in entry && typeof entry.cmd_id === 'string' ? entry.cmd_id : undefined,
            cmd: entry.cmd as Record<string, unknown>,
          },
        ]
      }
      if ('type' in entry && typeof entry.type === 'string') {
        return [{ cmd: entry as Record<string, unknown> }]
      }
      return []
    }
    return (
      Array.isArray(normalizedRequest)
        ? normalizedRequest.flatMap(normalizeEntry)
        : 'requests' in normalizedRequest && Array.isArray(normalizedRequest.requests)
          ? normalizedRequest.requests.flatMap(normalizeEntry)
          : normalizeEntry(normalizedRequest)
    )
  }
  const materialEntryFromCommand = (
    cmd: Record<string, unknown>,
  ): readonly [string, MaterialParams] | null => {
    const materialCommand = cmd as {
        type?: string
        object_id?: string
        color?: MaterialParams['color']
        metalness?: number
        roughness?: number
        ambient_occlusion?: number
      }
    if (materialCommand.type !== 'object_set_material_params_pbr' || !materialCommand.object_id) {
      return null
    }
    return [
      materialCommand.object_id,
      {
        color: {
          r: materialCommand.color?.r ?? defaultMaterial.color.r,
          g: materialCommand.color?.g ?? defaultMaterial.color.g,
          b: materialCommand.color?.b ?? defaultMaterial.color.b,
          a: materialCommand.color?.a ?? defaultMaterial.color.a,
        },
        metalness: materialCommand.metalness ?? defaultMaterial.metalness,
        roughness: materialCommand.roughness ?? defaultMaterial.roughness,
        ambient_occlusion:
          materialCommand.ambient_occlusion ?? defaultMaterial.ambient_occlusion,
      } satisfies MaterialParams,
    ] as const
  }
  const diffSideFromMarkerMaterial = (material: MaterialParams): DiffSide | null => {
    const closeEnough = (left: number, right: number) => Math.abs(left - right) < 0.001
    if (
      closeEnough(material.color.r, diffBaseMarkerColor.r) &&
      closeEnough(material.color.g, diffBaseMarkerColor.g) &&
      closeEnough(material.color.b, diffBaseMarkerColor.b)
    ) {
      return 'base'
    }
    if (
      closeEnough(material.color.r, diffCompareMarkerColor.r) &&
      closeEnough(material.color.g, diffCompareMarkerColor.g) &&
      closeEnough(material.color.b, diffCompareMarkerColor.b)
    ) {
      return 'compare'
    }
    return null
  }
  const transformEntryFromCommand = (
    cmd: Record<string, unknown>,
  ): readonly [string, ComponentTransform[]] | null => {
    const transformCommand = cmd as {
      type?: string
      object_id?: string
      transforms?: ComponentTransform[]
    }
    if (
      transformCommand.type !== 'set_object_transform' ||
      !transformCommand.object_id ||
      !Array.isArray(transformCommand.transforms)
    ) {
      return null
    }
    return [transformCommand.object_id, cloneTransforms(transformCommand.transforms)] as const
  }
  const syncSceneObjectMaterials = () => {
    if (!state.solidObjectIds.length) {
      state.materialByObjectId = {}
      return
    }
    const next: Record<string, MaterialParams> = {}
    for (const objectId of state.solidObjectIds) {
      const material = state.pendingMaterialByObjectId[objectId] ?? state.materialByObjectId[objectId]
      if (material) {
        next[objectId] = material
      }
    }
    state.bodyArtifactIds.forEach((bodyId, index) => {
      const objectId = state.solidObjectIds[index]
      const material = state.pendingMaterialByObjectId[bodyId] ?? state.materialByObjectId[bodyId]
      if (!objectId || !material || next[objectId]) {
        return
      }
      next[objectId] = material
    })
    state.materialByObjectId = next
  }
  const syncSceneObjectTransforms = () => {
    if (!state.solidObjectIds.length) {
      state.transformByObjectId = {}
      return
    }
    const next: Record<string, ComponentTransform[]> = {}
    for (const objectId of state.solidObjectIds) {
      const transforms =
        state.pendingTransformByObjectId[objectId] ?? state.transformByObjectId[objectId]
      if (transforms) {
        next[objectId] = cloneTransforms(transforms)
      }
    }
    state.bodyArtifactIds.forEach((bodyId, index) => {
      const objectId = state.solidObjectIds[index]
      const transforms =
        state.pendingTransformByObjectId[bodyId] ?? state.transformByObjectId[bodyId]
      if (!objectId || !transforms || next[objectId]) {
        return
      }
      next[objectId] = cloneTransforms(transforms)
    })
    state.transformByObjectId = next
  }
  const sendMaterialBatch = (materials: Record<string, MaterialParams>) => {
    if (!state.webView?.rtc?.send) {
      return
    }
    const objectIds = Object.keys(materials)
    if (!objectIds.length) {
      return
    }
    state.webView.rtc.send(
      JSON.stringify({
        type: 'modeling_cmd_batch_req',
        batch_id: nextRequestId(),
        responses: true,
        requests: [
          {
            cmd_id: nextRequestId(),
            cmd: {
              type: 'set_order_independent_transparency',
              enabled: objectIds.some(
                objectId => (materials[objectId]?.color.a ?? defaultMaterial.color.a) < 1,
              ),
            },
          },
          ...objectIds.map(object_id => {
            const material = materials[object_id]!
            const cmd_id = nextRequestId()
            state.ignoredOutgoingCommandIds.add(cmd_id)
            return {
              cmd_id,
              cmd: {
                type: 'object_set_material_params_pbr',
                object_id,
                color: material.color,
                metalness: material.metalness,
                roughness: material.roughness,
                ambient_occlusion: material.ambient_occlusion,
              },
            }
          }),
        ],
      }),
    )
  }
  const applySceneMaterials = () => {
    if (state.diffEnabled || state.xrayVisible || !state.solidObjectIds.length) {
      return
    }
    sendMaterialBatch(state.materialByObjectId)
  }
  const enforceDiffEdgeVisibility = () => {
    if (!state.diffEnabled || !state.webView?.rtc?.send) {
      return
    }
    state.webView.rtc.send(edgeVisibilityRequest(false))
  }
  const applyDiffAppearance = () => {
    if (!state.diffEnabled) {
      return
    }
    enforceDiffEdgeVisibility()
    const olderMaterial: MaterialParams = {
      color: { r: 0.92, g: 0.33, b: 0.41, a: 0.18 },
      metalness: 0,
      roughness: 0.08,
      ambient_occlusion: 0,
    }
    const newerMaterial: MaterialParams = {
      color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
      metalness: 0,
      roughness: 0.08,
      ambient_occlusion: 0,
    }
    const comparingAgainstOriginal = state.diffCompareSource?.kind === 'snapshot'
    const baseMaterial = comparingAgainstOriginal ? newerMaterial : olderMaterial
    const compareMaterial = comparingAgainstOriginal ? olderMaterial : newerMaterial
    if (!state.diffCompareSource) {
      if (!state.solidObjectIds.length) {
        return
      }
      sendMaterialBatch(
        Object.fromEntries(state.solidObjectIds.map(objectId => [objectId, baseMaterial])),
      )
      return
    }
    if (!Object.keys(state.diffObjectOwnershipById).length) {
      return
    }
    const targetObjectIds = state.solidObjectIds.length
      ? state.solidObjectIds
      : Object.keys(state.diffObjectOwnershipById)
    sendMaterialBatch(
      Object.fromEntries(
        targetObjectIds.map(objectId => [
          objectId,
          state.diffObjectOwnershipById[objectId] === 'compare' ? compareMaterial : baseMaterial,
        ]),
      ),
    )
  }
  const applyXrayAppearance = () => {
    if (state.diffEnabled) {
      return
    }
    if (!state.webView?.rtc?.send || !state.solidObjectIds.length) {
      return
    }
    const orderIndependentTransparencyEnabled =
      state.xrayVisible ||
      state.solidObjectIds.some(
        objectId => (state.materialByObjectId[objectId]?.color.a ?? defaultMaterial.color.a) < 1,
      )
    state.webView.rtc.send(
      JSON.stringify({
        type: 'modeling_cmd_batch_req',
        batch_id: nextRequestId(),
        responses: true,
        requests: [
          {
            cmd_id: nextRequestId(),
            cmd: {
              type: 'set_order_independent_transparency',
              enabled: orderIndependentTransparencyEnabled,
            },
          },
          ...state.solidObjectIds.map(object_id => {
            const material = state.materialByObjectId[object_id] ?? defaultMaterial
            const cmd_id = nextRequestId()
            state.ignoredOutgoingCommandIds.add(cmd_id)
            return {
              cmd_id,
              cmd: {
                type: 'object_set_material_params_pbr',
                object_id,
                color: {
                  r: material.color.r,
                  g: material.color.g,
                  b: material.color.b,
                  a: state.xrayVisible ? xrayOpacity : material.color.a,
                },
                metalness: material.metalness,
                roughness: material.roughness,
                ambient_occlusion: material.ambient_occlusion,
              },
            }
          }),
        ],
      }),
    )
  }
  const fillDiffOwnershipFromAnchors = (
    ownership: Record<string, DiffSide>,
    orderedObjectIds: string[],
  ) => {
    if (!orderedObjectIds.length) {
      return ownership
    }
    const anchors = orderedObjectIds.flatMap((objectId, index) => {
      const material = state.pendingMaterialByObjectId[objectId]
      const side = material ? diffSideFromMarkerMaterial(material) : null
      return side ? [{ index, side }] : []
    })
    if (!anchors.length) {
      return ownership
    }
    const next = { ...ownership }
    const firstAnchor = anchors[0]!
    if (firstAnchor.side === 'base') {
      for (let index = 0; index < firstAnchor.index; index += 1) {
        const objectId = orderedObjectIds[index]!
        next[objectId] = 'base'
      }
    }
    for (let anchorIndex = 0; anchorIndex < anchors.length; anchorIndex += 1) {
      const anchor = anchors[anchorIndex]!
      const nextAnchor = anchors[anchorIndex + 1]
      const endIndex = nextAnchor ? nextAnchor.index : orderedObjectIds.length
      for (let index = anchor.index; index < endIndex; index += 1) {
        const objectId = orderedObjectIds[index]!
        next[objectId] = anchor.side
      }
    }
    return next
  }
  const fillDiffOwnership = (ownership: Record<string, DiffSide>) => {
    let next = ownership
    if (state.solidObjectIds.length) {
      next = fillDiffOwnershipFromAnchors(next, state.solidObjectIds)
    }
    next = fillDiffOwnershipFromAnchors(next, [...new Set(state.seenObjectIdsInSendOrder)])
    return next
  }
  const syncDiffObjectOwnership = async () => {
    if (!state.diffEnabled || !state.executor) {
      state.diffObjectOwnershipById = {}
      return
    }
    const next: Record<string, DiffSide> = { ...state.diffObjectOwnershipById }
    if (state.diffBodyOwnershipSequence.length) {
      state.diffBodyOwnershipSequence.forEach((side, index) => {
        const sentObjectId = state.seenObjectIdsInSendOrder[index]
        if (sentObjectId && !next[sentObjectId]) {
          next[sentObjectId] = side
        }
        const objectId = state.solidObjectIds[index]
        if (objectId && !next[objectId]) {
          next[objectId] = side
        }
      })
    }
    const bodyOwnershipEntries = Object.entries(state.diffBodyOwnershipByArtifactId)
    if (!bodyOwnershipEntries.length) {
      const filledOwnership = fillDiffOwnership(next)
      state.diffObjectOwnershipById = filledOwnership
      if (Object.keys(filledOwnership).length) {
        applyDiffAppearance()
        queueSnapshotRefresh()
        render()
        return
      }
      state.diffObjectOwnershipById = {}
      return
    }
    const unresolved = new Set<string>()
    const solidIndexById = new Map(state.solidObjectIds.map((objectId, index) => [objectId, index]))
    for (const [artifactId, side] of bodyOwnershipEntries) {
      if (solidIndexById.has(artifactId)) {
        next[artifactId] = side
        continue
      }
      unresolved.add(artifactId)
    }
    state.bodyArtifactIds.forEach((artifactId, index) => {
      const side = state.diffBodyOwnershipByArtifactId[artifactId]
      const objectId = state.solidObjectIds[index]
      if (!side || !objectId || next[objectId]) {
        return
      }
      next[objectId] = side
      unresolved.delete(artifactId)
    })
    await Promise.all(
      [...unresolved].map(async artifactId => {
        const side = state.diffBodyOwnershipByArtifactId[artifactId]
        if (!side) {
          return
        }
        try {
          const response = await requestModelingResponse({
            type: 'entity_get_parent_id',
            entity_id: artifactId,
          })
          if (
            !response.success ||
            response.resp?.type !== 'modeling' ||
            response.resp.data?.modeling_response?.type !== 'entity_get_parent_id'
          ) {
            return
          }
          const objectId = (
            response.resp.data.modeling_response.data as { entity_id?: string } | undefined
          )?.entity_id
          if (objectId) {
            next[objectId] = side
          }
        } catch {}
      }),
    )
    const filledOwnership = fillDiffOwnership(next)
    state.diffObjectOwnershipById = filledOwnership
    if (Object.keys(filledOwnership).length) {
      applyDiffAppearance()
      queueSnapshotRefresh()
      render()
    }
  }
  const applyExplodedView = () => {
    if (!state.webView?.rtc?.send || !state.solidObjectIds.length) {
      return
    }
    const orderedObjectIds = [
      ...new Set([
        ...state.bodyArtifactIds
          .map((_bodyId, index) => state.solidObjectIds[index])
          .filter((objectId): objectId is string => Boolean(objectId)),
        ...state.solidObjectIds,
      ]),
    ]
    if (!orderedObjectIds.length) {
      return
    }
    const radialBasePositions = orderedObjectIds.map(object_id =>
      translationFromTransforms(state.transformByObjectId[object_id] ?? []),
    )
    const gridAnchorPosition = radialBasePositions[0] ?? { x: 0, y: 0, z: 0 }
    const radialCenter =
      state.explodeMode === 'radial'
        ? radialBasePositions.reduce(
            (center, position) => ({
              x: center.x + position.x / orderedObjectIds.length,
              y: center.y + position.y / orderedObjectIds.length,
              z: 0,
            }),
            { x: 0, y: 0, z: 0 },
          )
        : { x: 0, y: 0, z: 0 }
    const rawOffsets = orderedObjectIds.map((object_id, index) => {
      const distance = state.explodeSpacing * (index + 1)
      if (state.explodeMode === 'vertical') {
        return { x: 0, y: 0, z: -distance }
      }
      if (state.explodeMode === 'horizontal') {
        return { x: distance, y: 0, z: 0 }
      }
      if (state.explodeMode === 'radial') {
        const position = radialBasePositions[index]!
        const directionX = position.x - radialCenter.x
        const directionY = position.y - radialCenter.y
        const length = Math.hypot(directionX, directionY)
        const angle =
          length > 0.0001
            ? Math.atan2(directionY, directionX)
            : (Math.PI * 2 * index) / Math.max(1, orderedObjectIds.length)
        return {
          x: Math.cos(angle) * state.explodeSpacing,
          y: Math.sin(angle) * state.explodeSpacing,
          z: 0,
        }
      }
      if (state.explodeMode === 'grid') {
        const spacing = state.explodeSpacing * gridSpacingMultiplier
        const columns = Math.ceil(Math.sqrt(orderedObjectIds.length))
        const rows = Math.ceil(orderedObjectIds.length / columns)
        const baseRowCount = Math.floor(orderedObjectIds.length / rows)
        const remainder = orderedObjectIds.length % rows
        const rowCounts = Array.from({ length: rows }, (_value, rowIndex) =>
          baseRowCount + (rowIndex < remainder ? 1 : 0),
        )
        let row = 0
        let rowStartIndex = 0
        for (; row < rowCounts.length; row += 1) {
          const rowCount = rowCounts[row]!
          if (index < rowStartIndex + rowCount) {
            const column = index - rowStartIndex
            return {
              x: gridAnchorPosition.x + column * spacing,
              y: gridAnchorPosition.y + row * spacing,
              z: 0,
            }
          }
          rowStartIndex += rowCount
        }
        return {
          x: 0,
          y: 0,
          z: 0,
        }
      }
      return { x: 0, y: 0, z: 0 }
    })
    const offsetCenter = rawOffsets.reduce(
      (center, offset) => ({
        x: center.x + offset.x / orderedObjectIds.length,
        y: center.y + offset.y / orderedObjectIds.length,
        z: center.z + offset.z / orderedObjectIds.length,
      }),
      { x: 0, y: 0, z: 0 },
    )
    const centeredOffsets =
      state.explodeMode === 'grid'
        ? rawOffsets
        : rawOffsets.map(offset => ({
            x: normalizeOffset(offset.x - offsetCenter.x),
            y: normalizeOffset(offset.y - offsetCenter.y),
            z: normalizeOffset(offset.z - offsetCenter.z),
          }))
    const targetOffsetsByObjectId = Object.fromEntries(
      orderedObjectIds.map((object_id, index) => {
        const centeredOffset = centeredOffsets[index]!
        if (state.explodeMode !== 'grid') {
          return [object_id, state.explodeMode ? centeredOffset : { x: 0, y: 0, z: 0 }]
        }
        const basePosition = translationFromTransforms(state.transformByObjectId[object_id] ?? [])
        return [
          object_id,
          {
            x: normalizeOffset(centeredOffset.x - basePosition.x),
            y: normalizeOffset(centeredOffset.y - basePosition.y),
            z: normalizeOffset(centeredOffset.z - basePosition.z),
          },
        ]
      }),
    ) as Record<string, { x: number; y: number; z: number }>
    const requests = orderedObjectIds.flatMap((object_id, index) => {
      const targetOffset = targetOffsetsByObjectId[object_id]!
      const currentOffset = state.explodeOffsetByObjectId[object_id] ?? { x: 0, y: 0, z: 0 }
      const deltaOffset = {
        x: normalizeOffset(targetOffset.x - currentOffset.x),
        y: normalizeOffset(targetOffset.y - currentOffset.y),
        z: normalizeOffset(targetOffset.z - currentOffset.z),
      }
      if (!deltaOffset.x && !deltaOffset.y && !deltaOffset.z) {
        return []
      }
      const cmd_id = nextRequestId()
      state.ignoredOutgoingCommandIds.add(cmd_id)
      return [
        {
          cmd_id,
          cmd: {
            type: 'set_object_transform',
            object_id,
            transforms: [
              {
                translate: {
                  origin: { type: 'local' },
                  property: deltaOffset,
                  set: false,
                },
                rotate_rpy: null,
                rotate_angle_axis: null,
                scale: null,
              },
            ],
          },
        },
      ]
    })
    state.explodeOffsetByObjectId = targetOffsetsByObjectId
    if (!requests.length) {
      return
    }
    state.webView.rtc.send(
      JSON.stringify({
        type: 'modeling_cmd_batch_req',
        batch_id: nextRequestId(),
        responses: true,
        requests,
      }),
    )
  }
  const executeInput = async (input: ExecutionInput) => {
    if (!state.originalSourceInput && state.source && !state.diffEnabled) {
      state.originalSourceInput = cloneExecutionInput(input)
    }
    state.lastExecutionInput = cloneExecutionInput(input)
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.seenObjectIdsInSendOrder = []
    state.transformByObjectId = {}
    state.pendingTransformByObjectId = {}
    state.explodeOffsetByObjectId = {}
    state.solidObjectIds = []
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    state.executorValues = null
    setCurrentExecutorResult(undefined)
    clearSelectedFeatureState()
    if (!state.diffEnabled || !state.diffCompareSource) {
      state.diffBodyOwnershipByArtifactId = {}
      state.diffBodyOwnershipSequence = []
      state.diffObjectOwnershipById = {}
      state.seenObjectIdsInSendOrder = []
    }
    replaceKclErrors([])
    if (isDirectorySourceSelection(state.source) && typeof input !== 'string') {
      state.directoryFilePaths = [...input.keys()]
        .map(path => normalizeExecutionPath(path))
        .filter(path => path.endsWith('.kcl'))
        .sort()
      state.activeDirectoryFilePath = activeDirectoryFilePathForInput(
        input,
        state.activeDirectoryFilePath,
      )
    }
    try {
      const shouldProvideMainKclPath =
        !state.diffEnabled &&
        (state.source?.kind === 'file' ||
          state.source?.kind === 'browser-file' ||
          state.source?.kind === 'directory' ||
          state.source?.kind === 'browser-directory')
      const result = await state.executor!.submit(
        input,
        shouldProvideMainKclPath
          ? {
              mainKclPathName:
                state.source?.kind === 'file' || state.source?.kind === 'browser-file'
                  ? mainKclPathNameForSource(state.source.label)
                  : activeDirectoryFilePathForInput(input, state.activeDirectoryFilePath),
            }
          : undefined,
      )
      setCurrentExecutorResult(result)
      state.executorValues = executorValuesFromResult(result)
      const errorDisplays = kclErrorDisplaysFromExecutorResult(result, input, state.source)
      replaceKclErrorDisplays(errorDisplays)
      if (errorDisplays.length) {
        await appendErrorsLog(state.kclErrors)
        render()
        return result
      }
      state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)]
      state.webView?.rtc?.send?.(zoomToFitRequest())
      const cmdId = nextRequestId()
      state.pendingSolidObjectIdsRequestId = cmdId
      state.webView?.rtc?.send?.(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id: cmdId,
          cmd: {
            type: 'scene_get_entity_ids',
            filter: ['solid3d'],
            skip: 0,
            take: 1000,
          },
        }),
      )
      if (state.diffEnabled && state.diffCompareSource) {
        state.diffBodyOwnershipByArtifactId = diffBodyOwnershipByArtifactIdFromResult(result)
        state.diffBodyOwnershipSequence = diffBodyOwnershipSequenceFromResult(result)
        await syncDiffObjectOwnership()
      }
      return result
    } catch (error) {
      state.executorValues = null
      setCurrentExecutorResult(undefined)
      const errorMessages = kclErrorMessagesFromUnknown(error)
      replaceKclErrors(errorMessages.length ? errorMessages : ['Unable to render KCL.'])
      await appendErrorsLog(state.kclErrors)
      render()
      return undefined
    }
  }
  const client = deps.createClient(usesZooCookieAuth ? '' : state.token)
  let webView!: WebViewLike
  let startButton!: HTMLElement
  let picker!: HTMLDivElement
  let directoryButton!: HTMLButtonElement
  let fileButton!: HTMLButtonElement
  let clipboardButton!: HTMLButtonElement
  let regularFileInput!: HTMLInputElement
  let regularDirectoryInput!: HTMLInputElement
  let browserBanner!: HTMLDivElement
  let scenePointerDown: { x: number; y: number; pointerId: number } | null = null
  const pendingModelingResponses = new Map<
    string,
    (response: {
      request_id?: string
      resp?: {
        type?: string
        data?: {
          modeling_response?: {
            type?: string
            data?: Record<string, unknown>
          }
        }
      }
      success?: boolean
    }) => void
  >()
  let snapshotRefreshTimer = 0
  let snapshotRefreshInFlight = false
  let snapshotRefreshQueued = false

  const elements = {
    get startButton() {
      return startButton
    },
    tokenInput,
    directoryFileRow,
    directoryFileField,
    directoryFileSelect,
    get browserBanner() {
      return browserBanner
    },
      snapshotRail,
    snapshotCards,
    snapshotImages,
    kclError,
    kclErrorLabel,
    kclErrorText,
    versionBadge,
    sourceValue,
    statusValue,
    edgesButton,
    xrayButton,
    selectionRangeValue,
    selectionOverlay,
    selectionOverlayTitle,
    selectionOverlayCode,
    selectionOverlayClose,
    selectionModeBodyButton,
    selectionModeFeatureButton,
    diffButton,
    diffOriginalButton,
    diffDirectoryButton,
    diffFileButton,
    diffClipboardButton,
    explodeButton,
    explodeHorizontalButton,
    explodeVerticalButton,
    explodeRadialButton,
    explodeGridButton,
    explodeSpacingInput,
    disconnectButton,
    get picker() {
      return picker
    },
    get fileButton() {
      return fileButton
    },
    get directoryButton() {
      return directoryButton
    },
    get clipboardButton() {
      return clipboardButton
    },
    viewer,
  }

  const render = () => {
    const status = deps.document.hidden
      ? 'paused'
      : state.execution
        ? 'rendering'
        : state.executor
          ? 'connected'
          : state.source
            ? 'connecting'
            : 'idle'
    const launcherVisible = !state.source && !state.executor && !state.execution
    startButton.style.width = launcherVisible
      ? `${Math.min(224, Math.floor(size.width * 0.4))}px`
      : '3.5rem'
    startButton.style.textAlign = launcherVisible ? 'center' : 'right'
    startButton.title = state.token || usesZooCookieAuth ? 'Choose source' : 'Set API token'
    picker.style.opacity = launcherVisible ? '1' : '0'
    picker.style.pointerEvents = launcherVisible ? 'auto' : 'none'
    if (!launcherVisible && startButton?.isConnected) {
      const stageRect = viewerStage.getBoundingClientRect()
      const startRect = startButton.getBoundingClientRect()
      const gapPx =
        Number.parseFloat(globalThis.getComputedStyle(root).fontSize || '16') || 16
      const topPx = Math.max(0, startRect.top - stageRect.top + startRect.height + gapPx)
      viewerUiLeft.style.top = `${topPx}px`
      viewerConnection.style.top = `${topPx}px`
    } else {
      viewerUiLeft.style.top = ''
      viewerConnection.style.top = ''
    }
    const shouldShowDisconnectBanner = Boolean(state.disconnectMessage) && launcherVisible
    browserBanner.hidden =
      (!shouldShowDisconnectBanner && (isSupportedBrowser || !launcherVisible))
    browserBanner.dataset.bannerType = shouldShowDisconnectBanner ? 'disconnect' : 'browser'
    browserBanner.innerHTML = shouldShowDisconnectBanner
      ? disconnectBannerMarkup(state.disconnectMessage)
      : browserBannerMarkup
    tokenInput.hidden = usesZooCookieAuth
    tokenInput.value = state.token
      ? `${state.token.slice(0, 8)}${'*'.repeat(Math.max(0, state.token.length - 8))}`
      : ''
    const showDirectoryFilePicker =
      !launcherVisible &&
      isDirectorySourceSelection(state.source) &&
      state.directoryFilePaths.length > 0
    directoryFileField.hidden = !showDirectoryFilePicker
    directoryFileSelect.replaceChildren(
      ...state.directoryFilePaths.map(path => {
        const option = deps.document.createElement('option')
        option.value = path
        option.textContent = path
        return option
      }),
    )
    directoryFileSelect.value = state.activeDirectoryFilePath
    kclError.hidden = state.kclErrors.length === 0
    kclErrorLabel.textContent =
      state.kclErrors.length > 1 ? `KCL errors (${state.kclErrors.length})` : 'KCL error'
    kclErrorText.textContent = state.kclErrors.join('\n\n')
    kclError.dataset.copyable = state.kclErrorLocations.length ? 'true' : 'false'
    kclError.title = state.kclErrorLocations.length ? 'Click to copy file location' : ''
    versionBadge.textContent = appCommitHash
    versionBadge.title = `Version ${appCommitHash}`
    versionBadge.setAttribute('aria-label', `Version ${appCommitHash}`)
    snapshotRail.hidden = false
    snapshotViews.forEach(({ key, label }) => {
      const url = state.snapshotUrls[key]
      const image = snapshotImages[key]
      const empty = snapshotEmptyStates[key]
      const card = snapshotCards[key]
      card.dataset.active = state.executor ? 'true' : 'false'
      card.title = state.executor ? `${label} view` : `${label} snapshot`
      card.setAttribute('aria-label', state.executor ? `${label} view` : `${label} snapshot`)
      image.hidden = !url
      if (url) {
        image.src = url
      } else {
        image.removeAttribute('src')
      }
      image.title = `${label} snapshot`
      empty.hidden = Boolean(url)
      empty.textContent = state.snapshotRefreshing
        ? 'Updating…'
        : state.source
          ? 'No snapshot'
          : 'Load a model'
    })
    sourceValue.textContent = state.diffCompareSource
      ? state.diffCompareSource.kind === 'snapshot'
        ? state.source?.label ?? 'No source'
        : `${state.source?.label ?? 'No source'} vs ${state.diffCompareSource.label}`
      : state.source?.label ?? 'No source'
    sourceValue.hidden = launcherVisible || showDirectoryFilePicker
    statusValue.hidden = launcherVisible
    statusValue.dataset.status = status
    statusValue.title = `Connection: ${status}`
    statusValue.setAttribute('aria-label', `Connection status: ${status}`)
    statusValue.innerHTML =
      status === 'connected'
        ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5 8 14.5 16 5.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>'
        : status === 'rendering'
          ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.5a6.5 6.5 0 1 1-4.6 1.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/><path d="M5.4 2.8v3.6H9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>'
          : status === 'connecting'
            ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 7.5a9 9 0 0 1 13 0M6.5 10.5a4.8 4.8 0 0 1 7 0M10 14.2h.01" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"/></svg>'
            : status === 'paused'
              ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4.5v11M13 4.5v11" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>'
              : '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-dasharray="2.2 3" stroke-linecap="round" stroke-width="1.6"/></svg>'
    edgesButton.hidden = status !== 'connected'
    edgesButton.dataset.active = state.edgeLinesVisible ? 'true' : 'false'
    edgesButton.title = state.edgeLinesVisible ? 'Hide edges' : 'Show edges'
    edgesButton.setAttribute(
      'aria-label',
      state.edgeLinesVisible ? 'Hide edges' : 'Show edges',
    )
    edgesButton.innerHTML = state.edgeLinesVisible
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.2 6.8h6.2V13H5.2zM8.3 3.9h6.2v6.2H8.3zM5.2 6.8 8.3 3.9M11.4 6.8l3.1-2.9M11.4 13l3.1-2.9M5.2 13l3.1-2.9" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.2 6.8h6.2V13H5.2zM8.3 3.9h6.2v6.2H8.3zM5.2 6.8 8.3 3.9M11.4 6.8l3.1-2.9M11.4 13l3.1-2.9M5.2 13l3.1-2.9M4.2 15.8 15.8 4.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/></svg>'
    xrayButton.hidden = status !== 'connected' || state.diffEnabled
    xrayButton.dataset.active = state.xrayVisible ? 'true' : 'false'
    xrayButton.title = state.xrayVisible ? 'Disable xray' : 'Enable xray'
    xrayButton.setAttribute('aria-label', state.xrayVisible ? 'Disable xray' : 'Enable xray')
    xrayButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.2c-3.3 0-5.7 2.3-5.7 5.4 0 1.8.7 3.2 1.9 4.1v1.7c0 .7.5 1.2 1.2 1.2h1v1.1c0 .3.2.5.5.5h1.1v-1.6h.1v1.6h1.1c.3 0 .5-.2.5-.5v-1.1h1c.7 0 1.2-.5 1.2-1.2V12.7c1.2-.9 1.9-2.3 1.9-4.1 0-3.1-2.4-5.4-5.7-5.4Z" fill="currentColor"/><circle cx="7.9" cy="8.7" r="1.35" fill="#080d09"/><circle cx="12.1" cy="8.7" r="1.35" fill="#080d09"/><path d="M9.2 11.4 10 10.2l.8 1.2Z" fill="#080d09"/><path d="M7.8 13h4.4" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1.2"/><path d="M8.6 13.1v2.1M10 13.1v2.1M11.4 13.1v2.1" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1"/></svg>'
    const selectionDisplay = selectionDisplayFromMappings(
      selectedFeatureSourceMappingsFromFeatures(window.zooSelectedFeatures ?? []),
    )
    const selectionOverlayOpen =
      state.selectionOverlayOpen && status === 'connected' && selectionDisplay.hasSelection
    directoryFileRow.hidden = status !== 'connected'
    selectionRangeValue.hidden = status !== 'connected'
    selectionRangeValue.textContent = selectionOverlayOpen ? '' : selectionDisplay.pillText
    selectionRangeValue.innerHTML = selectionOverlayOpen
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4.25" y="4.25" width="11.5" height="11.5" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.35"/><path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>'
      : selectionDisplay.pillText
    selectionRangeValue.title = selectionOverlayOpen
      ? 'Close source preview'
      : selectionDisplay.pillTitle
    selectionRangeValue.dataset.empty = selectionDisplay.hasSelection ? 'false' : 'true'
    selectionRangeValue.dataset.open = selectionOverlayOpen ? 'true' : 'false'
    selectionRangeValue.setAttribute(
      'aria-label',
      selectionOverlayOpen
        ? 'Close source preview'
        : selectionDisplay.hasSelection
        ? `Selected source range ${selectionDisplay.pillTitle}`
        : 'No selection',
    )
    selectionOverlay.hidden = !selectionOverlayOpen
    selectionOverlayTitle.textContent = selectionDisplay.overlayTitle
    selectionOverlayCode.textContent = selectionDisplay.overlayCode
    selectionModeBodyButton.hidden = status !== 'connected'
    selectionModeFeatureButton.hidden = status !== 'connected'
    selectionModeBodyButton.dataset.active = state.selectionMode === 'body' ? 'true' : 'false'
    selectionModeFeatureButton.dataset.active =
      state.selectionMode === 'feature' ? 'true' : 'false'
    selectionModeBodyButton.title = 'Select bodies'
    selectionModeFeatureButton.title = 'Select faces and edges'
    diffButton.hidden = status !== 'connected'
    diffButton.dataset.active = state.diffEnabled ? 'true' : 'false'
    diffButton.title = state.diffEnabled ? 'Exit diff mode' : 'Enter diff mode'
    diffButton.setAttribute('aria-label', diffButton.title)
    diffButton.innerHTML = state.diffEnabled
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="5.2" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="5.2" cy="15" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="14.8" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M7.2 6.1 12.8 8.9M7.2 13.9 12.8 11.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/></svg>'
    diffOriginalButton.hidden =
      status !== 'connected' ||
      !state.diffEnabled ||
      Boolean(state.diffCompareSource) ||
      state.source?.kind === 'clipboard' ||
      !state.originalSourceInput
    diffOriginalButton.dataset.active = 'false'
    diffOriginalButton.title =
      state.source?.kind === 'directory'
        ? 'Compare project against original'
        : 'Compare against original'
    diffOriginalButton.setAttribute('aria-label', diffOriginalButton.title)
    diffDirectoryButton.hidden =
      status !== 'connected' || !state.diffEnabled || Boolean(state.diffCompareSource)
    diffDirectoryButton.dataset.active = 'false'
    diffDirectoryButton.title = 'Load project'
    diffFileButton.hidden =
      status !== 'connected' || !state.diffEnabled || Boolean(state.diffCompareSource)
    diffFileButton.dataset.active = 'false'
    diffFileButton.title = 'Load KCL file'
    diffClipboardButton.hidden =
      status !== 'connected' || !state.diffEnabled || Boolean(state.diffCompareSource)
    diffClipboardButton.dataset.active = 'false'
    diffClipboardButton.title = 'Use clipboard contents'
    explodeButton.hidden = status !== 'connected'
    explodeButton.dataset.active =
      state.explodeMenuVisible || Boolean(state.explodeMode) ? 'true' : 'false'
    explodeButton.title = state.explodeMenuVisible ? 'Close explode modes' : 'Open explode modes'
    explodeButton.setAttribute('aria-label', explodeButton.title)
    explodeButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 6.4 10 4.2l5.5 2.2L10 8.6ZM4.5 10 10 7.8l5.5 2.2L10 12.2ZM4.5 13.6 10 11.4l5.5 2.2L10 15.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/></svg>'
    explodeHorizontalButton.hidden = status !== 'connected' || !state.explodeMenuVisible
    explodeHorizontalButton.dataset.active = state.explodeMode === 'horizontal' ? 'true' : 'false'
    explodeHorizontalButton.title = 'Horizontal explode'
    explodeVerticalButton.hidden = status !== 'connected' || !state.explodeMenuVisible
    explodeVerticalButton.dataset.active = state.explodeMode === 'vertical' ? 'true' : 'false'
    explodeVerticalButton.title = 'Vertical explode'
    explodeRadialButton.hidden = status !== 'connected' || !state.explodeMenuVisible
    explodeRadialButton.dataset.active = state.explodeMode === 'radial' ? 'true' : 'false'
    explodeRadialButton.title = 'Radial explode'
    explodeGridButton.hidden = status !== 'connected' || !state.explodeMenuVisible
    explodeGridButton.dataset.active = state.explodeMode === 'grid' ? 'true' : 'false'
    explodeGridButton.title = 'Grid explode'
    explodeSpacingInput.hidden = status !== 'connected' || !state.explodeMenuVisible
    explodeSpacingInput.value = `${state.explodeSpacing}`
    explodeSpacingInput.title = `Explode spacing: ${state.explodeSpacing}`
    disconnectButton.hidden = status !== 'connected'
    disconnectButton.title = 'Disconnect'
    disconnectButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'
  }

  const handleAuthenticationFailure = () => {
    resetToLauncherState('Authentication failed. Paste a valid Zoo API token to reconnect.')
  }

  const requestModelingResponse = (
    cmd: Record<string, unknown>,
  ) =>
    new Promise<{
      request_id?: string
      resp?: {
        type?: string
        data?: {
          modeling_response?: {
            type?: string
            data?: Record<string, unknown>
          }
        }
      }
      success?: boolean
    }>((resolve, reject) => {
      if (!state.webView?.rtc?.send) {
        reject(new Error('Missing rtc'))
        return
      }
      const cmd_id = nextRequestId()
      pendingModelingResponses.set(cmd_id, resolve)
      state.webView.rtc.send(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id,
          cmd,
        }),
      )
    })

  const clearSnapshotRefresh = () => {
    if (snapshotRefreshTimer) {
      deps.clearTimeout(snapshotRefreshTimer)
      snapshotRefreshTimer = 0
    }
    snapshotRefreshQueued = false
  }

  const refreshSnapshots = async () => {
    if (!state.executor || !state.source) {
      state.snapshotRefreshing = false
      clearSnapshotUrls()
      render()
      return
    }
    state.snapshotRefreshing = true
    render()
    let savedView: zoo.CameraViewState | null = null
    const viewerVideo = state.webView?.el.querySelector<HTMLVideoElement>('video')
    const snapshotFrame = snapshotImages.top.parentElement as HTMLElement | null
    const measuredSnapshotFrame = snapshotFrame ? deps.measure(snapshotFrame) : { width: 0, height: 0 }
    const snapshotStreamSize =
      measuredSnapshotFrame.width >= 4 && measuredSnapshotFrame.height >= 4
        ? streamSize(measuredSnapshotFrame.width, measuredSnapshotFrame.height)
        : streamSize(Math.max(160, size.width * 0.24), Math.max(220, size.height * 0.56))
    const measuredViewer = deps.measure(viewer)
    const viewerStreamSize =
      measuredViewer.width >= 4 && measuredViewer.height >= 4
        ? streamSize(measuredViewer.width, measuredViewer.height)
        : streamSize(size.width, size.height)
    try {
      viewerVideo?.pause()
      const viewResponse = await requestModelingResponse({ type: 'default_camera_get_view' })
      if (
        viewResponse.success &&
        viewResponse.resp?.type === 'modeling' &&
        viewResponse.resp.data?.modeling_response?.type === 'default_camera_get_view'
      ) {
        savedView = (viewResponse.resp.data.modeling_response.data as { view?: zoo.CameraViewState })
          ?.view ?? null
      }
      await requestModelingResponse({
        type: 'reconfigure_stream',
        width: snapshotStreamSize.width,
        height: snapshotStreamSize.height,
        fps: 30,
      })
      const nextSnapshotUrls = {
        top: '',
        profile: '',
        front: '',
      }
      for (const snapshotView of snapshotViews) {
        viewerVideo?.pause()
        await requestModelingResponse({
          type: 'default_camera_look_at',
          center: { x: 0, y: 0, z: 0 },
          vantage: snapshotView.vantage,
          up: snapshotView.up,
        })
        await requestModelingResponse({
          type: 'zoom_to_fit',
          object_ids: [],
          padding: -0.1,
        })
        const snapshotResponse = await requestModelingResponse({
          type: 'take_snapshot',
          format: 'png',
        })
        nextSnapshotUrls[snapshotView.key] =
          snapshotResponse.success &&
          snapshotResponse.resp?.type === 'modeling' &&
          snapshotResponse.resp.data?.modeling_response?.type === 'take_snapshot'
            ? snapshotUrlFromContents(
                (snapshotResponse.resp.data.modeling_response.data as { contents?: string })
                  ?.contents,
              )
            : ''
      }
      state.snapshotUrls = nextSnapshotUrls
    } finally {
      if (savedView) {
        try {
          await requestModelingResponse({
            type: 'default_camera_set_view',
            view: savedView,
          })
        } catch {}
      }
      try {
        await requestModelingResponse({
          type: 'reconfigure_stream',
          width: viewerStreamSize.width,
          height: viewerStreamSize.height,
          fps: 30,
        })
      } catch {}
      if (viewerVideo) {
        try {
          const playback = viewerVideo.play()
          if (playback && typeof playback.catch === 'function') {
            void playback.catch(() => {})
          }
        } catch {}
      }
      state.snapshotRefreshing = false
      render()
    }
  }

  const queueSnapshotRefresh = (delay = 150) => {
    if (!state.executor || !state.source) {
      clearSnapshotRefresh()
      state.snapshotRefreshing = false
      clearSnapshotUrls()
      render()
      return
    }
    clearSnapshotRefresh()
    snapshotRefreshTimer = deps.setTimeout(() => {
      snapshotRefreshTimer = 0
      if (snapshotRefreshInFlight) {
        snapshotRefreshQueued = true
        return
      }
      snapshotRefreshInFlight = true
      void refreshSnapshots().finally(() => {
        snapshotRefreshInFlight = false
        if (snapshotRefreshQueued) {
          snapshotRefreshQueued = false
          queueSnapshotRefresh(150)
        }
      })
    }, delay)
  }

  const clearPoller = () => {
    if (state.pollTimer) {
      deps.clearTimeout(state.pollTimer)
      state.pollTimer = 0
    }
    render()
  }

  const clearWebSocketPoller = () => {
    if (state.websocketPollTimer) {
      deps.clearTimeout(state.websocketPollTimer)
      state.websocketPollTimer = 0
    }
  }

  const stopBackgroundPollers = () => {
    clearPoller()
    clearWebSocketPoller()
  }

  const getDirectoryFileHandle = async (
    handle: FileSystemDirectoryHandle,
    name: string,
    create = false,
  ) => {
    const nextGetFileHandle = (
      handle as FileSystemDirectoryHandle & {
        getFileHandle?: (
          name: string,
          options?: { create?: boolean },
        ) => Promise<FileSystemFileHandle>
      }
    ).getFileHandle
    if (!nextGetFileHandle) {
      return null
    }
    return nextGetFileHandle.call(handle, name, create ? { create: true } : undefined)
  }

  const writeDirectoryFile = async (
    handle: FileSystemDirectoryHandle,
    name: string,
    data: string | Blob | BufferSource,
  ) => {
    const fileHandle = await getDirectoryFileHandle(handle, name, true)
    if (!fileHandle) {
      return 0
    }
    const writable = await (fileHandle as WritableFileHandle).createWritable()
    await writable.write(data)
    await writable.close()
    return (await fileHandle.getFile()).lastModified
  }

  const appendDirectoryTextFile = async (
    handle: FileSystemDirectoryHandle,
    name: string,
    text: string,
  ) => {
    const fileHandle = await getDirectoryFileHandle(handle, name, true)
    if (!fileHandle) {
      return false
    }
    const file = await fileHandle.getFile()
    const writable = await (fileHandle as WritableFileHandle).createWritable()
    await writable.write({
      type: 'write',
      position: file.size,
      data: text,
    })
    await writable.close()
    return true
  }

  const appendErrorsLog = async (messages: string[]) => {
    if (state.source?.kind !== 'directory' || !messages.length) {
      return
    }
    await appendDirectoryTextFile(
      state.source.handle,
      errorsLogFilename,
      `${messages.join('\n\n')}\n`,
    )
  }

  const websocketPipeData = (value: unknown): string | Blob | BufferSource | null => {
    if (typeof value === 'string') {
      return value
    }
    if (value == null) {
      return ''
    }
    if (value instanceof Blob || value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
      return value
    }
    if (typeof value === 'object' && value) {
      const record = value as Record<string, unknown>
      if (
        record.data instanceof Blob ||
        record.data instanceof ArrayBuffer ||
        ArrayBuffer.isView(record.data)
      ) {
        return record.data
      }
      if (
        record.payload &&
        typeof record.payload === 'object' &&
        (record.payload as Record<string, unknown>).data !== undefined
      ) {
        const payloadData = (record.payload as Record<string, unknown>).data
        if (
          payloadData instanceof Blob ||
          payloadData instanceof ArrayBuffer ||
          ArrayBuffer.isView(payloadData)
        ) {
          return payloadData
        }
      }
    }
    if (value instanceof Error) {
      return JSON.stringify({
        name: value.name,
        message: value.message,
        stack: value.stack,
      })
    }
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }

  const writeWebSocketPipe = async (
    handle: FileSystemDirectoryHandle,
    value: unknown,
  ) => {
    const output = websocketPipeData(value)
    if (output == null) {
      return
    }
    state.websocketPipeModified = await writeDirectoryFile(handle, websocketPipeFilename, output)
  }

  const scheduleWebSocketPoll = (delay = 1000) => {
    if (
      state.source?.kind !== 'directory' ||
      !state.executor ||
      !state.webView?.rtc?.send ||
      deps.document.hidden
    ) {
      clearWebSocketPoller()
      return
    }
    clearWebSocketPoller()
    state.websocketPollTimer = deps.setTimeout(async () => {
      state.websocketPollTimer = 0
      if (
        state.source?.kind !== 'directory' ||
        !state.executor ||
        !state.webView?.rtc?.send ||
        deps.document.hidden
      ) {
        return
      }
      if (state.execution) {
        scheduleWebSocketPoll(1000)
        return
      }
      let pipeHandle: FileSystemFileHandle | null = null
      try {
        pipeHandle = await getDirectoryFileHandle(
          state.source.handle,
          websocketPipeFilename,
        )
      } catch (error) {
        if (!(error instanceof DOMException) || error.name !== 'NotFoundError') {
          throw error
        }
      }
      if (!pipeHandle) {
        scheduleWebSocketPoll(1000)
        return
      }
      const pipeFile = await pipeHandle.getFile()
      if (pipeFile.lastModified === state.websocketPipeModified) {
        scheduleWebSocketPoll(1000)
        return
      }
      const input = await pipeFile.text()
      if (input.trim()) {
        try {
          await writeWebSocketPipe(
            state.source.handle,
            await state.webView.rtc.send(input),
          )
        } catch (error) {
          const errorMessages = kclErrorMessagesFromUnknown(error)
          await appendErrorsLog(errorMessages.length ? errorMessages : [String(error)])
          await writeWebSocketPipe(state.source.handle, error)
        }
      } else {
        state.websocketPipeModified = pipeFile.lastModified
      }
      scheduleWebSocketPoll(1000)
    }, delay)
  }

  const restartBackgroundPollers = (delay = 0) => {
    if (sourceCanPoll(state.source)) {
      schedulePoll(delay)
    } else {
      clearPoller()
    }
    if (state.source?.kind === 'directory') {
      scheduleWebSocketPoll(delay)
      return
    }
    clearWebSocketPoller()
  }

  const scanDirectory = async (
    handle: FileSystemDirectoryHandle,
    prefix = '',
    withInput = false,
  ) => {
    const project = new Map<string, string>()
    let modified = 0
    for await (const [name, entry] of handle.entries()) {
      if (
        name.startsWith('.') ||
        websocketBridgeFilenames.has(name) ||
        (entry.kind === 'directory' && ignoredDirectoryNames.has(name))
      ) {
        continue
      }
      if (entry.kind === 'directory') {
        const next = await scanDirectory(entry, `${prefix}${name}/`, withInput)
        modified = Math.max(modified, next.modified)
        next.project.forEach((value, key) => project.set(key, value))
        continue
      }
      const file = await entry.getFile()
      modified = Math.max(modified, file.lastModified)
      if (withInput) {
        project.set(`${prefix}${name}`, await file.text())
      }
    }
    return { modified, project }
  }

  const listDirectoryFilePaths = async (
    handle: FileSystemDirectoryHandle,
    prefix = '',
  ): Promise<string[]> => {
    const paths: string[] = []
    for await (const [name, entry] of handle.entries()) {
      if (
        name.startsWith('.') ||
        websocketBridgeFilenames.has(name) ||
        (entry.kind === 'directory' && ignoredDirectoryNames.has(name))
      ) {
        continue
      }
      if (entry.kind === 'directory') {
        paths.push(...(await listDirectoryFilePaths(entry, `${prefix}${name}/`)))
        continue
      }
      const path = normalizeExecutionPath(`${prefix}${name}`)
      if (path.endsWith('.kcl')) {
        paths.push(path)
      }
    }
    return paths.sort()
  }

  const directoryFilePathsForSource = async (source: SourceSelection) => {
    if (source.kind === 'browser-directory') {
      return source.files
        .map(entry => normalizeExecutionPath(entry.path))
        .filter(path => path.endsWith('.kcl'))
        .sort()
    }
    if (source.kind === 'directory') {
      return listDirectoryFilePaths(source.handle)
    }
    return []
  }

  const scanSource = async (source: SourceSelection, withInput = false) => {
    if (source.kind === 'snapshot') {
      return {
        modified: 0,
        input: cloneExecutionInput(source.input),
      }
    }
    if (source.kind === 'clipboard') {
      return {
        modified: 0,
        input: withInput ? source.text : '',
      }
    }
    if (source.kind === 'file') {
      const file = await source.handle.getFile()
      return {
        modified: file.lastModified,
        input: withInput ? new Map([[source.label, await file.text()]]) : '',
      }
    }
    if (source.kind === 'browser-file') {
      return {
        modified: source.file.lastModified,
        input: withInput ? new Map([[source.label, await source.file.text()]]) : '',
      }
    }
    if (source.kind === 'browser-directory') {
      let modified = 0
      const project = new Map<string, string>()
      for (const entry of source.files) {
        modified = Math.max(modified, entry.file.lastModified)
        if (withInput) {
          project.set(entry.path, await entry.file.text())
        }
      }
      return {
        modified,
        input: project,
      }
    }
    const next = await scanDirectory(source.handle, '', withInput)
    return {
      modified: next.modified,
      input: next.project,
    }
  }

  const missingSourceMessage =
    'Selected file or project could not be found. Choose it again to reconnect.'

  const scanSourceOrReset = async (source: SourceSelection, withInput = false) => {
    try {
      return await scanSource(source, withInput)
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error
      }
      resetToLauncherState(missingSourceMessage)
      render()
      return null
    }
  }

  const rerunCurrentSource = () => {
    if (!state.source || !state.executor || state.execution) {
      return
    }
    clearPoller()
    state.execution = (async () => {
      const next = await scanSourceOrReset(state.source!, true)
      if (!next) {
        return undefined
      }
      state.lastModified = next.modified
      if (state.diffEnabled && state.diffCompareSource) {
        const compareScan = await scanSourceOrReset(state.diffCompareSource, true)
        if (!compareScan) {
          return undefined
        }
        return executeInput(await buildMergedDiffInput(next.input, compareScan.input))
      }
      return executeInput(next.input)
    })()
    render()
    void state.execution.finally(() => {
      state.execution = null
      if (
        !deps.document.hidden &&
        (!state.diffEnabled || state.diffCompareSource?.kind === 'snapshot') &&
        sourceCanPoll(state.source)
      ) {
        schedulePoll(1000)
      } else {
        render()
      }
    })
  }

  const schedulePoll = (delay = 1000) => {
    const diffPollingBlocked =
      state.diffEnabled && state.diffCompareSource?.kind !== 'snapshot'
    if (
      !state.source ||
      diffPollingBlocked ||
      state.source.kind === 'clipboard' ||
      !sourceCanPoll(state.source) ||
      !state.executor ||
      state.execution ||
      deps.document.hidden
    ) {
      render()
      return
    }
    clearPoller()
    state.pollTimer = deps.setTimeout(async () => {
      state.pollTimer = 0
      render()
      const nextDiffPollingBlocked =
        state.diffEnabled && state.diffCompareSource?.kind !== 'snapshot'
      if (
        !state.source ||
        nextDiffPollingBlocked ||
        state.source.kind === 'clipboard' ||
        !sourceCanPoll(state.source) ||
        !state.executor ||
        state.execution ||
        deps.document.hidden
      ) {
        return
      }
      const modified = await scanSourceOrReset(state.source, false)
      if (!modified) {
        return
      }
      if (modified.modified === state.lastModified) {
        schedulePoll(1000)
        return
      }
      state.lastModified = modified.modified
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source!, true)
        if (!next) {
          return undefined
        }
        if (state.diffEnabled && state.diffCompareSource?.kind === 'snapshot') {
          const compareScan = await scanSourceOrReset(state.diffCompareSource, true)
          if (!compareScan) {
            return undefined
          }
          return executeInput(await buildMergedDiffInput(next.input, compareScan.input))
        }
        return executeInput(next.input)
      })()
      render()
      void state.execution.finally(() => {
        state.execution = null
        if (
          !deps.document.hidden &&
          (!state.diffEnabled || state.diffCompareSource?.kind === 'snapshot')
        ) {
          schedulePoll(1000)
        } else {
          render()
        }
      })
    }, delay)
    render()
  }

  let allowStartClick = false

  const startConnection = () => {
    if (state.execution || !state.source || state.executor) {
      render()
      return
    }
    allowStartClick = true
    startButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    render()
  }

  const handleReady = () => {
    const nextExecutor = webView.rtc?.executor() ?? null
    if (state.executor && state.executor === nextExecutor) {
      render()
      return
    }
    state.executor = nextExecutor
    state.rtcCloseHandler = () => {
      if (!state.executor && !state.source && !state.execution) {
        return
      }
      resetToLauncherState(defaultDisconnectMessage)
    }
    state.webView?.rtc?.addEventListener?.('close', state.rtcCloseHandler as EventListener, {
      once: true,
    })
    state.lastModified = 0
    state.websocketPipeModified = 0
    state.kclErrors = []
    state.kclErrorLocations = []
    state.executorValues = null
    setCurrentExecutorResult(undefined)
    state.edgeLinesVisible = true
    state.xrayVisible = false
    state.diffEnabled = false
    state.diffCompareSource = null
    state.diffBodyOwnershipByArtifactId = {}
    state.diffBodyOwnershipSequence = []
    state.diffObjectOwnershipById = {}
    state.explodeMenuVisible = false
    state.explodeMode = null
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.transformByObjectId = {}
    state.pendingTransformByObjectId = {}
    state.explodeOffsetByObjectId = {}
    state.solidObjectIds = []
    state.pendingSelectionRequestId = ''
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    state.snapshotRefreshing = false
    clearSelectedFeatureState()
    clearSnapshotUrls()
    clearSnapshotRefresh()
    snapshotRefreshInFlight = false
    pendingModelingResponses.clear()
    state.executorMessageHandler = event => {
      if (!(event instanceof MessageEvent)) {
        return
      }
      const message = event.data as {
        from?: string
        to?: string
        payload?: { type?: string; data?: unknown }
      }
      if (
        message.to === 'websocket' &&
        message.payload?.type === 'send'
      ) {
        let sawNewObjectId = false
        let sawDiffMarker = false
        for (const entry of commandEntriesFromCommandData(message.payload.data)) {
          if (entry.cmd_id && state.ignoredOutgoingCommandIds.delete(entry.cmd_id)) {
            continue
          }
          const materialEntry = materialEntryFromCommand(entry.cmd)
          if (materialEntry) {
            state.pendingMaterialByObjectId[materialEntry[0]] = materialEntry[1]
            const diffSide =
              state.diffEnabled && state.diffCompareSource
                ? diffSideFromMarkerMaterial(materialEntry[1])
                : null
            if (diffSide) {
              state.diffObjectOwnershipById[materialEntry[0]] = diffSide
              sawDiffMarker = true
            }
            if (!state.seenObjectIdsInSendOrder.includes(materialEntry[0])) {
              state.seenObjectIdsInSendOrder.push(materialEntry[0])
              sawNewObjectId = true
            }
          }
          const transformEntry = transformEntryFromCommand(entry.cmd)
          if (transformEntry) {
            state.pendingTransformByObjectId[transformEntry[0]] = transformEntry[1]
            if (!state.seenObjectIdsInSendOrder.includes(transformEntry[0])) {
              state.seenObjectIdsInSendOrder.push(transformEntry[0])
              sawNewObjectId = true
            }
          }
        }
        if (sawNewObjectId && state.diffEnabled && state.diffCompareSource) {
          void syncDiffObjectOwnership()
        }
        if (sawDiffMarker && state.diffEnabled && state.diffCompareSource) {
          state.diffObjectOwnershipById = fillDiffOwnership(state.diffObjectOwnershipById)
          applyDiffAppearance()
          queueSnapshotRefresh()
          render()
        }
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials()
          syncSceneObjectTransforms()
          if (state.diffEnabled) {
            applyDiffAppearance()
          } else if (state.xrayVisible) {
            applyXrayAppearance()
          } else {
            applySceneMaterials()
          }
          if (state.explodeMode) {
            applyExplodedView()
          }
        }
      }
      if (message.from !== 'websocket' || message.payload?.type !== 'message') {
        return
      }
      if (typeof message.payload.data !== 'string') {
        return
      }
      let response:
        | {
            request_id?: string
            errors?: Array<{ error_code?: string; message?: string }>
            resp?: {
              type?: string
              data?: {
                modeling_response?: {
                  type?: string
                  data?: Record<string, unknown> & { solid_id?: string; entity_ids?: string[][] }
                }
                responses?: Record<
                  string,
                  | {
                      response?: {
                        type?: string
                        data?: Record<string, unknown> & { solid_id?: string; entity_ids?: string[][] }
                      }
                    }
                  | {
                      errors?: Array<{ message?: string }>
                    }
                >
              }
            }
            success?: boolean
          }
        | undefined
      try {
        response = JSON.parse(message.payload.data)
      } catch {
        return
      }
      if (!response.success && Array.isArray(response.errors)) {
        const firstError = response.errors[0]
        const isUnauthorizedError =
          firstError?.error_code === 'auth_token_invalid' ||
          firstError?.error_code === 'auth_token_missing'
        if (isUnauthorizedError) {
          handleAuthenticationFailure()
          return
        }
      }
      if (response.request_id) {
        const pendingModelingResponse = pendingModelingResponses.get(response.request_id)
        if (pendingModelingResponse) {
          pendingModelingResponses.delete(response.request_id)
          pendingModelingResponse(response)
        }
      }
      const nextBodyIds = bodyIdsFromWebSocketResponse(response)
      if (nextBodyIds.length) {
        state.pendingBodyArtifactIds.push(...nextBodyIds)
        state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)]
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials()
          syncSceneObjectTransforms()
          if (state.diffEnabled) {
            applyDiffAppearance()
          } else if (state.xrayVisible) {
            applyXrayAppearance()
          } else {
            applySceneMaterials()
          }
          if (state.explodeMode) {
            applyExplodedView()
          }
        }
      }
      if (response.request_id === state.pendingSelectionRequestId) {
        const rawSelectionResponse =
          response.success && response.resp?.type === 'modeling'
            ? response.resp.data?.modeling_response?.data
            : null
        const features = selectedFeaturesForSelectionMode(
          rawSelectionResponse,
          state.selectionMode,
        )
        state.pendingSelectionRequestId = ''
        window.zooLastSelectionResponse = rawSelectionResponse
        void resolveSelectionFeaturesForSourceMapping(features).then(resolvedFeatures => {
          window.zooSelectedFeatures = resolvedFeatures
          window.zooLastSelectionResolvedFeatures = resolvedFeatures
          render()
        })
      }
      if (
        response.success &&
        response.request_id === state.pendingSolidObjectIdsRequestId &&
        response.resp?.type === 'modeling' &&
        response.resp.data?.modeling_response?.type === 'scene_get_entity_ids'
      ) {
        state.pendingSolidObjectIdsRequestId = ''
        state.solidObjectIds =
          response.resp.data.modeling_response.data?.entity_ids?.flat().filter(Boolean) ?? []
        syncSceneObjectMaterials()
        syncSceneObjectTransforms()
        if (state.diffEnabled) {
          applyDiffAppearance()
        } else if (state.xrayVisible) {
          applyXrayAppearance()
        } else {
          applySceneMaterials()
        }
        if (state.explodeMode) {
          applyExplodedView()
        }
        if (state.diffEnabled && state.diffCompareSource) {
          void syncDiffObjectOwnership()
        }
        queueSnapshotRefresh()
      }
    }
    state.executor?.addEventListener?.(state.executorMessageHandler as EventListener)
    state.webView?.rtc?.send?.(selectionFilterRequest(nextRequestId()))
    if (sourceExecutesImmediately(state.source) && state.executor) {
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source!, true)
        if (!next) {
          return undefined
        }
        state.lastModified = next.modified
        return executeInput(next.input)
      })()
      render()
      void state.execution.finally(() => {
        state.execution = null
        render()
      })
      return
    }
    restartBackgroundPollers(0)
  }

  const associateSource = (
    source: SourceSelection,
    options: { directoryFilePaths?: string[]; activeDirectoryFilePath?: string } = {},
  ) => {
    state.source = source
    state.originalSourceInput =
      source.kind === 'clipboard'
        ? source.text
        : source.kind === 'snapshot'
          ? cloneExecutionInput(source.input)
          : null
    state.lastExecutionInput = null
    state.directoryFilePaths = options.directoryFilePaths ?? []
    state.activeDirectoryFilePath = options.activeDirectoryFilePath ?? ''
    state.disconnectMessage = ''
    state.lastModified = 0
    state.websocketPipeModified = 0
    state.executorValues = null
    replaceKclErrors([])
    if (!state.executor && !state.execution) {
      startConnection()
    } else if (!state.execution && !deps.document.hidden) {
      restartBackgroundPollers(0)
    } else {
      render()
    }
  }
  const loadDiffSource = async (compareSource: SourceSelection) => {
    if (!state.source || !state.executor || state.execution) {
      return
    }
    clearPoller()
    state.diffCompareSource = compareSource
    state.diffBodyOwnershipByArtifactId = {}
    state.diffBodyOwnershipSequence = []
    state.diffObjectOwnershipById = {}
    state.seenObjectIdsInSendOrder = []
    state.execution = (async () => {
      const baseScan = await scanSourceOrReset(state.source!, true)
      if (!baseScan) {
        return undefined
      }
      state.lastModified = baseScan.modified
      const compareScan = await scanSourceOrReset(compareSource, true)
      if (!compareScan) {
        return undefined
      }
      return executeInput(await buildMergedDiffInput(baseScan.input, compareScan.input))
    })()
    render()
    void state.execution.finally(() => {
      state.execution = null
      if (state.diffEnabled && state.diffCompareSource?.kind === 'snapshot' && !deps.document.hidden) {
        schedulePoll(1000)
        return
      }
      if (state.diffEnabled) {
        render()
        return
      }
      if (!deps.document.hidden) {
        schedulePoll(1000)
      } else {
        render()
      }
    })
  }
  const handleDiffOriginalButtonClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (
      !state.diffEnabled ||
      !state.source ||
      !state.executor ||
      !state.originalSourceInput ||
      state.source.kind === 'clipboard'
    ) {
      return
    }
    await loadDiffSource({
      kind: 'snapshot',
      input: cloneExecutionInput(state.originalSourceInput),
      label: `Original ${state.source.label}`,
    })
  }
  const handleDiffToggle = () => {
    if (!state.executor || !state.source || state.execution) {
      return
    }
    if (state.diffEnabled) {
      clearPoller()
      state.diffEnabled = false
      state.edgeLinesVisible = state.edgeLinesVisibleBeforeDiff
      state.webView?.rtc?.send?.(edgeVisibilityRequest(state.edgeLinesVisible))
      state.diffCompareSource = null
      state.diffBodyOwnershipByArtifactId = {}
      state.diffBodyOwnershipSequence = []
      state.diffObjectOwnershipById = {}
      state.seenObjectIdsInSendOrder = []
      state.execution = (async () => {
        const next = await scanSourceOrReset(state.source!, true)
        if (!next) {
          return undefined
        }
        return executeInput(next.input)
      })()
      render()
      void state.execution.finally(() => {
        state.execution = null
        if (!deps.document.hidden) {
          schedulePoll(1000)
        } else {
          render()
        }
      })
      return
    }
    clearPoller()
    state.xrayVisible = false
    state.edgeLinesVisibleBeforeDiff = state.edgeLinesVisible
    state.edgeLinesVisible = false
    state.webView?.rtc?.send?.(edgeVisibilityRequest(false))
    state.diffEnabled = true
    state.diffCompareSource = null
    state.diffBodyOwnershipByArtifactId = {}
    state.diffBodyOwnershipSequence = []
    state.diffObjectOwnershipById = {}
    state.seenObjectIdsInSendOrder = []
    applyDiffAppearance()
    queueSnapshotRefresh()
    render()
  }

  const handleStartButtonClick = (event: MouseEvent) => {
    if (
      event.target instanceof Element &&
      event.target.closest('[data-file], [data-directory], [data-clipboard]')
    ) {
      return
    }
    if (allowStartClick) {
      allowStartClick = false
      return
    }
    event.preventDefault()
    event.stopImmediatePropagation()
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus()
      tokenInput.select()
      render()
      return
    }
    if (state.source && !state.executor && !state.execution) {
      startConnection()
      return
    }
    render()
  }

  const handleTokenFocus = () => {
    tokenInput.select()
  }

  const handleTokenBeforeInput = (event: InputEvent) => {
    if (event.inputType === 'insertFromPaste') {
      return
    }
    if (
      event.inputType !== 'insertText' &&
      event.inputType !== 'deleteContentBackward' &&
      event.inputType !== 'deleteContentForward'
    ) {
      return
    }
    event.preventDefault()
    const replaceAll =
      tokenInput.selectionStart === 0 && tokenInput.selectionEnd === tokenInput.value.length
    if (event.inputType === 'insertText') {
      const next = event.data ?? ''
      state.token = replaceAll ? next : `${state.token}${next}`
    } else {
      state.token = replaceAll ? '' : state.token.slice(0, -1)
    }
    if (state.token) {
      deps.storage.setItem(tokenStorageKey, state.token)
    } else {
      deps.storage.removeItem(tokenStorageKey)
    }
    if (!usesZooCookieAuth) {
      client.token = state.token
    }
    render()
    tokenInput.focus()
    tokenInput.setSelectionRange(tokenInput.value.length, tokenInput.value.length)
  }

  const handleTokenPaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const next = event.clipboardData?.getData('text').trim() ?? ''
    if (!next) {
      return
    }
    const replaceAll =
      tokenInput.selectionStart === 0 && tokenInput.selectionEnd === tokenInput.value.length
    state.token = replaceAll ? next : `${state.token}${next}`
    deps.storage.setItem(tokenStorageKey, state.token)
    if (!usesZooCookieAuth) {
      client.token = state.token
    }
    render()
    tokenInput.focus()
    tokenInput.setSelectionRange(tokenInput.value.length, tokenInput.value.length)
  }

  const handleKclErrorClick = () => {
    if (!state.kclErrorLocations.length) {
      return
    }
    void deps.writeClipboardText(state.kclErrorLocations.join('\n'))
  }

  const setActiveDirectoryFilePath = (nextPath: string) => {
    if (!isDirectorySourceSelection(state.source)) {
      return
    }
    if (!nextPath || nextPath === state.activeDirectoryFilePath) {
      render()
      return
    }
    state.activeDirectoryFilePath = nextPath
    if (state.execution) {
      const pendingExecution = state.execution
      render()
      void pendingExecution.finally(() => {
        if (
          state.execution ||
          !state.executor ||
          !isDirectorySourceSelection(state.source) ||
          state.activeDirectoryFilePath !== nextPath
        ) {
          return
        }
        rerunCurrentSource()
      })
      return
    }
    if (state.executor) {
      rerunCurrentSource()
      return
    }
    render()
  }

  const handleDirectoryFileChange = () => {
    setActiveDirectoryFilePath(normalizeExecutionPath(directoryFileSelect.value))
  }

  const handleSelectionRangeClick = () => {
    if (!state.executor) {
      return
    }
    if (state.selectionOverlayOpen) {
      closeSelectionOverlay()
      return
    }
    const selectionDisplay = selectionDisplayFromMappings(
      selectedFeatureSourceMappingsFromFeatures(window.zooSelectedFeatures ?? []),
    )
    if (!selectionDisplay.hasSelection) {
      return
    }
    if (selectionDisplay.targetDirectoryFilePath) {
      directoryFileSelect.value = selectionDisplay.targetDirectoryFilePath
      setActiveDirectoryFilePath(selectionDisplay.targetDirectoryFilePath)
      return
    }
    state.selectionOverlayOpen = true
    render()
  }

  const closeSelectionOverlay = () => {
    if (!state.selectionOverlayOpen) {
      return
    }
    state.selectionOverlayOpen = false
    render()
  }

  const handleSelectionOverlayBackdropClick = (event: MouseEvent) => {
    if (event.target === selectionOverlay) {
      closeSelectionOverlay()
    }
  }

  const handleRootKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeSelectionOverlay()
    }
  }

  const loadPickedSource = async (source: SourceSelection) => {
    if (state.diffEnabled && state.source && state.executor) {
      await loadDiffSource(source)
      return
    }
    const directoryFilePaths = await directoryFilePathsForSource(source)
    associateSource(source, {
      directoryFilePaths,
      activeDirectoryFilePath: defaultDirectoryFilePath(directoryFilePaths),
    })
  }

  const directoryFilesFromInput = (files: FileList | null) => {
    const nextFiles = Array.from(files ?? [])
    if (!nextFiles.length) {
      return null
    }
    const firstPath = normalizeExecutionPath(nextFiles[0]?.webkitRelativePath || '')
    const rootName = firstPath.includes('/') ? firstPath.split('/')[0]! : 'Selected files'
    return {
      kind: 'browser-directory' as const,
      label: rootName,
      files: nextFiles.map(file => {
        const relativePath = normalizeExecutionPath(file.webkitRelativePath || file.name)
        const segments = relativePath.split('/').filter(Boolean)
        return {
          path: segments.length > 1 ? segments.slice(1).join('/') : file.name,
          file,
        }
      }),
    }
  }

  const handleRegularFileInputChange = async () => {
    const [file] = Array.from(regularFileInput.files ?? [])
    regularFileInput.value = ''
    if (!file) {
      return
    }
    await loadPickedSource({
      kind: 'browser-file',
      file,
      label: file.name,
    })
  }

  const handleRegularDirectoryInputChange = async () => {
    const source = directoryFilesFromInput(regularDirectoryInput.files)
    regularDirectoryInput.value = ''
    if (!source) {
      return
    }
    await loadPickedSource(source)
  }

  tokenInput.addEventListener('focus', handleTokenFocus)
  tokenInput.addEventListener('beforeinput', handleTokenBeforeInput)
  tokenInput.addEventListener('paste', handleTokenPaste)
  directoryFileSelect.addEventListener('change', handleDirectoryFileChange)

  const handleFileButtonClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus()
      tokenInput.select()
      return
    }
    if (usesRegularPickerFallback) {
      regularFileInput.value = ''
      regularFileInput.click()
      return
    }
    try {
      const [handle] = await deps.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: 'KCL files',
            accept: {
              'text/plain': ['.kcl'],
            },
          },
        ],
      })
      if (handle) {
        await loadPickedSource({
          kind: 'file',
          handle,
          label: handle.name,
        })
      }
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== 'AbortError') {
        throw error
      }
    }
  }

  const handleDirectoryButtonClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus()
      tokenInput.select()
      return
    }
    if (usesRegularPickerFallback) {
      regularDirectoryInput.value = ''
      regularDirectoryInput.click()
      return
    }
    try {
      const handle = await deps.showDirectoryPicker()
      await loadPickedSource({
        kind: 'directory',
        handle,
        label: handle.name,
      })
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== 'AbortError') {
        throw error
      }
    }
  }

  const handleClipboardButtonClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus()
      tokenInput.select()
      return
    }
    const text = (await deps.readClipboardText()).trim()
    if (!text) {
      return
    }
    await loadPickedSource({
      kind: 'clipboard',
      text,
      label: 'Clipboard',
    })
  }

  const handleScenePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return
    }
    const selectionSurface =
      webView.el.querySelector<HTMLVideoElement>('video') ??
      webView.el.querySelector<HTMLElement>('canvas') ??
      webView.el
    const rect = selectionSurface.getBoundingClientRect()
    scenePointerDown = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      pointerId: event.pointerId,
    }
  }

  const handleScenePointerUp = (event: PointerEvent) => {
    if (
      event.button !== 0 ||
      !scenePointerDown ||
      scenePointerDown.pointerId !== event.pointerId ||
      !state.executor ||
      !state.webView?.rtc?.send
    ) {
      return
    }
    const framebufferSource =
      webView.el.querySelector<HTMLVideoElement>('video') ??
      webView.el.querySelector<HTMLElement>('canvas') ??
      webView.el
    const rect = framebufferSource.getBoundingClientRect()
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    const movement = Math.hypot(point.x - scenePointerDown.x, point.y - scenePointerDown.y)
    scenePointerDown = null
    if (movement > 4) {
      return
    }
    const framebufferWidth =
      framebufferSource instanceof HTMLVideoElement
        ? framebufferSource.videoWidth || framebufferSource.clientWidth
        : framebufferSource?.clientWidth ?? 0
    const framebufferHeight =
      framebufferSource instanceof HTMLVideoElement
        ? framebufferSource.videoHeight || framebufferSource.clientHeight
        : framebufferSource?.clientHeight ?? 0
    const scaleX = rect.width > 0 && framebufferWidth > 0 ? framebufferWidth / rect.width : 1
    const scaleY = rect.height > 0 && framebufferHeight > 0 ? framebufferHeight / rect.height : 1
    const cmd_id = nextRequestId()
    state.pendingSelectionRequestId = cmd_id
    void (async () => {
      await state.webView!.rtc!.send!(selectionFilterRequest(nextRequestId()))
      const response = await state.webView!.rtc!.send!(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id,
          cmd: {
            type: 'select_with_point',
            selected_at_window: {
              x: Math.round(point.x * scaleX),
              y: Math.round(point.y * scaleY),
            },
            selection_type: 'replace',
          },
        }),
      )
      const parsedResponse = modelingResponseFromRtcSend(response)
      if (
        parsedResponse.success &&
        parsedResponse.resp?.type === 'modeling' &&
        parsedResponse.resp.data?.modeling_response?.type === 'select_with_point'
      ) {
        const selectWithPointData = parsedResponse.resp.data?.modeling_response?.data
        const selectWithPointFeatures = selectedFeaturesForSelectionMode(
          selectWithPointData,
          state.selectionMode,
        )
        let selectionGetData: unknown = null
        let selectionGetFeatures: SelectedFeature[] = []
        const selectionGetResponse = await state.webView!.rtc!.send!(
          JSON.stringify({
            type: 'modeling_cmd_req',
            cmd_id: nextRequestId(),
            cmd: {
              type: 'select_get',
            },
          }),
        )
        const parsedSelectionGet = modelingResponseFromRtcSend(selectionGetResponse)
        if (
          parsedSelectionGet?.success &&
          parsedSelectionGet.resp?.type === 'modeling' &&
          parsedSelectionGet.resp.data?.modeling_response?.type === 'select_get'
        ) {
          selectionGetData = parsedSelectionGet.resp.data?.modeling_response?.data
          selectionGetFeatures = selectedFeaturesForSelectionMode(
            selectionGetData,
            state.selectionMode,
          )
        }
        state.pendingSelectionRequestId = ''
        const resolvedFeatures = preferredSelectionFeatures(
          selectWithPointFeatures,
          selectionGetFeatures,
        )
        const sourceMappedFeatures =
          await resolveSelectionFeaturesForSourceMapping(resolvedFeatures)
        window.zooLastSelectionResponse = {
          selectWithPoint: selectWithPointData,
          selectWithPointResolved: selectWithPointFeatures,
          selectGet: selectionGetData,
          selectGetResolved: selectionGetFeatures,
        }
        window.zooSelectedFeatures = sourceMappedFeatures
        window.zooLastSelectionResolvedFeatures = window.zooSelectedFeatures
        render()
      }
    })()
  }

  const unmountWebView = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler as EventListener)
    state.executorMessageHandler = null
    state.webView?.rtc?.removeEventListener?.('close', state.rtcCloseHandler as EventListener)
    state.rtcCloseHandler = null
    pendingModelingResponses.clear()
    snapshotRefreshInFlight = false
    clearSnapshotRefresh()
    startButton.removeEventListener('click', handleStartButtonClick, { capture: true })
    webView.removeEventListener('ready', handleReady)
    webView.el.removeEventListener('pointerdown', handleScenePointerDown)
    webView.el.removeEventListener('pointerup', handleScenePointerUp)
    fileButton.removeEventListener('click', handleFileButtonClick)
    directoryButton.removeEventListener('click', handleDirectoryButtonClick)
    clipboardButton.removeEventListener('click', handleClipboardButtonClick)
    regularFileInput.removeEventListener('change', handleRegularFileInputChange)
    regularDirectoryInput.removeEventListener('change', handleRegularDirectoryInputChange)
    regularFileInput.remove()
    regularDirectoryInput.remove()
  }

  const mountWebView = () => {
    webView = deps.createWebView({
      zooClient: client,
      size,
    })
    state.webView = webView
    viewer.replaceChildren(webView.el)

    startButton = webView.el.querySelector<HTMLElement>('.start')!
    const startIcon = startButton.querySelector<SVGElement>('svg')
    picker = deps.document.createElement('div')
    directoryButton = deps.document.createElement('button')
    fileButton = deps.document.createElement('button')
    clipboardButton = deps.document.createElement('button')
    regularFileInput = deps.document.createElement('input')
    regularDirectoryInput = deps.document.createElement('input')
    browserBanner = deps.document.createElement('div')
    allowStartClick = false

    startButton.style.display = 'block'
    startButton.style.cursor = 'pointer'
    startButton.style.position = 'absolute'
    if (startIcon) {
      startIcon.style.display = 'block'
      startIcon.style.width = '100%'
      startIcon.style.height = 'auto'
      startIcon.style.cursor = 'pointer'
    }
    picker.className = 'logo-actions'
    picker.style.position = 'absolute'
    picker.style.top = '100%'
    picker.style.left = '50%'
    picker.style.transform = 'translateX(-50%)'
    directoryButton.type = 'button'
    directoryButton.dataset.directory = ''
    directoryButton.className = 'icon-button'
    directoryButton.setAttribute('aria-label', 'Load project')
    directoryButton.title = 'Load project'
    directoryButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    fileButton.type = 'button'
    fileButton.dataset.file = ''
    fileButton.className = 'icon-button'
    fileButton.setAttribute('aria-label', 'Load KCL file')
    fileButton.title = 'Load KCL file'
    fileButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    fileButton.dataset.pulse = 'true'
    clipboardButton.type = 'button'
    clipboardButton.dataset.clipboard = ''
    clipboardButton.className = 'icon-button'
    clipboardButton.setAttribute('aria-label', 'Use clipboard contents')
    clipboardButton.title = 'Use clipboard contents'
    clipboardButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    regularFileInput.type = 'file'
    regularFileInput.accept = '.kcl,text/plain'
    regularFileInput.hidden = true
    regularFileInput.tabIndex = -1
    regularFileInput.dataset.regularFileInput = ''
    regularDirectoryInput.type = 'file'
    regularDirectoryInput.multiple = true
    regularDirectoryInput.hidden = true
    regularDirectoryInput.tabIndex = -1
    regularDirectoryInput.dataset.regularDirectoryInput = ''
    regularDirectoryInput.setAttribute('webkitdirectory', '')
    regularDirectoryInput.setAttribute('directory', '')
    browserBanner.className = 'browser-banner'
    browserBanner.dataset.browserBanner = ''
    browserBanner.innerHTML = browserBannerMarkup
    picker.append(directoryButton, fileButton, clipboardButton)
    startButton.append(picker)
    startButton.append(browserBanner)
    root.append(regularFileInput, regularDirectoryInput)

    startButton.addEventListener('click', handleStartButtonClick, { capture: true })
    webView.el.addEventListener('pointerdown', handleScenePointerDown)
    webView.el.addEventListener('pointerup', handleScenePointerUp)
    webView.addEventListener('ready', handleReady)
    fileButton.addEventListener('click', handleFileButtonClick)
    directoryButton.addEventListener('click', handleDirectoryButtonClick)
    clipboardButton.addEventListener('click', handleClipboardButtonClick)
    regularFileInput.addEventListener('change', handleRegularFileInputChange)
    regularDirectoryInput.addEventListener('change', handleRegularDirectoryInputChange)
  }

  const handleVisibilityChange = () => {
    if (deps.document.hidden) {
      stopBackgroundPollers()
      return
    }
    if (state.source && state.executor && !state.execution) {
      restartBackgroundPollers(0)
    } else {
      render()
    }
  }

  const resetToLauncherState = (disconnectMessage = '') => {
    stopBackgroundPollers()
    unmountWebView()
    state.execution = null
    state.executor = null
    state.source = null
    state.originalSourceInput = null
    state.lastExecutionInput = null
    state.disconnectMessage = disconnectMessage
    state.lastModified = 0
    state.websocketPipeModified = 0
    state.kclErrors = []
    state.kclErrorLocations = []
    state.executorValues = null
    state.edgeLinesVisible = true
    state.xrayVisible = false
    state.diffEnabled = false
    state.diffCompareSource = null
    state.diffBodyOwnershipByArtifactId = {}
    state.diffBodyOwnershipSequence = []
    state.diffObjectOwnershipById = {}
    state.seenObjectIdsInSendOrder = []
    state.explodeMenuVisible = false
    state.explodeMode = null
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.seenObjectIdsInSendOrder = []
    state.transformByObjectId = {}
    state.pendingTransformByObjectId = {}
    state.explodeOffsetByObjectId = {}
    state.solidObjectIds = []
    state.snapshotRefreshing = false
    clearSnapshotUrls()
    clearSnapshotRefresh()
    snapshotRefreshInFlight = false
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    clearSelectedFeatureState()
    void webView.deconstructor?.()
    mountWebView()
    render()
  }
  const handleDisconnect = () => {
    resetToLauncherState(defaultDisconnectMessage)
  }

  const setSelectionMode = (mode: SelectionMode) => {
    if (state.selectionMode === mode) {
      render()
      return
    }
    state.selectionMode = mode
    clearSelectedFeatureState()
    if (state.executor) {
      state.webView?.rtc?.send?.(selectionFilterRequest(nextRequestId()))
    }
    render()
  }

  const handleSelectionModeBody = () => {
    setSelectionMode('body')
  }

  const handleSelectionModeFeature = () => {
    setSelectionMode('feature')
  }

  const handleEdgesToggle = () => {
    if (!state.executor) {
      return
    }
    state.edgeLinesVisible = !state.edgeLinesVisible
    state.webView?.rtc?.send?.(edgeVisibilityRequest(state.edgeLinesVisible))
    queueSnapshotRefresh()
    render()
  }

  const handleXrayToggle = () => {
    if (!state.executor) {
      return
    }
    state.xrayVisible = !state.xrayVisible
    applyXrayAppearance()
    queueSnapshotRefresh()
    render()
  }

  const handleExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    if (state.explodeMenuVisible) {
      state.explodeMenuVisible = false
      if (state.explodeMode) {
        state.explodeMode = null
        applyExplodedView()
        queueSnapshotRefresh()
      }
    } else {
      state.explodeMenuVisible = true
    }
    render()
  }

  const handleHorizontalExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'horizontal' ? null : 'horizontal'
    applyExplodedView()
    queueSnapshotRefresh()
    render()
  }

  const handleVerticalExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'vertical' ? null : 'vertical'
    applyExplodedView()
    queueSnapshotRefresh()
    render()
  }

  const handleRadialExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'radial' ? null : 'radial'
    applyExplodedView()
    queueSnapshotRefresh()
    render()
  }

  const handleGridExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'grid' ? null : 'grid'
    applyExplodedView()
    queueSnapshotRefresh()
    render()
  }

  const handleExplodeSpacingInput = () => {
    state.explodeSpacing = Number(explodeSpacingInput.value) || 10
    render()
  }

  const handleExplodeSpacingChange = () => {
    if (!state.executor) {
      return
    }
    state.explodeSpacing = Number(explodeSpacingInput.value) || 10
    if (state.explodeMode) {
      applyExplodedView()
      queueSnapshotRefresh()
    }
    render()
  }

  const handleSnapshotCardClick = (key: SnapshotView) => {
    if (!state.executor || !state.webView?.rtc?.send) {
      return
    }
    const snapshotView = snapshotViews.find(view => view.key === key)
    if (!snapshotView) {
      return
    }
    state.webView.rtc.send(snapshotViewRequest(snapshotView))
  }
  const handleTopSnapshotClick = () => {
    handleSnapshotCardClick('top')
  }
  const handleProfileSnapshotClick = () => {
    handleSnapshotCardClick('profile')
  }
  const handleFrontSnapshotClick = () => {
    handleSnapshotCardClick('front')
  }

  mountWebView()
  deps.document.addEventListener('visibilitychange', handleVisibilityChange)
  root.addEventListener('keydown', handleRootKeyDown)
  kclError.addEventListener('click', handleKclErrorClick)
  edgesButton.addEventListener('click', handleEdgesToggle)
  xrayButton.addEventListener('click', handleXrayToggle)
  selectionRangeValue.addEventListener('click', handleSelectionRangeClick)
  selectionOverlay.addEventListener('click', handleSelectionOverlayBackdropClick)
  selectionOverlayClose.addEventListener('click', closeSelectionOverlay)
  selectionModeBodyButton.addEventListener('click', handleSelectionModeBody)
  selectionModeFeatureButton.addEventListener('click', handleSelectionModeFeature)
  diffButton.addEventListener('click', handleDiffToggle)
  diffOriginalButton.addEventListener('click', handleDiffOriginalButtonClick)
  diffDirectoryButton.addEventListener('click', handleDirectoryButtonClick)
  diffFileButton.addEventListener('click', handleFileButtonClick)
  diffClipboardButton.addEventListener('click', handleClipboardButtonClick)
  explodeButton.addEventListener('click', handleExplodeToggle)
  explodeHorizontalButton.addEventListener('click', handleHorizontalExplodeToggle)
  explodeVerticalButton.addEventListener('click', handleVerticalExplodeToggle)
  explodeRadialButton.addEventListener('click', handleRadialExplodeToggle)
  explodeGridButton.addEventListener('click', handleGridExplodeToggle)
  explodeSpacingInput.addEventListener('input', handleExplodeSpacingInput)
  explodeSpacingInput.addEventListener('change', handleExplodeSpacingChange)
  snapshotCards.top.addEventListener('click', handleTopSnapshotClick)
  snapshotCards.profile.addEventListener('click', handleProfileSnapshotClick)
  snapshotCards.front.addEventListener('click', handleFrontSnapshotClick)
  disconnectButton.addEventListener('click', handleDisconnect)

  if (usesZooCookieAuth) {
    void deps
      .fetch('https://zoo.dev/account', {
        method: 'GET',
        credentials: 'include',
        redirect: 'manual',
      })
      .then(response => {
        if (response.headers.get('location')) {
          deps.redirectToLogin(loginUrl)
        }
      })
      .catch(() => {})
  }

  render()

  return {
    state,
    size,
    elements,
    destroy: () => {
      stopBackgroundPollers()
      clearSnapshotRefresh()
      unmountWebView()
      tokenInput.removeEventListener('focus', handleTokenFocus)
      tokenInput.removeEventListener('beforeinput', handleTokenBeforeInput)
      tokenInput.removeEventListener('paste', handleTokenPaste)
      directoryFileSelect.removeEventListener('change', handleDirectoryFileChange)
      deps.document.removeEventListener('visibilitychange', handleVisibilityChange)
      root.removeEventListener('keydown', handleRootKeyDown)
      kclError.removeEventListener('click', handleKclErrorClick)
      edgesButton.removeEventListener('click', handleEdgesToggle)
      xrayButton.removeEventListener('click', handleXrayToggle)
      selectionRangeValue.removeEventListener('click', handleSelectionRangeClick)
      selectionOverlay.removeEventListener('click', handleSelectionOverlayBackdropClick)
      selectionOverlayClose.removeEventListener('click', closeSelectionOverlay)
      selectionModeBodyButton.removeEventListener('click', handleSelectionModeBody)
      selectionModeFeatureButton.removeEventListener('click', handleSelectionModeFeature)
      diffButton.removeEventListener('click', handleDiffToggle)
      diffOriginalButton.removeEventListener('click', handleDiffOriginalButtonClick)
      diffDirectoryButton.removeEventListener('click', handleDirectoryButtonClick)
      diffFileButton.removeEventListener('click', handleFileButtonClick)
      diffClipboardButton.removeEventListener('click', handleClipboardButtonClick)
      explodeButton.removeEventListener('click', handleExplodeToggle)
      explodeHorizontalButton.removeEventListener('click', handleHorizontalExplodeToggle)
      explodeVerticalButton.removeEventListener('click', handleVerticalExplodeToggle)
      explodeRadialButton.removeEventListener('click', handleRadialExplodeToggle)
      explodeGridButton.removeEventListener('click', handleGridExplodeToggle)
      explodeSpacingInput.removeEventListener('input', handleExplodeSpacingInput)
      explodeSpacingInput.removeEventListener('change', handleExplodeSpacingChange)
      snapshotCards.top.removeEventListener('click', handleTopSnapshotClick)
      snapshotCards.profile.removeEventListener('click', handleProfileSnapshotClick)
      snapshotCards.front.removeEventListener('click', handleFrontSnapshotClick)
      disconnectButton.removeEventListener('click', handleDisconnect)
    },
  }
}

const root = document.getElementById('app')

if (root) {
  createApp(root)
}
