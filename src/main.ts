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
        </div>
        <div class="viewer-ui viewer-ui-right">
          <div class="meta">
            <button type="button" data-edges aria-label="Toggle edges"></button>
            <button type="button" data-xray aria-label="Toggle xray"></button>
            <span data-source>none</span>
            <span data-status aria-label="Connection status"></span>
            <button type="button" data-disconnect aria-label="Disconnect"></button>
          </div>
        </div>
        <div class="viewer" data-viewer></div>
      </div>
    </div>
  `

  const tokenInput = root.querySelector<HTMLInputElement>('[data-token-input]')!
  const sourceValue = root.querySelector<HTMLElement>('[data-source]')!
  const statusValue = root.querySelector<HTMLElement>('[data-status]')!
  const edgesButton = root.querySelector<HTMLButtonElement>('[data-edges]')!
  const xrayButton = root.querySelector<HTMLButtonElement>('[data-xray]')!
  const disconnectButton = root.querySelector<HTMLButtonElement>('[data-disconnect]')!
  const viewer = root.querySelector<HTMLElement>('[data-viewer]')!

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
    edgeLinesVisible: boolean
    xrayVisible: boolean
    bodyArtifactIds: string[]
    pendingBodyArtifactIds: string[]
    materialByObjectId: Record<string, MaterialParams>
    pendingMaterialByObjectId: Record<string, MaterialParams>
    solidObjectIds: string[]
    pendingSolidObjectIdsRequestId: string
  } = {
    token: usesZooCookieAuth ? '' : (deps.storage.getItem(tokenStorageKey)?.trim() ?? ''),
    source: null,
    webView: null,
    executor: null,
    pollTimer: 0,
    lastModified: 0,
    execution: null,
    executorMessageHandler: null,
    edgeLinesVisible: true,
    xrayVisible: false,
    bodyArtifactIds: [],
    pendingBodyArtifactIds: [],
    materialByObjectId: {},
    pendingMaterialByObjectId: {},
    solidObjectIds: [],
    pendingSolidObjectIdsRequestId: '',
  }
  let requestNumber = 0
  const nextRequestId = () =>
    globalThis.crypto?.randomUUID?.() ??
    `00000000-0000-4000-8000-${`${++requestNumber}`.padStart(12, '0')}`
  const bodyResponseTypes = new Set([
    'extrude',
    'extrude_to_reference',
    'twist_extrude',
    'revolve',
    'revolve_about_edge',
    'sweep',
    'loft',
  ])
  const xrayOpacity = 0.075
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
  const materialEntriesFromCommandData = (data: unknown): Array<readonly [string, MaterialParams]> => {
    const request =
      typeof data === 'string'
        ? (() => {
            if (!data.startsWith('{') || !data.includes('object_set_material_params_pbr')) {
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
    const requests = Array.isArray(request)
      ? request
      : 'requests' in request && Array.isArray(request.requests)
        ? request.requests
        : 'cmd' in request
          ? [request]
          : 'type' in request && request.type === 'object_set_material_params_pbr'
            ? [{ cmd: request }]
            : []
    return requests.flatMap(entry => {
      if (!entry || typeof entry !== 'object' || !('cmd' in entry) || !entry.cmd || typeof entry.cmd !== 'object') {
        return []
      }
      const cmd = entry.cmd as {
        type?: string
        object_id?: string
        color?: MaterialParams['color']
        metalness?: number
        roughness?: number
        ambient_occlusion?: number
      }
      if (cmd.type !== 'object_set_material_params_pbr' || !cmd.object_id) {
        return []
      }
      return [
        [
          cmd.object_id,
          {
            color: {
              r: cmd.color?.r ?? defaultMaterial.color.r,
              g: cmd.color?.g ?? defaultMaterial.color.g,
              b: cmd.color?.b ?? defaultMaterial.color.b,
              a: cmd.color?.a ?? defaultMaterial.color.a,
            },
            metalness: cmd.metalness ?? defaultMaterial.metalness,
            roughness: cmd.roughness ?? defaultMaterial.roughness,
            ambient_occlusion: cmd.ambient_occlusion ?? defaultMaterial.ambient_occlusion,
          } satisfies MaterialParams,
        ] as const,
      ]
    })
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
            return {
              cmd_id: nextRequestId(),
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
  const executeInput = async (input: string | Map<string, string>) => {
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.solidObjectIds = []
    state.pendingSolidObjectIdsRequestId = ''
    const result = await state.executor!.submit(input)
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
  }
  const client = deps.createClient(usesZooCookieAuth ? '' : state.token)
  let webView!: WebViewLike
  let startButton!: HTMLElement
  let picker!: HTMLDivElement
  let directoryButton!: HTMLButtonElement
  let fileButton!: HTMLButtonElement
  let clipboardButton!: HTMLButtonElement
  let browserBanner!: HTMLDivElement

  const elements = {
    get startButton() {
      return startButton
    },
    tokenInput,
    get browserBanner() {
      return browserBanner
    },
    sourceValue,
    statusValue,
    edgesButton,
    xrayButton,
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
      ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7.5 10 4.5l5.5 3-5.5 3zM4.5 7.5v5l5.5 3 5.5-3v-5" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
      : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7.5 10 4.5l5.5 3-5.5 3zM4.5 7.5v5l5.5 3 5.5-3v-5M4 16 16 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    xrayButton.hidden = status !== 'connected'
    xrayButton.dataset.active = state.xrayVisible ? 'true' : 'false'
    xrayButton.title = state.xrayVisible ? 'Disable xray' : 'Enable xray'
    xrayButton.setAttribute('aria-label', state.xrayVisible ? 'Disable xray' : 'Enable xray')
    xrayButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM8.1 8.2l-1.9 2.3M11.9 8.2l1.9 2.3M10 7.4v4.4M7 10.4h6M8.4 11.8 7.1 16.2M11.6 11.8l1.3 4.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/></svg>'
    disconnectButton.hidden = status !== 'connected'
    disconnectButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5.5" y="5.5" width="9" height="9" rx="1.5" fill="currentColor"/></svg>'
    startButton.style.width = launcherVisible
      ? `${Math.min(224, Math.floor(size.width * 0.4))}px`
      : '3.5rem'
    startButton.style.textAlign = launcherVisible ? 'center' : 'right'
    picker.style.opacity = launcherVisible ? '1' : '0'
    picker.style.pointerEvents = launcherVisible ? 'auto' : 'none'
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
    state.edgeLinesVisible = true
    state.xrayVisible = false
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.solidObjectIds = []
    state.pendingSolidObjectIdsRequestId = ''
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
        for (const [objectId, material] of materialEntriesFromCommandData(message.payload.data)) {
          state.pendingMaterialByObjectId[objectId] = material
        }
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials()
          if (state.xrayVisible) {
            applyXrayAppearance()
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
      const nextBodyIds = bodyIdsFromWebSocketResponse(response)
      if (nextBodyIds.length) {
        state.pendingBodyArtifactIds.push(...nextBodyIds)
        state.bodyArtifactIds = [...new Set(state.pendingBodyArtifactIds)]
        if (state.solidObjectIds.length) {
          syncSceneObjectMaterials()
          if (state.xrayVisible) {
            applyXrayAppearance()
          }
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
        if (state.xrayVisible) {
          applyXrayAppearance()
        }
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

  const unmountWebView = () => {
    state.executor?.removeEventListener?.(state.executorMessageHandler as EventListener)
    state.executorMessageHandler = null
    startButton.removeEventListener('click', handleStartButtonClick, { capture: true })
    webView.removeEventListener('ready', handleReady)
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
    directoryButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.06c.47 0 .92.19 1.25.53l1.41 1.47h7.78A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    fileButton.type = 'button'
    fileButton.dataset.file = ''
    fileButton.className = 'icon-button'
    fileButton.setAttribute('aria-label', 'Load file')
    fileButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3.75h6.69l4.81 4.81v11.69A1.75 1.75 0 0 1 17.5 22h-9A1.75 1.75 0 0 1 6.75 20.25v-14.75A1.75 1.75 0 0 1 8.5 3.75z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.5 3.75V9h5.25" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    fileButton.dataset.pulse = 'true'
    clipboardButton.type = 'button'
    clipboardButton.dataset.clipboard = ''
    clipboardButton.className = 'icon-button'
    clipboardButton.setAttribute('aria-label', 'Load clipboard')
    clipboardButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.75h6M9.75 3h4.5A1.25 1.25 0 0 1 15.5 4.25v.5A1.25 1.25 0 0 1 14.25 6h-4.5A1.25 1.25 0 0 1 8.5 4.75v-.5A1.25 1.25 0 0 1 9.75 3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 5.5h-1A1.75 1.75 0 0 0 5 7.25v11A1.75 1.75 0 0 0 6.75 20h10.5A1.75 1.75 0 0 0 19 18.25v-11a1.75 1.75 0 0 0-1.75-1.75h-1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>'
    browserBanner.className = 'browser-banner'
    browserBanner.dataset.browserBanner = ''
    browserBanner.innerHTML = browserBannerMarkup
    picker.append(directoryButton, fileButton, clipboardButton)
    startButton.append(picker)
    startButton.append(browserBanner)

    startButton.addEventListener('click', handleStartButtonClick, { capture: true })
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
    state.edgeLinesVisible = true
    state.xrayVisible = false
    state.bodyArtifactIds = []
    state.pendingBodyArtifactIds = []
    state.materialByObjectId = {}
    state.pendingMaterialByObjectId = {}
    state.solidObjectIds = []
    state.pendingSolidObjectIdsRequestId = ''
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
    render()
  }

  const handleXrayToggle = () => {
    if (!state.executor) {
      return
    }
    state.xrayVisible = !state.xrayVisible
    applyXrayAppearance()
    render()
  }

  mountWebView()
  deps.document.addEventListener('visibilitychange', handleVisibilityChange)
  edgesButton.addEventListener('click', handleEdgesToggle)
  xrayButton.addEventListener('click', handleXrayToggle)
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
      unmountWebView()
      tokenInput.removeEventListener('focus', handleTokenFocus)
      tokenInput.removeEventListener('beforeinput', handleTokenBeforeInput)
      tokenInput.removeEventListener('paste', handleTokenPaste)
      deps.document.removeEventListener('visibilitychange', handleVisibilityChange)
      edgesButton.removeEventListener('click', handleEdgesToggle)
      xrayButton.removeEventListener('click', handleXrayToggle)
      disconnectButton.removeEventListener('click', handleDisconnect)
    },
  }
}

const root = document.getElementById('app')

if (root) {
  createApp(root)
}
