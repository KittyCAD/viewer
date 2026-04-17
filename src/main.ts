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
            <button type="button" data-reset-view aria-label="Reset view"></button>
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
  `

  const tokenInput = root.querySelector<HTMLInputElement>('[data-token-input]')!
  const sourceValue = root.querySelector<HTMLElement>('[data-source]')!
  const statusValue = root.querySelector<HTMLElement>('[data-status]')!
  const resetViewButton = root.querySelector<HTMLButtonElement>('[data-reset-view]')!
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
    explodeMenuVisible: boolean
    explodeMode: ExplodeMode | null
    explodeSpacing: number
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
    edgeLinesVisible: true,
    xrayVisible: false,
    explodeMenuVisible: false,
    explodeMode: null,
    explodeSpacing: 10,
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
  const resetViewRequest = () =>
    JSON.stringify({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'default_camera_look_at',
            center: { x: 0, y: 0, z: 0 },
            vantage: { x: 0, y: -128, z: 64 },
            up: { x: 0, y: 0, z: 1 },
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
  const executeInput = async (input: string | Map<string, string>) => {
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
  let scenePointerDown: { x: number; y: number; pointerId: number } | null = null

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
    resetViewButton,
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
    resetViewButton.hidden = status !== 'connected'
    resetViewButton.title = 'Reset view'
    resetViewButton.setAttribute('aria-label', 'Reset view')
    resetViewButton.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="1.6" fill="currentColor"/><path d="M10 3.5v3M10 13.5v3M3.5 10h3M13.5 10h3M5.7 5.7l2.1 2.1M12.2 12.2l2.1 2.1M14.3 5.7l-2.1 2.1M7.8 12.2l-2.1 2.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/></svg>'
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

  const handleResetView = () => {
    if (!state.executor) {
      return
    }
    state.webView?.rtc?.send?.(resetViewRequest())
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
    render()
  }

  const handleVerticalExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'vertical' ? null : 'vertical'
    applyExplodedView()
    render()
  }

  const handleRadialExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'radial' ? null : 'radial'
    applyExplodedView()
    render()
  }

  const handleGridExplodeToggle = () => {
    if (!state.executor) {
      return
    }
    state.explodeMenuVisible = true
    state.explodeMode = state.explodeMode === 'grid' ? null : 'grid'
    applyExplodedView()
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
    }
    render()
  }

  mountWebView()
  deps.document.addEventListener('visibilitychange', handleVisibilityChange)
  resetViewButton.addEventListener('click', handleResetView)
  edgesButton.addEventListener('click', handleEdgesToggle)
  xrayButton.addEventListener('click', handleXrayToggle)
  explodeButton.addEventListener('click', handleExplodeToggle)
  explodeHorizontalButton.addEventListener('click', handleHorizontalExplodeToggle)
  explodeVerticalButton.addEventListener('click', handleVerticalExplodeToggle)
  explodeRadialButton.addEventListener('click', handleRadialExplodeToggle)
  explodeGridButton.addEventListener('click', handleGridExplodeToggle)
  explodeSpacingInput.addEventListener('input', handleExplodeSpacingInput)
  explodeSpacingInput.addEventListener('change', handleExplodeSpacingChange)
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
      resetViewButton.removeEventListener('click', handleResetView)
      edgesButton.removeEventListener('click', handleEdgesToggle)
      xrayButton.removeEventListener('click', handleXrayToggle)
      explodeButton.removeEventListener('click', handleExplodeToggle)
      explodeHorizontalButton.removeEventListener('click', handleHorizontalExplodeToggle)
      explodeVerticalButton.removeEventListener('click', handleVerticalExplodeToggle)
      explodeRadialButton.removeEventListener('click', handleRadialExplodeToggle)
      explodeGridButton.removeEventListener('click', handleGridExplodeToggle)
      explodeSpacingInput.removeEventListener('input', handleExplodeSpacingInput)
      explodeSpacingInput.removeEventListener('change', handleExplodeSpacingChange)
      disconnectButton.removeEventListener('click', handleDisconnect)
    },
  }
}

const root = document.getElementById('app')

if (root) {
  createApp(root)
}
