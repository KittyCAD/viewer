import * as zoo from '@kittycad/lib'
import { ZooWebView } from '@kittycad/web-view'

type SourceSelection =
  | { kind: 'file'; handle: FileSystemFileHandle; label: string }
  | { kind: 'directory'; handle: FileSystemDirectoryHandle; label: string }
  | { kind: 'clipboard'; text: string; label: string }

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

type ExecutorLike = {
  addEventListener?: (
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ) => void
  removeEventListener?: (
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ) => void
  submit: (input: string | Map<string, string>) => Promise<unknown>
}

type WebViewLike = EventTarget & {
  el: HTMLElement
  rtc?: {
    executor: () => ExecutorLike
    send?: (message: string) => void
    deconstructor?: () => Promise<unknown> | unknown
  }
  deconstructor?: () => Promise<unknown> | unknown
}

type AppDeps = {
  showOpenFilePicker: typeof window.showOpenFilePicker
  showDirectoryPicker: typeof window.showDirectoryPicker
  readClipboardText: () => Promise<string>
  writeClipboardText: (text: string) => Promise<void>
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

const browserBannerMarkup = `
  <span>Only supports</span>
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

export function createApp(root: HTMLElement, partialDeps: Partial<AppDeps> = {}) {
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
              <span data-source>none</span>
              <span data-status aria-label="Connection status"></span>
              <button type="button" data-disconnect aria-label="Disconnect"></button>
          </div>
        </div>
          <div class="viewer" data-viewer></div>
        </div>
      </div>
    </div>
  `

  const tokenInput = root.querySelector<HTMLInputElement>('[data-token-input]')!
  const kclError = root.querySelector<HTMLElement>('[data-kcl-error]')!
  const kclErrorLabel = root.querySelector<HTMLElement>('[data-kcl-error-label]')!
  const kclErrorText = root.querySelector<HTMLElement>('[data-kcl-error-text]')!
  const sourceValue = root.querySelector<HTMLElement>('[data-source]')!
  const statusValue = root.querySelector<HTMLElement>('[data-status]')!
  const edgesButton = root.querySelector<HTMLButtonElement>('[data-edges]')!
  const xrayButton = root.querySelector<HTMLButtonElement>('[data-xray]')!
  const explodeButton = root.querySelector<HTMLButtonElement>('[data-explode]')!
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
  const loginUrl = `https://zoo.dev/signin?callbackUrl=${encodeURIComponent(deps.location.href)}`
  const state: {
    token: string
    source: SourceSelection | null
    webView: WebViewLike | null
    executor: ExecutorLike | null
    pollTimer: number
    lastModified: number
    execution: Promise<unknown> | null
    executorMessageHandler: ((event: Event) => void) | null
    kclErrors: string[]
    kclErrorLocations: string[]
    executorValues: unknown
    edgeLinesVisible: boolean
    xrayVisible: boolean
    explodeMenuVisible: boolean
    explodeMode: ExplodeMode | null
    explodeSpacing: number
    snapshotUrls: Record<SnapshotView, string>
    snapshotRefreshing: boolean
    pendingZoomToEntityRequestId: string
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
    webView: null,
    executor: null,
    pollTimer: 0,
    lastModified: 0,
    execution: null,
    executorMessageHandler: null,
    kclErrors: [],
    kclErrorLocations: [],
    executorValues: null,
    edgeLinesVisible: true,
    xrayVisible: false,
    explodeMenuVisible: false,
    explodeMode: null,
    explodeSpacing: 10,
    snapshotUrls: {
      top: '',
      profile: '',
      front: '',
    },
    snapshotRefreshing: false,
    pendingZoomToEntityRequestId: '',
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
  const nextRequestId = () =>
    globalThis.crypto?.randomUUID?.() ??
    `00000000-0000-4000-8000-${`${++requestNumber}`.padStart(12, '0')}`
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
  const xrayOpacity = 0.22
  const gridSpacingMultiplier = 7.5
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
  const entityGetParentIdRequest = (entityId: string, cmd_id: string) =>
    JSON.stringify({
      type: 'modeling_cmd_req',
      cmd_id,
      cmd: {
        type: 'entity_get_parent_id',
        entity_id: entityId,
      },
    })
  const clearSnapshotUrls = () => {
    state.snapshotUrls = {
      top: '',
      profile: '',
      front: '',
    }
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
  const executorResultRecord = (result: unknown) =>
    typeof result === 'object' && result !== null ? (result as Record<string, unknown>) : null
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
    const filename =
      Array.isArray(filenames)
        ? modulePathValue(filenames[moduleId])
        : filenames && typeof filenames === 'object'
          ? modulePathValue((filenames as Record<string, unknown>)[String(moduleId)])
          : ''
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
    return null
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
    if (!request || typeof request !== 'object') {
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
      Array.isArray(request)
        ? request.flatMap(normalizeEntry)
        : 'requests' in request && Array.isArray(request.requests)
          ? request.requests.flatMap(normalizeEntry)
          : normalizeEntry(request)
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
  const applyXrayAppearance = () => {
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
    const rawOffsets = orderedObjectIds.map((object_id, index) => {
      const distance = state.explodeSpacing * (index + 1)
      if (state.explodeMode === 'vertical') {
        return { x: 0, y: 0, z: -distance }
      }
      if (state.explodeMode === 'horizontal') {
        return { x: distance, y: 0, z: 0 }
      }
      if (state.explodeMode === 'radial') {
        const position = translationFromTransforms(state.transformByObjectId[object_id] ?? [])
        const length = Math.hypot(position.x, position.y)
        const angle =
          length > 0.0001
            ? Math.atan2(position.y, position.x)
            : (Math.PI * 2 * index) / Math.max(1, orderedObjectIds.length)
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
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
              x: (column - (rowCount - 1) / 2) * spacing,
              y: (row - (rows - 1) / 2) * spacing,
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
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.transformByObjectId = {}
    state.pendingTransformByObjectId = {}
    state.explodeOffsetByObjectId = {}
    state.solidObjectIds = []
    state.pendingZoomToEntityRequestId = ''
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    state.executorValues = null
    replaceKclErrors([])
    try {
      const result = await state.executor!.submit(input)
      state.executorValues = executorValuesFromResult(result)
      const errorDisplays = kclErrorDisplaysFromExecutorResult(result, input, state.source)
      replaceKclErrorDisplays(errorDisplays)
      if (errorDisplays.length) {
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
      return result
    } catch (error) {
      state.executorValues = null
      const errorMessages = kclErrorMessagesFromUnknown(error)
      replaceKclErrors(errorMessages.length ? errorMessages : ['Unable to render KCL.'])
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
    get browserBanner() {
      return browserBanner
    },
    snapshotRail,
    snapshotCards,
    snapshotImages,
    kclError,
    kclErrorLabel,
    kclErrorText,
    sourceValue,
    statusValue,
    edgesButton,
    xrayButton,
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
    browserBanner.hidden = isSupportedBrowser || !launcherVisible
    tokenInput.hidden = usesZooCookieAuth
    tokenInput.value = state.token
      ? `${state.token.slice(0, 8)}${'*'.repeat(Math.max(0, state.token.length - 8))}`
      : ''
    kclError.hidden = state.kclErrors.length === 0
    kclErrorLabel.textContent =
      state.kclErrors.length > 1 ? `KCL errors (${state.kclErrors.length})` : 'KCL error'
    kclErrorText.textContent = state.kclErrors.join('\n\n')
    kclError.dataset.copyable = state.kclErrorLocations.length ? 'true' : 'false'
    kclError.title = state.kclErrorLocations.length ? 'Click to copy file location' : ''
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
    sourceValue.textContent = state.source?.label ?? 'No source'
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
    xrayButton.hidden = status !== 'connected'
    xrayButton.dataset.active = state.xrayVisible ? 'true' : 'false'
    xrayButton.title = state.xrayVisible ? 'Disable xray' : 'Enable xray'
    xrayButton.setAttribute('aria-label', state.xrayVisible ? 'Disable xray' : 'Enable xray')
    xrayButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.2c-3.3 0-5.7 2.3-5.7 5.4 0 1.8.7 3.2 1.9 4.1v1.7c0 .7.5 1.2 1.2 1.2h1v1.1c0 .3.2.5.5.5h1.1v-1.6h.1v1.6h1.1c.3 0 .5-.2.5-.5v-1.1h1c.7 0 1.2-.5 1.2-1.2V12.7c1.2-.9 1.9-2.3 1.9-4.1 0-3.1-2.4-5.4-5.7-5.4Z" fill="currentColor"/><circle cx="7.9" cy="8.7" r="1.35" fill="#080d09"/><circle cx="12.1" cy="8.7" r="1.35" fill="#080d09"/><path d="M9.2 11.4 10 10.2l.8 1.2Z" fill="#080d09"/><path d="M7.8 13h4.4" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1.2"/><path d="M8.6 13.1v2.1M10 13.1v2.1M11.4 13.1v2.1" fill="none" stroke="#080d09" stroke-linecap="round" stroke-width="1"/></svg>'
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
    startButton.style.width = launcherVisible
      ? `${Math.min(224, Math.floor(size.width * 0.4))}px`
      : '3.5rem'
    startButton.style.textAlign = launcherVisible ? 'center' : 'right'
    startButton.title = state.token || usesZooCookieAuth ? 'Choose source' : 'Set API token'
    picker.style.opacity = launcherVisible ? '1' : '0'
    picker.style.pointerEvents = launcherVisible ? 'auto' : 'none'
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

  const scanDirectory = async (
    handle: FileSystemDirectoryHandle,
    prefix = '',
    withInput = false,
  ) => {
    const project = new Map<string, string>()
    let modified = 0
    for await (const [name, entry] of handle.entries()) {
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

  const scanSource = async (source: SourceSelection, withInput = false) => {
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
        input: withInput ? await file.text() : '',
      }
    }
    const next = await scanDirectory(source.handle, '', withInput)
    return {
      modified: next.modified,
      input: next.project,
    }
  }

  const schedulePoll = (delay = 1000) => {
    if (
      !state.source ||
      state.source.kind === 'clipboard' ||
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
      if (
        !state.source ||
        state.source.kind === 'clipboard' ||
        !state.executor ||
        state.execution ||
        deps.document.hidden
      ) {
        return
      }
      const modified = await scanSource(state.source, false)
      if (modified.modified === state.lastModified) {
        schedulePoll(1000)
        return
      }
      state.lastModified = modified.modified
      state.execution = (async () => {
        const next = await scanSource(state.source!, true)
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
    state.executor = webView.rtc?.executor() ?? null
    state.lastModified = 0
    state.kclErrors = []
    state.kclErrorLocations = []
    state.executorValues = null
    state.edgeLinesVisible = true
    state.xrayVisible = false
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
    state.pendingZoomToEntityRequestId = ''
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    state.snapshotRefreshing = false
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
        for (const entry of commandEntriesFromCommandData(message.payload.data)) {
          if (entry.cmd_id && state.ignoredOutgoingCommandIds.delete(entry.cmd_id)) {
            continue
          }
          const materialEntry = materialEntryFromCommand(entry.cmd)
          if (materialEntry) {
            state.pendingMaterialByObjectId[materialEntry[0]] = materialEntry[1]
          }
          const transformEntry = transformEntryFromCommand(entry.cmd)
          if (transformEntry) {
            state.pendingTransformByObjectId[transformEntry[0]] = transformEntry[1]
          }
        }
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials()
          syncSceneObjectTransforms()
          if (state.xrayVisible) {
            applyXrayAppearance()
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
            resp?: {
              type?: string
              data?: {
                modeling_response?: {
                  type?: string
                  data?: { solid_id?: string; entity_ids?: string[][] }
                }
                responses?: Record<
                  string,
                  | {
                      response?: {
                        type?: string
                        data?: { solid_id?: string; entity_ids?: string[][] }
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
          if (state.xrayVisible) {
            applyXrayAppearance()
          }
          if (state.explodeMode) {
            applyExplodedView()
          }
        }
      }
      if (
        response.success &&
        response.request_id === state.pendingZoomToEntityRequestId &&
        response.resp?.type === 'modeling' &&
        response.resp.data?.modeling_response?.type === 'highlight_set_entity'
      ) {
        state.pendingZoomToEntityRequestId = ''
        const entityId = (
          response.resp.data.modeling_response.data as { entity_id?: string } | undefined
        )?.entity_id
        if (entityId) {
          const cmd_id = nextRequestId()
          state.pendingZoomToEntityRequestId = cmd_id
          state.webView?.rtc?.send?.(entityGetParentIdRequest(entityId, cmd_id))
        }
      }
      if (
        response.success &&
        response.request_id === state.pendingZoomToEntityRequestId &&
        response.resp?.type === 'modeling' &&
        response.resp.data?.modeling_response?.type === 'entity_get_parent_id'
      ) {
        state.pendingZoomToEntityRequestId = ''
        const objectId = (
          response.resp.data.modeling_response.data as { entity_id?: string } | undefined
        )?.entity_id
        if (objectId) {
          state.webView?.rtc?.send?.(zoomToFitEntityRequest(objectId))
        }
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
        if (state.xrayVisible) {
          applyXrayAppearance()
        }
        if (state.explodeMode) {
          applyExplodedView()
        }
        queueSnapshotRefresh()
      }
    }
    state.executor?.addEventListener?.(state.executorMessageHandler as EventListener)
    if (state.source?.kind === 'clipboard' && state.executor) {
      state.execution = (async () => {
        return executeInput(state.source!.text)
      })()
      render()
      void state.execution.finally(() => {
        state.execution = null
        render()
      })
      return
    }
    schedulePoll(0)
  }

  const associateSource = (source: SourceSelection) => {
    state.source = source
    state.lastModified = 0
    state.executorValues = null
    replaceKclErrors([])
    if (!state.executor && !state.execution) {
      startConnection()
    } else if (!state.execution && !deps.document.hidden) {
      schedulePoll(0)
    } else {
      render()
    }
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

  tokenInput.addEventListener('focus', handleTokenFocus)
  tokenInput.addEventListener('beforeinput', handleTokenBeforeInput)
  tokenInput.addEventListener('paste', handleTokenPaste)

  const handleFileButtonClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!usesZooCookieAuth && !state.token) {
      tokenInput.focus()
      tokenInput.select()
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
        associateSource({
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
    try {
      const handle = await deps.showDirectoryPicker()
      associateSource({
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
    associateSource({
      kind: 'clipboard',
      text,
      label: 'Clipboard',
    })
  }

  const handleScenePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return
    }
    const rect = webView.el.getBoundingClientRect()
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
    const rect = webView.el.getBoundingClientRect()
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    const movement = Math.hypot(point.x - scenePointerDown.x, point.y - scenePointerDown.y)
    scenePointerDown = null
    if (movement > 4) {
      return
    }
    const cmd_id = nextRequestId()
    state.pendingZoomToEntityRequestId = cmd_id
    state.webView.rtc.send(
      JSON.stringify({
        type: 'modeling_cmd_req',
        cmd_id,
        cmd: {
          type: 'highlight_set_entity',
          selected_at_window: {
            x: Math.round(point.x),
            y: Math.round(point.y),
          },
        },
      }),
    )
  }

  const unmountWebView = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler as EventListener)
    state.executorMessageHandler = null
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
    browserBanner.className = 'browser-banner'
    browserBanner.dataset.browserBanner = ''
    browserBanner.innerHTML = browserBannerMarkup
    picker.append(directoryButton, fileButton, clipboardButton)
    startButton.append(picker)
    startButton.append(browserBanner)

    startButton.addEventListener('click', handleStartButtonClick, { capture: true })
    webView.el.addEventListener('pointerdown', handleScenePointerDown)
    webView.el.addEventListener('pointerup', handleScenePointerUp)
    webView.addEventListener('ready', handleReady)
    fileButton.addEventListener('click', handleFileButtonClick)
    directoryButton.addEventListener('click', handleDirectoryButtonClick)
    clipboardButton.addEventListener('click', handleClipboardButtonClick)
  }

  const handleVisibilityChange = () => {
    if (deps.document.hidden) {
      clearPoller()
      return
    }
    if (state.source && state.executor && !state.execution) {
      schedulePoll(0)
    } else {
      render()
    }
  }

  const handleDisconnect = () => {
    clearPoller()
    unmountWebView()
    state.execution = null
    state.executor = null
    state.source = null
    state.lastModified = 0
    state.kclErrors = []
    state.kclErrorLocations = []
    state.executorValues = null
    state.edgeLinesVisible = true
    state.xrayVisible = false
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
    state.snapshotRefreshing = false
    clearSnapshotUrls()
    clearSnapshotRefresh()
    snapshotRefreshInFlight = false
    state.pendingZoomToEntityRequestId = ''
    state.pendingSolidObjectIdsRequestId = ''
    state.ignoredOutgoingCommandIds.clear()
    void webView.deconstructor?.()
    mountWebView()
    render()
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
  kclError.addEventListener('click', handleKclErrorClick)
  edgesButton.addEventListener('click', handleEdgesToggle)
  xrayButton.addEventListener('click', handleXrayToggle)
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

  render()

  if (usesZooCookieAuth) {
    const hasSessionCookie = deps.document.cookie
      .split(';')
      .some(part => part.trim().startsWith('__Secure-next-auth.session-token='))
    if (!hasSessionCookie) {
      deps.redirectToLogin(loginUrl)
    }
  }

  return {
    state,
    size,
    elements,
    destroy: () => {
      clearPoller()
      clearSnapshotRefresh()
      unmountWebView()
      tokenInput.removeEventListener('focus', handleTokenFocus)
      tokenInput.removeEventListener('beforeinput', handleTokenBeforeInput)
      tokenInput.removeEventListener('paste', handleTokenPaste)
      deps.document.removeEventListener('visibilitychange', handleVisibilityChange)
      kclError.removeEventListener('click', handleKclErrorClick)
      edgesButton.removeEventListener('click', handleEdgesToggle)
      xrayButton.removeEventListener('click', handleXrayToggle)
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
