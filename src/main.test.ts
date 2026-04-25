import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  initSync as initKclWasm,
  parse_wasm as parseWasmForTest,
  recast_wasm as recastWasmForTest,
} from '@kittycad/kcl-wasm-lib/kcl_wasm_lib.js'
import { createApp } from './main'

type FakeFileHandle = {
  kind: 'file'
  name: string
  getFile: () => Promise<{ lastModified: number; size: number; text: () => Promise<string> }>
  createWritable?: () => Promise<{
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
    ) => Promise<void>
    close: () => Promise<void>
  }>
}

type FakeDirectoryHandle = {
  kind: 'directory'
  name: string
  entries: () => AsyncGenerator<[string, FakeFileHandle | FakeDirectoryHandle], void, void>
  getFileHandle?: (
    name: string,
    options?: { create?: boolean },
  ) => Promise<FakeFileHandle>
}

function deferred() {
  let resolve = (_value?: unknown) => {}
  const promise = new Promise<unknown>(nextResolve => {
    resolve = nextResolve
  })
  return { promise, resolve }
}

initKclWasm({
  module: readFileSync('node_modules/@kittycad/kcl-wasm-lib/kcl_wasm_lib_bg.wasm'),
})

async function flushMicrotasks(count = 10) {
  for (let index = 0; index < count; index += 1) {
    await Promise.resolve()
  }
}

function createStubWebView(
  submit: (
    input: string | Map<string, string>,
    options?: { mainKclPathName?: string },
  ) => Promise<unknown>,
) {
  const el = document.createElement('div')
  const video = document.createElement('video')
  Object.defineProperty(video, 'pause', {
    value: vi.fn(),
    configurable: true,
  })
  Object.defineProperty(video, 'play', {
    value: vi.fn(async () => undefined),
    configurable: true,
  })
  const start = document.createElement('div')
  start.className = 'start'
  el.append(video)
  el.append(start)
  const executorTarget = new EventTarget()
  const executor = {
    addEventListener: executorTarget.addEventListener.bind(executorTarget, 'message'),
    removeEventListener: executorTarget.removeEventListener.bind(executorTarget, 'message'),
    dispatchEvent: executorTarget.dispatchEvent.bind(executorTarget),
    submit,
  }
  const rtcTarget = new EventTarget() as EventTarget & {
    executor: () => typeof executor
    send: ReturnType<typeof vi.fn>
    wasm: ReturnType<typeof vi.fn>
  }
  rtcTarget.executor = () => executor
  rtcTarget.send = vi.fn(async () => undefined)
  rtcTarget.wasm = vi.fn(async () => undefined)
  const webView = new EventTarget() as EventTarget & {
    el: HTMLElement
    rtc?: typeof rtcTarget
  }
  webView.el = el
  webView.rtc = rtcTarget
  return webView
}

function createTrackedWebView(submit: (input: string | Map<string, string>) => Promise<unknown>) {
  const webView = createStubWebView(submit) as ReturnType<typeof createStubWebView> & {
    deconstructor: ReturnType<typeof vi.fn>
  }
  webView.deconstructor = vi.fn(async () => undefined)
  return webView
}

function setToken(input: HTMLInputElement, token: string) {
  input.focus()
  input.setSelectionRange(0, input.value.length)
  input.dispatchEvent(
    new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      data: token,
      inputType: 'insertText',
    }),
  )
}

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    storage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value)
      },
      removeItem: (key: string) => {
        values.delete(key)
      },
    },
    values,
  }
}

function createMutableFileHandle(name: string, initialText = '', initialModified = 1) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  let bytes = encoder.encode(initialText)
  let lastModified = initialModified
  const toBytes = async (value: string | Blob | BufferSource) => {
    if (typeof value === 'string') {
      return encoder.encode(value)
    }
    if (value instanceof Blob) {
      return new Uint8Array(await value.arrayBuffer())
    }
    if (value instanceof ArrayBuffer) {
      return new Uint8Array(value.slice(0))
    }
    if (ArrayBuffer.isView(value)) {
      return new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength))
    }
    return encoder.encode(String(value))
  }
  return {
    kind: 'file' as const,
    name,
    getFile: async () => ({
      lastModified,
      size: bytes.byteLength,
      text: async () => decoder.decode(bytes),
    }),
    createWritable: async () => ({
      write: async next => {
        if (
          next &&
          typeof next === 'object' &&
          'type' in next &&
          next.type === 'write'
        ) {
          const chunk = await toBytes(next.data)
          const position = Math.max(0, next.position)
          const length = Math.max(bytes.byteLength, position + chunk.byteLength)
          const merged = new Uint8Array(length)
          merged.set(bytes)
          merged.set(chunk, position)
          bytes = merged
        } else {
          bytes = await toBytes(next)
        }
        lastModified += 1
      },
      close: async () => undefined,
    }),
    readText: () => decoder.decode(bytes),
    readBytes: () => bytes,
    setText: (next: string) => {
      bytes = encoder.encode(next)
      lastModified += 1
    },
  }
}

function createMutableDirectoryHandle(name: string, initialFiles: Record<string, string>) {
  const files = new Map(
    Object.entries(initialFiles).map(([fileName, text], index) => [
      fileName,
      createMutableFileHandle(fileName, text, index + 1),
    ]),
  )
  return {
    kind: 'directory' as const,
    name,
    files,
    entries: async function* () {
      for (const [fileName, handle] of files) {
        yield [fileName, handle]
      }
    },
    getFileHandle: async (fileName: string, options?: { create?: boolean }) => {
      const existing = files.get(fileName)
      if (existing) {
        return existing
      }
      if (!options?.create) {
        throw new DOMException('missing', 'NotFoundError')
      }
      const next = createMutableFileHandle(fileName, '', files.size + 1)
      files.set(fileName, next)
      return next
    },
  }
}

describe('createApp', () => {
  const mounted: Array<ReturnType<typeof createApp>> = []

  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = '<div id="app"></div>'
  })

  afterEach(() => {
    for (const app of mounted.splice(0)) {
      app.destroy()
    }
    vi.useRealTimers()
  })

  it('focuses the token input when the web view Zoo logo is clicked without one', () => {
    const { storage } = createStorage()
    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()

    expect(document.activeElement).toBe(app.elements.tokenInput)
    expect(app.state.token).toBe('')
    expect(app.elements.picker.hidden).toBe(false)
  })

  it('shows a browser recommendation banner outside Google Chrome', () => {
    const { storage } = createStorage()
    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Version/17.4 Safari/605.1.15',
        vendor: 'Apple Computer, Inc.',
      },
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.browserBanner.hidden).toBe(false)
    expect(app.elements.browserBanner.textContent).toContain(
      'Live reloading only available in',
    )
    expect(
      app.elements.browserBanner.querySelector<HTMLAnchorElement>('.browser-banner-link')?.href,
    ).toBe('https://www.google.com/chrome/')
    expect(
      app.elements.browserBanner.querySelectorAll('.browser-banner-option .browser-banner-icon img')
        .length,
    ).toBe(2)
    expect(
      app.elements.browserBanner.querySelector<HTMLImageElement>(
        '.browser-banner-link img',
      )?.getAttribute('src'),
    ).toBe('./chrome.svg')
  })

  it('hides the Chrome download banner in Google Chrome', () => {
    const { storage } = createStorage()
    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        vendor: 'Google Inc.',
      },
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.browserBanner.hidden).toBe(true)
  })

  it('hides the Chrome download banner in Microsoft Edge', () => {
    const { storage } = createStorage()
    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
        vendor: 'Google Inc.',
      },
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.browserBanner.hidden).toBe(true)
  })

  it('does not connect before a file or directory is selected', () => {
    const { storage } = createStorage()
    const webView = createTrackedWebView(async () => undefined)
    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: element =>
        element.classList.contains('snapshot-frame')
          ? { width: 160, height: 220 }
          : { width: 640, height: 360 },
      storage,
    })
    mounted.push(app)
    const startDispatch = vi.spyOn(app.elements.startButton, 'dispatchEvent')

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.startButton.click()

    expect(startDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }))
    expect(app.state.executor).toBeNull()
  })

  it('uses the zoo.dev account auth check and hides the token input', async () => {
    const { storage } = createStorage({
      'zoo-api-token': 'api-token-should-not-be-used',
    })
    const createClient = vi.fn((token: string) => ({ token }))
    const fetch = vi.fn(async () => ({ ok: true, status: 200, headers: new Headers() }))

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      fetch,
      createClient,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'app.zoo.dev', href: 'https://app.zoo.dev/model' },
      storage,
    })
    mounted.push(app)

    await Promise.resolve()
    await Promise.resolve()

    expect(createClient).toHaveBeenCalledWith('')
    expect(fetch).toHaveBeenCalledWith('https://zoo.dev/account', {
      method: 'GET',
      credentials: 'include',
      redirect: 'manual',
    })
    expect(app.state.token).toBe('')
    expect(app.elements.tokenInput.hidden).toBe(true)
  })

  it('does not redirect zoo.dev users when the account check has no location header', async () => {
    const { storage } = createStorage()
    const redirectToLogin = vi.fn()
    const fetch = vi.fn(async () => ({ ok: true, status: 200, headers: new Headers() }))

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      fetch,
      redirectToLogin,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'zoo.dev', href: 'https://zoo.dev/viewer' },
      storage,
    })
    mounted.push(app)

    await Promise.resolve()
    await Promise.resolve()

    expect(redirectToLogin).not.toHaveBeenCalled()
  })

  it('redirects zoo.dev users to sign in when the account check returns a location header', async () => {
    const { storage } = createStorage()
    const redirectToLogin = vi.fn()
    const headers = new Headers()
    headers.set('location', 'https://zoo.dev/somewhere-else')
    const fetch = vi.fn(async () => ({ ok: false, status: 302, headers }))

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      fetch,
      redirectToLogin,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'zoo.dev', href: 'https://zoo.dev/viewer' },
      storage,
    })
    mounted.push(app)

    await Promise.resolve()
    await Promise.resolve()

    expect(redirectToLogin).toHaveBeenCalledWith(
      'https://zoo.dev/signin?callbackUrl=https%3A%2F%2Fzoo.dev%2Fviewer',
    )
  })

  it('returns token-auth users to the launcher on websocket auth failure', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => undefined)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: false,
              errors: [
                {
                  error_code: 'auth_token_invalid',
                  message: 'Auth token invalid',
                },
              ],
            }),
          },
        },
      }),
    )

    expect(app.state.source).toBe(null)
    expect(app.elements.browserBanner.textContent).toContain(
      'Authentication failed. Paste a valid Zoo API token to reconnect.',
    )
  })

  it('asks for a KCL file and associates it with the web view instance', async () => {
    const { storage, values } = createStorage()
    let modified = 1
    let text = 'cube = 1'
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: modified,
        text: async () => text,
      }),
    }
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)
    const createWebView = vi.fn(() => webView)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()
    setToken(app.elements.tokenInput, 'api-token-123456789012')
    expect(values.get('zoo-api-token')).toBe('api-token-123456789012')
    expect(app.elements.tokenInput.value).toBe('api-toke**************')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.source?.label).toBe('main.kcl')
    expect(app.elements.picker.style.opacity).toBe('0')
    expect(createWebView).toHaveBeenCalledWith({
      zooClient: expect.anything(),
      size: { width: 640, height: 360 },
    })

    app.state.webView?.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(submit).toHaveBeenCalledWith(new Map([['main.kcl', text]]), {
      mainKclPathName: 'main.kcl',
    })
    expect(webView.rtc?.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"zoom_to_fit"'),
    )

    modified = 2
    text = 'cube = 2'
    await vi.advanceTimersByTimeAsync(1000)

    expect(submit).toHaveBeenCalledTimes(2)
  })

  it('starts a poller after the web view connects', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => undefined)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: element =>
        element.classList.contains('snapshot-frame')
          ? { width: 160, height: 220 }
          : { width: 640, height: 360 },
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()
    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))

    expect(app.state.pollTimer).not.toBe(0)
  })

  it('resets to the launcher when a previously selected file disappears during polling', async () => {
    const { storage } = createStorage()
    let missing = false
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => {
        if (missing) {
          throw new DOMException('missing', 'NotFoundError')
        }
        return {
          lastModified: 1,
          text: async () => 'cube = 1',
        }
      },
    }
    const submit = vi.fn(async () => undefined)
    const webView = createTrackedWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    missing = true
    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(app.state.source).toBeNull()
    expect(app.state.disconnectMessage).toContain('could not be found')
    expect(app.state.pollTimer).toBe(0)
  })

  it('uses the selected file name as the execute entrypoint for single-file sources', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'widget.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(submit).toHaveBeenCalledWith(new Map([['widget.kcl', 'cube = 1']]), {
      mainKclPathName: 'widget.kcl',
    })
  })

  it('updates top, profile, and front snapshots after execution changes', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['solid-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )

    await vi.advanceTimersByTimeAsync(150)

    const getViewCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"default_camera_get_view"'),
    )?.[0]
    expect(getViewCall).toBeTruthy()

    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(getViewCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'default_camera_get_view',
                    data: {
                      view: {
                        eye_offset: 0,
                        fov_y: 45,
                        is_ortho: false,
                        ortho_scale_enabled: false,
                        ortho_scale_factor: 1,
                        pivot_position: { x: 0, y: 0, z: 0 },
                        pivot_rotation: { x: 0, y: 0, z: 0, w: 1 },
                        world_coord_system: {
                          forward: { axis: 'y', direction: 'positive' },
                          up: { axis: 'z', direction: 'positive' },
                        },
                      },
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    const video = webView.el.querySelector('video') as HTMLVideoElement & {
      pause: ReturnType<typeof vi.fn>
      play: ReturnType<typeof vi.fn>
    }
    expect(video.pause).toHaveBeenCalled()

    const snapshotResizeCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"reconfigure_stream"'),
    )?.[0]
    expect(snapshotResizeCall).toBeTruthy()
    const snapshotResizeCommand = JSON.parse(String(snapshotResizeCall)).cmd
    expect(snapshotResizeCommand.type).toBe('reconfigure_stream')
    expect(snapshotResizeCommand.fps).toBe(30)
    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(snapshotResizeCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'reconfigure_stream',
                    data: {
                      width: snapshotResizeCommand.width,
                      height: snapshotResizeCommand.height,
                      fps: 30,
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()

    for (const step of [
      {
        lookAt: (message: string) =>
          message.includes('"type":"default_camera_look_at"') && message.includes('"z":128'),
        snapshot: ' data:image/png;base64,dG9w ',
      },
      {
        lookAt: (message: string) =>
          message.includes('"type":"default_camera_look_at"') && message.includes('"x":128'),
        snapshot: 'cHJvZmlsZQ==',
      },
      {
        lookAt: (message: string) =>
          message.includes('"type":"default_camera_look_at"') && message.includes('"y":-128'),
        snapshot: 'ZnJvbnQ',
      },
    ]) {
      const lookAtCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
        ([message]) => step.lookAt(String(message)),
      )?.[0]
      expect(lookAtCall).toBeTruthy()
      webView.rtc?.executor().dispatchEvent(
        new MessageEvent('message', {
          data: {
            from: 'websocket',
            payload: {
              type: 'message',
              data: JSON.stringify({
                success: true,
                request_id: JSON.parse(String(lookAtCall)).cmd_id,
                resp: {
                  type: 'modeling',
                  data: {
                    modeling_response: {
                      type: 'default_camera_look_at',
                      data: {},
                    },
                  },
                },
              }),
            },
          },
        }),
      )
      await Promise.resolve()

      const zoomCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
        ([message]) =>
          String(message).includes('"type":"zoom_to_fit"') &&
          !String(message).includes('"clicked-solid"'),
      )?.[0]
      expect(zoomCall).toBeTruthy()
      expect(JSON.parse(String(zoomCall)).cmd.padding).toBe(-0.1)
      webView.rtc?.executor().dispatchEvent(
        new MessageEvent('message', {
          data: {
            from: 'websocket',
            payload: {
              type: 'message',
              data: JSON.stringify({
                success: true,
                request_id: JSON.parse(String(zoomCall)).cmd_id,
                resp: {
                  type: 'modeling',
                  data: {
                    modeling_response: {
                      type: 'zoom_to_fit',
                      data: {},
                    },
                  },
                },
              }),
            },
          },
        }),
      )
      await Promise.resolve()

      const snapshotCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
        ([message]) => String(message).includes('"type":"take_snapshot"'),
      )?.[0]
      expect(snapshotCall).toBeTruthy()
      webView.rtc?.executor().dispatchEvent(
        new MessageEvent('message', {
          data: {
            from: 'websocket',
            payload: {
              type: 'message',
              data: JSON.stringify({
                success: true,
                request_id: JSON.parse(String(snapshotCall)).cmd_id,
                resp: {
                  type: 'modeling',
                  data: {
                    modeling_response: {
                      type: 'take_snapshot',
                      data: {
                        contents: step.snapshot,
                      },
                    },
                  },
                },
              }),
            },
          },
        }),
      )
      await Promise.resolve()
    }

    const restoreViewCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"default_camera_set_view"'),
    )?.[0]
    expect(restoreViewCall).toBeTruthy()
    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(restoreViewCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'default_camera_set_view',
                    data: {},
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()

    const restoreResizeCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"reconfigure_stream"') &&
        String(message).includes('"width":640') &&
        String(message).includes('"height":360'),
    )?.[0]
    expect(restoreResizeCall).toBeTruthy()
    webView.rtc?.executor().dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(restoreResizeCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'reconfigure_stream',
                    data: {
                      width: 640,
                      height: 360,
                      fps: 30,
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()

    expect(app.elements.snapshotRail.hidden).toBe(false)
    expect(app.elements.viewer.contains(app.elements.snapshotRail)).toBe(false)
    expect(app.elements.snapshotImages.top.src).toContain('data:image/png;base64,dG9w')
    expect(app.elements.snapshotImages.profile.src).toContain(
      'data:image/png;base64,cHJvZmlsZQ==',
    )
    expect(app.elements.snapshotImages.front.src).toContain('data:image/png;base64,ZnJvbnQ=')
    expect(video.play).toHaveBeenCalled()
  })

  it('stalls the poller while a render is running', async () => {
    const { storage } = createStorage()
    const run = deferred()
    let modified = 1
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: modified,
        text: async () => 'cube = 1',
      }),
    }
    const submit = vi.fn(() => run.promise)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()
    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(submit).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)

    modified = 2
    await vi.advanceTimersByTimeAsync(1000)

    expect(submit).toHaveBeenCalledTimes(1)

    run.resolve(undefined)
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    expect(vi.getTimerCount()).toBe(1)
  })

  it('restarts polling when the tab returns to the foreground', async () => {
    const { storage } = createStorage()
    let hidden = false
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => hidden,
    })

    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => undefined)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      document,
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()
    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))

    expect(app.state.pollTimer).not.toBe(0)

    hidden = true
    document.dispatchEvent(new Event('visibilitychange'))
    expect(app.state.pollTimer).toBe(0)

    hidden = false
    document.dispatchEvent(new Event('visibilitychange'))
    expect(app.state.pollTimer).not.toBe(0)
  })

  it('orients the main view when a snapshot is clicked', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => undefined)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    app.elements.snapshotCards.profile.click()

    const request = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"modeling_cmd_batch_req"') &&
        String(message).includes('"type":"default_camera_look_at"') &&
        String(message).includes('"type":"zoom_to_fit"'),
    )?.[0]

    expect(request).toBeTruthy()
    const parsed = JSON.parse(String(request))
    expect(parsed.requests[0].cmd).toMatchObject({
      type: 'default_camera_look_at',
      vantage: { x: 128, y: 0, z: 0 },
      up: { x: 0, y: 0, z: 1 },
    })
    expect(parsed.requests[1].cmd).toMatchObject({
      type: 'zoom_to_fit',
      object_ids: [],
      padding: 0.1,
    })
  })

  it('shows a disconnect button only after connection and tears down on click', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const firstWebView = createTrackedWebView(async () => undefined)
    const secondWebView = createTrackedWebView(async () => undefined)
    const createWebView = vi.fn()
    createWebView.mockReturnValueOnce(firstWebView)
    createWebView.mockReturnValueOnce(secondWebView)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.disconnectButton.hidden).toBe(true)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    firstWebView.dispatchEvent(new Event('ready'))

    expect(app.elements.disconnectButton.hidden).toBe(false)

    app.elements.disconnectButton.click()

    expect(firstWebView.deconstructor).toHaveBeenCalled()
    expect(app.state.executor).toBeNull()
    expect(app.state.source).toBeNull()
    expect(app.elements.disconnectButton.hidden).toBe(true)
    expect(app.elements.picker.style.opacity).toBe('1')
    expect(app.elements.startButton.style.width).toBe('224px')
  })

  it('returns to the launcher with a disconnect banner when rtc closes', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const firstWebView = createTrackedWebView(async () => undefined)
    const secondWebView = createTrackedWebView(async () => undefined)
    const createWebView = vi.fn()
    createWebView.mockReturnValueOnce(firstWebView)
    createWebView.mockReturnValueOnce(secondWebView)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    firstWebView.dispatchEvent(new Event('ready'))

    firstWebView.rtc?.dispatchEvent(new Event('close'))
    await Promise.resolve()

    expect(firstWebView.deconstructor).toHaveBeenCalled()
    expect(app.state.source).toBeNull()
    expect(app.state.executor).toBeNull()
    expect(app.elements.picker.style.opacity).toBe('1')
    expect(app.elements.browserBanner.hidden).toBe(false)
    expect(app.elements.browserBanner.textContent).toContain(
      'Disconnected from Zoo. Choose a file, project, or clipboard contents to reconnect.',
    )
  })

  it('shows an edge toggle only when connected and sends edge visibility commands', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const webView = createStubWebView(async () => undefined)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.edgesButton.hidden).toBe(true)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))

    expect(app.elements.edgesButton.hidden).toBe(false)
    expect(app.elements.edgesButton.dataset.active).toBe('true')

    app.elements.edgesButton.click()

    expect(app.elements.edgesButton.dataset.active).toBe('false')
    expect(webView.rtc?.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"edge_lines_visible"'),
    )
    expect(webView.rtc?.send).toHaveBeenCalledWith(expect.stringContaining('"hidden":true'))
  })

  it('shows an xray toggle only when connected and preserves tracked material that arrives after execution resolves', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.xrayButton.hidden).toBe(true)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['solid-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: 'batch-request-id',
              resp: {
                type: 'modeling_batch',
                data: {
                  responses: {
                    'extrude-solid-1': {
                      response: {
                        type: 'extrude',
                        data: {},
                      },
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: {
              cmd_id: 'material-1',
              cmd: {
                type: 'object_set_material_params_pbr',
                object_id: 'solid-object-1',
                color: { r: 0.2, g: 0.4, b: 0.6, a: 0.7 },
                metalness: 0.8,
                roughness: 0.3,
                ambient_occlusion: 0.1,
              },
            },
          },
        },
      }),
    )

    expect(app.elements.xrayButton.hidden).toBe(false)

    app.elements.xrayButton.click()

    const xrayOnCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_order_independent_transparency"'),
    )?.[0]
    expect(xrayOnCall).toBeTruthy()
    const xrayOnBatch = JSON.parse(String(xrayOnCall)) as {
      requests: Array<{
        cmd: {
          type: string
          enabled?: boolean
          object_id?: string
          color?: { r: number; g: number; b: number; a: number }
          metalness?: number
          roughness?: number
          ambient_occlusion?: number
        }
      }>
    }
    expect(xrayOnBatch.requests[0]?.cmd).toEqual({
      type: 'set_order_independent_transparency',
      enabled: true,
    })
    expect(xrayOnBatch.requests.slice(1).map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'object_set_material_params_pbr',
          object_id: 'solid-object-1',
          color: { r: 0.2, g: 0.4, b: 0.6, a: 0.22 },
          metalness: 0.8,
          roughness: 0.3,
          ambient_occlusion: 0.1,
        },
      },
    ])

    app.elements.xrayButton.click()

    const xrayOffCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"set_order_independent_transparency"') &&
        message !== xrayOnCall,
    )?.[0]
    expect(xrayOffCall).toBeTruthy()
    const xrayOffBatch = JSON.parse(String(xrayOffCall)) as {
      requests: Array<{
        cmd: {
          type: string
          enabled?: boolean
          object_id?: string
          color?: { r: number; g: number; b: number; a: number }
          metalness?: number
          roughness?: number
          ambient_occlusion?: number
        }
      }>
    }
    expect(xrayOffBatch.requests[0]?.cmd).toEqual({
      type: 'set_order_independent_transparency',
      enabled: true,
    })
    expect(xrayOffBatch.requests.slice(1).map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'object_set_material_params_pbr',
          object_id: 'solid-object-1',
          color: { r: 0.2, g: 0.4, b: 0.6, a: 0.7 },
          metalness: 0.8,
          roughness: 0.3,
          ambient_occlusion: 0.1,
        },
      },
    ])
  })

  it('injects diff markers into prefixed entry files instead of only the merged return value', async () => {
    const { storage } = createStorage()
    const baseHandle: FakeFileHandle = {
      kind: 'file',
      name: 'base.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'basePart = 1',
      }),
    }
    const compareHandle: FakeFileHandle = {
      kind: 'file',
      name: 'compare.kcl',
      getFile: async () => ({
        lastModified: 2,
        text: async () => 'comparePart = 2',
      }),
    }
    let submitCount = 0
    const submit = vi.fn(async input => {
      submitCount += 1
      if (submitCount === 1) {
        return {}
      }
      expect(input).toBeInstanceOf(Map)
      const merged = input as Map<string, string>
      expect(merged.get('__codex_base/main.kcl')).toContain('basePart = 1')
      expect(merged.get('__codex_base/main.kcl')).toContain(
        'appearance(basePart, color = "#0000ff")',
      )
      expect(merged.get('__codex_compare/main.kcl')).toContain('comparePart = 2')
      expect(merged.get('__codex_compare/main.kcl')).toContain(
        'appearance(comparePart, color = "#00ff00")',
      )
      expect(merged.get('main.kcl')).toContain('import "__codex_base/main.kcl" as codexBaseModel')
      expect(merged.get('main.kcl')).toContain(
        'import "__codex_compare/main.kcl" as codexCompareModel',
      )
      expect(merged.get('main.kcl')).toContain('codexCompareModel')
      return {}
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi
        .fn(async () => [baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([compareHandle as unknown as FileSystemFileHandle]) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    const executor = webView.rtc?.executor()
    const baseSceneCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(baseSceneCall).toBeTruthy()
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(baseSceneCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['base-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    app.elements.diffButton.click()
    expect(app.state.diffEnabled).toBe(true)
    expect(app.elements.diffFileButton.hidden).toBe(false)
    const diffOnEdgesCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"edge_lines_visible"'),
    )?.[0]
    expect(diffOnEdgesCall).toBeTruthy()
    expect(JSON.parse(String(diffOnEdgesCall)).requests[0]?.cmd).toEqual({
      type: 'edge_lines_visible',
      hidden: true,
    })

    app.elements.diffFileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    expect(submit).toHaveBeenCalledTimes(2)
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: [
              JSON.stringify({
                type: 'modeling_cmd_batch_req',
                requests: [
                  {
                    cmd_id: 'base-material',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'base-object-1',
                      color: { r: 0, g: 0, b: 1, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                  {
                    cmd_id: 'compare-material',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'compare-object-1',
                      color: { r: 0, g: 1, b: 0, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                  {
                    cmd_id: 'compare-transform',
                    cmd: {
                      type: 'set_object_transform',
                      object_id: 'compare-object-2',
                      transforms: [],
                    },
                  },
                ],
              }),
            ],
          },
        },
      }),
    )

    const sceneGetEntityIdsCalls = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"scene_get_entity_ids"'))
    const mergedSceneCall = sceneGetEntityIdsCalls.at(-1)
    expect(mergedSceneCall).toBeTruthy()
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(mergedSceneCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['compare-object-2', 'compare-object-1', 'base-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const diffCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"set_order_independent_transparency"'))
      .map(message => ({ raw: message, parsed: JSON.parse(message) as { requests: Array<{ cmd: { object_id?: string } }> } }))
      .findLast(batch => batch.parsed.requests.length > 2)?.raw
    expect(diffCall).toBeTruthy()
    const diffBatch = JSON.parse(String(diffCall)) as {
      requests: Array<{
        cmd: {
          type: string
          object_id?: string
          enabled?: boolean
          color?: { r: number; g: number; b: number; a: number }
        }
      }>
    }
    expect(diffBatch.requests[0]?.cmd).toEqual({
      type: 'set_order_independent_transparency',
      enabled: true,
    })
    expect(diffBatch.requests.slice(1).map(request => request.cmd)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'object_set_material_params_pbr',
          object_id: 'base-object-1',
          color: { r: 0.92, g: 0.33, b: 0.41, a: 0.18 },
        }),
        expect.objectContaining({
          type: 'object_set_material_params_pbr',
          object_id: 'compare-object-1',
          color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
        }),
        expect.objectContaining({
          type: 'object_set_material_params_pbr',
          object_id: 'compare-object-2',
          color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
        }),
      ]),
    )
    const diffLoadEdgesCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"edge_lines_visible"') &&
        message !== diffOnEdgesCall,
    )?.[0]
    expect(diffLoadEdgesCall).toBeTruthy()
    expect(JSON.parse(String(diffLoadEdgesCall)).requests[0]?.cmd).toEqual({
      type: 'edge_lines_visible',
      hidden: true,
    })

    app.elements.diffButton.click()
    await Promise.resolve()
    const diffOffEdgesCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"edge_lines_visible"') &&
        message !== diffOnEdgesCall,
    )?.[0]
    expect(diffOffEdgesCall).toBeTruthy()
    expect(JSON.parse(String(diffOffEdgesCall)).requests[0]?.cmd).toEqual({
      type: 'edge_lines_visible',
      hidden: false,
    })
  })

  it('uses rtc wasm parsing to insert diff markers before the final returned expression', async () => {
    const { storage } = createStorage()
    const baseHandle: FakeFileHandle = {
      kind: 'file',
      name: 'base.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'import "helper.kcl" as helper\nimport "part.kcl" as part\npart\n',
      }),
    }
    const compareHandle: FakeFileHandle = {
      kind: 'file',
      name: 'compare.kcl',
      getFile: async () => ({
        lastModified: 2,
        text: async () => 'comparePart = extrude(sketch001, length = 5)\ncomparePart\n',
      }),
    }
    let submitCount = 0
    const submit = vi.fn(async input => {
      submitCount += 1
      if (submitCount === 1) {
        return {}
      }
      expect(input).toBeInstanceOf(Map)
      const merged = input as Map<string, string>
      expect(merged.get('__codex_base/main.kcl')).toMatch(
        /import "helper\.kcl" as helper\nimport "part\.kcl" as part\nappearance\(part, color = "#0000ff"\)\npart\s*$/,
      )
      expect(merged.get('__codex_base/main.kcl')).not.toMatch(
        /part\s*\nappearance\(part, color = "#0000ff"\)/,
      )
      expect(merged.get('__codex_compare/main.kcl')).toMatch(
        /comparePart = extrude\(sketch001, length = 5\)\nappearance\(comparePart, color = "#00ff00"\)\ncomparePart\s*$/,
      )
      return {}
    })
    const webView = createStubWebView(submit)
    webView.rtc?.wasm.mockImplementation(async (funcName: string, ...args: unknown[]) => {
      if (funcName === 'parse_wasm') {
        return parseWasmForTest(String(args[0]))
      }
      if (funcName === 'recast_wasm') {
        return recastWasmForTest(String(args[0]))
      }
      return undefined
    })

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi
        .fn(async () => [baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([compareHandle as unknown as FileSystemFileHandle]) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    app.elements.diffButton.click()
    await vi.advanceTimersByTimeAsync(0)
    await flushMicrotasks()
    expect(app.elements.diffFileButton.hidden).toBe(false)
    app.elements.diffFileButton.click()
    await vi.advanceTimersByTimeAsync(0)
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledTimes(2)
    expect(webView.rtc?.wasm).toHaveBeenCalled()
  })

  it('uses the current source against its original snapshot in diff mode', async () => {
    const { storage } = createStorage()
    let fileText = 'basePart = 1'
    let lastModified = 1
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'base.kcl',
      getFile: async () => ({
        lastModified,
        text: async () => fileText,
      }),
    }
    let submitCount = 0
    const submit = vi.fn(async (input, options) => {
      submitCount += 1
      if (submitCount === 1) {
        expect(input).toEqual(new Map([['base.kcl', 'basePart = 1']]))
        expect(options).toEqual({ mainKclPathName: 'base.kcl' })
        return {}
      }
      expect(input).toBeInstanceOf(Map)
      expect(options).toBeUndefined()
      const merged = input as Map<string, string>
      expect(merged.get('__codex_base/main.kcl')).toContain(
        submitCount === 2 ? 'basePart = 2' : 'basePart = 3',
      )
      expect(merged.get('__codex_compare/main.kcl')).toContain('basePart = 1')
      return {}
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)
    const executor = webView.rtc?.executor()

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.originalSourceInput).toEqual(new Map([['base.kcl', 'basePart = 1']]))

    fileText = 'basePart = 2'
    lastModified = 2

    app.elements.diffButton.click()
    expect(app.elements.diffOriginalButton.hidden).toBe(false)
    app.elements.diffOriginalButton.click()
    await Promise.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)
    await flushMicrotasks()
    await vi.advanceTimersByTimeAsync(0)

    expect(submit).toHaveBeenCalledTimes(2)
    expect(app.state.diffCompareSource?.label).toBe('Original base.kcl')
    expect(app.elements.sourceValue.textContent).toBe('base.kcl')
    expect(app.state.pollTimer).not.toBe(0)

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: [
              JSON.stringify({
                type: 'modeling_cmd_batch_req',
                requests: [
                  {
                    cmd_id: 'base-marker',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'current-object-1',
                      color: { r: 0, g: 0, b: 1, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                  {
                    cmd_id: 'compare-marker',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'original-object-1',
                      color: { r: 0, g: 1, b: 0, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                ],
              }),
            ],
          },
        },
      }),
    )
    const diffOriginalSceneCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"scene_get_entity_ids"'))
      .at(-1)
    expect(diffOriginalSceneCall).toBeTruthy()
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(diffOriginalSceneCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['original-object-1', 'current-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const diffOriginalAppearanceCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"set_order_independent_transparency"'))
      .map(message => ({
        raw: message,
        parsed: JSON.parse(message) as { requests: Array<{ cmd: { object_id?: string } }> },
      }))
      .findLast(batch =>
        batch.parsed.requests.some(request => request.cmd.object_id === 'original-object-1'),
      )?.raw
    expect(diffOriginalAppearanceCall).toBeTruthy()
    const diffOriginalBatch = JSON.parse(String(diffOriginalAppearanceCall)) as {
      requests: Array<{
        cmd: {
          object_id?: string
          color?: { r: number; g: number; b: number; a: number }
        }
      }>
    }
    expect(diffOriginalBatch.requests.slice(1).map(request => request.cmd)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          object_id: 'current-object-1',
          color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
        }),
        expect.objectContaining({
          object_id: 'original-object-1',
          color: { r: 0.92, g: 0.33, b: 0.41, a: 0.18 },
        }),
      ]),
    )

    fileText = 'basePart = 3'
    lastModified = 3
    await vi.advanceTimersByTimeAsync(1000)
    await Promise.resolve()
    await Promise.resolve()

    expect(submit).toHaveBeenCalledTimes(3)
  })

  it('only injects diff markers for the returned import alias, not every helper import', async () => {
    const { storage } = createStorage()
    const baseHandle: FakeFileHandle = {
      kind: 'file',
      name: 'base.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'import "helper.kcl" as helper\nimport "part.kcl" as part\npart',
      }),
    }
    const compareHandle: FakeFileHandle = {
      kind: 'file',
      name: 'compare.kcl',
      getFile: async () => ({
        lastModified: 2,
        text: async () => 'import "util.kcl" as util\nimport "model.kcl" as model\nmodel',
      }),
    }
    let submitCount = 0
    const submit = vi.fn(async input => {
      submitCount += 1
      if (submitCount === 1) {
        return {}
      }
      expect(input).toBeInstanceOf(Map)
      const merged = input as Map<string, string>
      expect(merged.get('__codex_base/main.kcl')).toContain(
        'appearance(part, color = "#0000ff")',
      )
      expect(merged.get('__codex_base/main.kcl')).not.toContain(
        'appearance(helper, color = "#0000ff")',
      )
      expect(merged.get('__codex_compare/main.kcl')).toContain(
        'appearance(model, color = "#00ff00")',
      )
      expect(merged.get('__codex_compare/main.kcl')).not.toContain(
        'appearance(util, color = "#00ff00")',
      )
      return {}
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi
        .fn(async () => [baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([compareHandle as unknown as FileSystemFileHandle]) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    app.elements.diffButton.click()
    app.elements.diffFileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    expect(submit).toHaveBeenCalledTimes(2)
  })

  it('extends compare ownership across later scene solids after a single compare marker', async () => {
    const { storage } = createStorage()
    const baseHandle: FakeFileHandle = {
      kind: 'file',
      name: 'base.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'basePart = 1',
      }),
    }
    const compareHandle: FakeFileHandle = {
      kind: 'file',
      name: 'compare.kcl',
      getFile: async () => ({
        lastModified: 2,
        text: async () => 'comparePart = 2',
      }),
    }
    let submitCount = 0
    const submit = vi.fn(async () => {
      submitCount += 1
      return {}
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi
        .fn(async () => [baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([baseHandle as unknown as FileSystemFileHandle])
        .mockResolvedValueOnce([compareHandle as unknown as FileSystemFileHandle]) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    const executor = webView.rtc?.executor()
    const baseSceneCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(baseSceneCall).toBeTruthy()
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(baseSceneCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['base-object-1']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    app.elements.diffButton.click()
    app.elements.diffFileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    expect(submit).toHaveBeenCalledTimes(2)

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: [
              JSON.stringify({
                type: 'modeling_cmd_batch_req',
                requests: [
                  {
                    cmd_id: 'base-material',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'base-object-1',
                      color: { r: 0, g: 0, b: 1, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                  {
                    cmd_id: 'compare-material',
                    cmd: {
                      type: 'object_set_material_params_pbr',
                      object_id: 'compare-object-1',
                      color: { r: 0, g: 1, b: 0, a: 1 },
                      metalness: 0,
                      roughness: 0.2,
                      ambient_occlusion: 0,
                    },
                  },
                ],
              }),
            ],
          },
        },
      }),
    )

    const sceneGetEntityIdsCalls = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"scene_get_entity_ids"'))
    const mergedSceneCall = sceneGetEntityIdsCalls.at(-1)
    expect(mergedSceneCall).toBeTruthy()
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(mergedSceneCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['base-object-1', 'compare-object-1', 'compare-object-2']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const diffCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .map(([message]) => String(message))
      .filter(message => message.includes('"type":"set_order_independent_transparency"'))
      .map(message => ({
        raw: message,
        parsed: JSON.parse(message) as { requests: Array<{ cmd: { object_id?: string } }> },
      }))
      .findLast(batch =>
        batch.parsed.requests.some(request => request.cmd.object_id === 'compare-object-2'),
      )?.raw
    expect(diffCall).toBeTruthy()
    const diffBatch = JSON.parse(String(diffCall)) as {
      requests: Array<{
        cmd: {
          type: string
          object_id?: string
          enabled?: boolean
          color?: { r: number; g: number; b: number; a: number }
        }
      }>
    }
    expect(diffBatch.requests.slice(1).map(request => request.cmd)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          object_id: 'base-object-1',
          color: { r: 0.92, g: 0.33, b: 0.41, a: 0.18 },
        }),
        expect.objectContaining({
          object_id: 'compare-object-1',
          color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
        }),
        expect.objectContaining({
          object_id: 'compare-object-2',
          color: { r: 0.18, g: 0.85, b: 0.42, a: 0.34 },
        }),
      ]),
    )
  })

  it('shows explode mode buttons and restores vertical transforms when toggled off', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.elements.explodeButton.hidden).toBe(true)
    expect(app.elements.explodeHorizontalButton.hidden).toBe(true)
    expect(app.elements.explodeVerticalButton.hidden).toBe(true)
    expect(app.elements.explodeRadialButton.hidden).toBe(true)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: 'batch-request-id',
              resp: {
                type: 'modeling_batch',
                data: {
                  responses: {
                    'body-1': {
                      response: {
                        type: 'extrude',
                        data: {},
                      },
                    },
                    'body-2': {
                      response: {
                        type: 'twist_extrude',
                        data: {},
                      },
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['solid-object-1', 'solid-object-2', 'solid-object-3', 'solid-object-4']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: {
              cmd_id: 'transform-1',
              cmd: {
                type: 'set_object_transform',
                object_id: 'solid-object-1',
                transforms: [
                  {
                    translate: {
                      property: { x: 1, y: 2, z: 3 },
                      set: false,
                      origin: { type: 'local' },
                    },
                  },
                ],
              },
            },
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: {
              cmd_id: 'transform-2',
              cmd: {
                type: 'set_object_transform',
                object_id: 'solid-object-2',
                transforms: [
                  {
                    translate: {
                      property: { x: 4, y: 5, z: 6 },
                      set: false,
                      origin: { type: 'local' },
                    },
                  },
                ],
              },
            },
          },
        },
      }),
    )

    expect(app.elements.explodeButton.hidden).toBe(false)
    expect(app.elements.explodeVerticalButton.hidden).toBe(true)

    app.elements.explodeButton.click()
    expect(app.elements.explodeHorizontalButton.hidden).toBe(false)
    expect(app.elements.explodeVerticalButton.hidden).toBe(false)
    expect(app.elements.explodeRadialButton.hidden).toBe(false)
    expect((webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_object_transform"'),
    )).toBeFalsy()

    app.elements.explodeVerticalButton.click()

    const explodeOnCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_object_transform"'),
    )?.[0]
    expect(explodeOnCall).toBeTruthy()
    const explodeOnBatch = JSON.parse(String(explodeOnCall)) as {
      requests: Array<{
        cmd: {
          type: string
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
              set: boolean
              origin?: { type: string }
            }
          }>
        }
      }>
    }
    expect(explodeOnBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: 15 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-2',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: 5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-3',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: -5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-4',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: -15 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
    ])

    app.elements.explodeVerticalButton.click()

    const explodeOffCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"set_object_transform"') &&
        message !== explodeOnCall,
    )?.[0]
    expect(explodeOffCall).toBeTruthy()
    const explodeOffBatch = JSON.parse(String(explodeOffCall)) as {
      requests: Array<{
        cmd: {
          type: string
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
              set: boolean
              origin?: { type: string }
            }
          }>
        }
      }>
    }
    expect(explodeOffBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: -15 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-2',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: -5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-3',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: 5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-4',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: 15 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
    ])
  })

  it('switches between horizontal and radial explode modes', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: 'batch-request-id',
              resp: {
                type: 'modeling_batch',
                data: {
                  responses: {
                    'body-1': {
                      response: {
                        type: 'extrude',
                        data: {},
                      },
                    },
                    'body-2': {
                      response: {
                        type: 'twist_extrude',
                        data: {},
                      },
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['solid-object-1', 'solid-object-2']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: {
              cmd_id: 'transform-1',
              cmd: {
                type: 'set_object_transform',
                object_id: 'solid-object-1',
                transforms: [
                  {
                    translate: {
                      property: { x: 1, y: 0, z: 0 },
                      set: false,
                      origin: { type: 'local' },
                    },
                  },
                ],
              },
            },
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          to: 'websocket',
          payload: {
            type: 'send',
            data: {
              cmd_id: 'transform-2',
              cmd: {
                type: 'set_object_transform',
                object_id: 'solid-object-2',
                transforms: [
                  {
                    translate: {
                      property: { x: 0, y: 1, z: 0 },
                      set: false,
                      origin: { type: 'local' },
                    },
                  },
                ],
              },
            },
          },
        },
      }),
    )

    app.elements.explodeButton.click()
    app.elements.explodeHorizontalButton.click()

    const horizontalCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_object_transform"'),
    )?.[0]
    expect(horizontalCall).toBeTruthy()
    const horizontalBatch = JSON.parse(String(horizontalCall)) as {
      requests: Array<{
        cmd: {
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
            }
          }>
        }
      }>
    }
    expect(horizontalBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: -5, y: 0, z: 0 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-2',
          transforms: [
            {
              translate: {
                property: { x: 5, y: 0, z: 0 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
    ])

    app.elements.explodeRadialButton.click()

    const radialCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"set_object_transform"') && message !== horizontalCall,
    )?.[0]
    expect(radialCall).toBeTruthy()
    const radialBatch = JSON.parse(String(radialCall)) as {
      requests: Array<{
        cmd: {
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
            }
          }>
        }
      }>
    }
    const radialRequestsByObjectId = Object.fromEntries(
      radialBatch.requests.map(request => [
        String(request.cmd.object_id),
        request.cmd.transforms?.[0]?.translate?.property,
      ]),
    )
    expect(radialRequestsByObjectId['solid-object-1']?.x).toBeCloseTo(12.071067811865476)
    expect(radialRequestsByObjectId['solid-object-1']?.y).toBeCloseTo(-7.0710678118654755)
    expect(radialRequestsByObjectId['solid-object-1']?.z).toBe(0)
    expect(radialRequestsByObjectId['solid-object-2']?.x).toBeCloseTo(-12.071067811865476)
    expect(radialRequestsByObjectId['solid-object-2']?.y).toBeCloseTo(7.0710678118654755)
    expect(radialRequestsByObjectId['solid-object-2']?.z).toBe(0)
  })

  it('zooms to a clicked body after resolving the highlighted entity to its parent object', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)
    webView.el.getBoundingClientRect = () =>
      ({
        left: 10,
        top: 20,
        width: 640,
        height: 360,
        right: 650,
        bottom: 380,
        x: 10,
        y: 20,
        toJSON: () => undefined,
      }) as DOMRect

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    webView.el.dispatchEvent(
      new MouseEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 40,
        clientY: 70,
      }),
    )
    webView.el.dispatchEvent(
      new MouseEvent('pointerup', {
        bubbles: true,
        button: 0,
        clientX: 40,
        clientY: 70,
      }),
    )

    const highlightCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"highlight_set_entity"'),
    )?.[0]
    expect(highlightCall).toBeTruthy()
    expect(JSON.parse(String(highlightCall))).toMatchObject({
      type: 'modeling_cmd_req',
      cmd: {
        type: 'highlight_set_entity',
        selected_at_window: { x: 30, y: 50 },
      },
    })

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(highlightCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'highlight_set_entity',
                    data: {
                      entity_id: 'clicked-face',
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )

    const parentLookupCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"entity_get_parent_id"'),
    )?.[0]
    expect(parentLookupCall).toBeTruthy()
    expect(JSON.parse(String(parentLookupCall))).toMatchObject({
      type: 'modeling_cmd_req',
      cmd: {
        type: 'entity_get_parent_id',
        entity_id: 'clicked-face',
      },
    })

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(parentLookupCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'entity_get_parent_id',
                    data: {
                      entity_id: 'clicked-solid',
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )

    const zoomToFitCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) =>
        String(message).includes('"type":"zoom_to_fit"') &&
        String(message).includes('"clicked-solid"'),
    )?.[0]
    expect(zoomToFitCall).toBeTruthy()
    expect(JSON.parse(String(zoomToFitCall))).toMatchObject({
      type: 'modeling_cmd_batch_req',
      requests: [
        {
          cmd: {
            type: 'zoom_to_fit',
            object_ids: ['clicked-solid'],
            padding: 0,
          },
        },
      ],
    })
  })

  it('lays out grid explode from the first item in a near-square grid', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: 'batch-request-id',
              resp: {
                type: 'modeling_batch',
                data: {
                  responses: {
                    'body-1': { response: { type: 'extrude', data: {} } },
                    'body-2': { response: { type: 'twist_extrude', data: {} } },
                    'body-3': { response: { type: 'revolve', data: {} } },
                    'body-4': { response: { type: 'sweep', data: {} } },
                    'body-5': { response: { type: 'loft', data: {} } },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [
                        [
                          'solid-object-1',
                          'solid-object-2',
                          'solid-object-3',
                          'solid-object-4',
                          'solid-object-5',
                        ],
                      ],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    ;[
      { objectId: 'solid-object-1', property: { x: 1, y: 2, z: 0 } },
      { objectId: 'solid-object-2', property: { x: 4, y: 5, z: 1 } },
      { objectId: 'solid-object-3', property: { x: -3, y: 1, z: 2 } },
      { objectId: 'solid-object-4', property: { x: 0, y: -6, z: 0 } },
      { objectId: 'solid-object-5', property: { x: 2, y: -1, z: -3 } },
    ].forEach(({ objectId, property }, index) => {
      executor?.dispatchEvent(
        new MessageEvent('message', {
          data: {
            to: 'websocket',
            payload: {
              type: 'send',
              data: {
                cmd_id: `transform-${index + 1}`,
                cmd: {
                  type: 'set_object_transform',
                  object_id: objectId,
                  transforms: [
                    {
                      translate: {
                        property,
                        set: false,
                        origin: { type: 'local' },
                      },
                    },
                  ],
                },
              },
            },
          },
        }),
      )
    })

    app.elements.explodeButton.click()
    app.elements.explodeGridButton.click()

    const gridCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_object_transform"'),
    )?.[0]
    expect(gridCall).toBeTruthy()
    const gridBatch = JSON.parse(String(gridCall)) as {
      requests: Array<{
        cmd: {
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
            }
          }>
        }
      }>
    }
    expect(gridBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-2',
          transforms: [
            {
              translate: {
                property: { x: 72, y: -3, z: -1 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-3',
          transforms: [
            {
              translate: {
                property: { x: 154, y: 1, z: -2 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-4',
          transforms: [
            {
              translate: {
                property: { x: 1, y: 83, z: 0 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-5',
          transforms: [
            {
              translate: {
                property: { x: 74, y: 78, z: 3 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
    ])
  })

  it('only reapplies explode spacing after the slider change commits', async () => {
    const { storage } = createStorage()
    const execution = deferred()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'part = extrude(profile001, length = 1)',
      }),
    }
    const webView = createStubWebView(async () => execution.promise)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)

    const executor = webView.rtc?.executor()
    execution.resolve()
    await Promise.resolve()
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(0)

    const sceneGetEntityIdsCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.find(
      ([message]) => String(message).includes('"type":"scene_get_entity_ids"'),
    )?.[0]
    expect(sceneGetEntityIdsCall).toBeTruthy()

    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: 'batch-request-id',
              resp: {
                type: 'modeling_batch',
                data: {
                  responses: {
                    'body-1': {
                      response: {
                        type: 'extrude',
                        data: {},
                      },
                    },
                    'body-2': {
                      response: {
                        type: 'twist_extrude',
                        data: {},
                      },
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )
    executor?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          from: 'websocket',
          payload: {
            type: 'message',
            data: JSON.stringify({
              success: true,
              request_id: JSON.parse(String(sceneGetEntityIdsCall)).cmd_id,
              resp: {
                type: 'modeling',
                data: {
                  modeling_response: {
                    type: 'scene_get_entity_ids',
                    data: {
                      entity_ids: [['solid-object-1', 'solid-object-2']],
                    },
                  },
                },
              },
            }),
          },
        },
      }),
    )

    app.elements.explodeButton.click()
    app.elements.explodeVerticalButton.click()

    const transformCallsBeforeInput = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .filter(([message]) => String(message).includes('"type":"set_object_transform"')).length

    app.elements.explodeSpacingInput.value = '20'
    app.elements.explodeSpacingInput.dispatchEvent(new Event('input', { bubbles: true }))

    const transformCallsAfterInput = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls
      .filter(([message]) => String(message).includes('"type":"set_object_transform"')).length

    expect(app.state.explodeSpacing).toBe(20)
    expect(transformCallsAfterInput).toBe(transformCallsBeforeInput)

    app.elements.explodeSpacingInput.dispatchEvent(new Event('change', { bubbles: true }))

    const committedCall = (webView.rtc?.send as ReturnType<typeof vi.fn>).mock.calls.findLast(
      ([message]) => String(message).includes('"type":"set_object_transform"'),
    )?.[0]
    expect(committedCall).toBeTruthy()
    const committedBatch = JSON.parse(String(committedCall)) as {
      requests: Array<{
        cmd: {
          object_id?: string
          transforms?: Array<{
            translate?: {
              property: { x: number; y: number; z: number }
            }
          }>
        }
      }>
    }
    expect(committedBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: 5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-2',
          transforms: [
            {
              translate: {
                property: { x: 0, y: 0, z: -5 },
                set: false,
                origin: { type: 'local' },
              },
              rotate_rpy: null,
              rotate_angle_axis: null,
              scale: null,
            },
          ],
        },
      },
    ])
  })

  it('shows KCL errors returned by the executor result', async () => {
    const { storage } = createStorage()
    const writeClipboardText = vi.fn(async () => undefined)
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'foo = bar',
      }),
    }
    const submit = vi.fn(async () => ({
      error: {
        kind: 'name',
        details: {
          msg: 'Undefined value `bar`.',
          sourceRanges: [[0, 3, 0]],
        },
      },
      nonFatal: [],
      variables: {},
      filenames: {
        0: { type: 'Local', value: 'main.kcl' },
      },
    }))
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      writeClipboardText,
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    expect(app.elements.kclError.hidden).toBe(false)
    expect(app.elements.kclErrorLabel.textContent).toBe('KCL error')
    expect(app.elements.kclErrorText.textContent).toContain('main.kcl:1:1')
    expect(app.elements.kclErrorText.textContent).toContain('Undefined value `bar`.')

    app.elements.kclError.click()
    expect(writeClipboardText).toHaveBeenCalledWith('main.kcl:1:1')
  })

  it('stores values returned by the executor result', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'answer = 42',
      }),
    }
    const values = {
      answer: {
        type: 'Number',
        value: 42,
      },
    }
    const submit = vi.fn(async () => ({
      errors: [],
      variables: values,
    }))
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.executorValues).toEqual(values)
    expect(app.elements.kclError.hidden).toBe(true)
  })

  it('shows thrown KCL execution failures', async () => {
    const { storage } = createStorage()
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'foo = bar',
      }),
    }
    const submit = vi.fn(async () => {
      throw new Error('Undefined value `bar`.')
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    expect(app.elements.kclError.hidden).toBe(false)
    expect(app.elements.kclErrorText.textContent).toContain('Undefined value `bar`.')
  })

  it('loads another source after disconnect by creating a fresh web view', async () => {
    const { storage } = createStorage()
    let firstText = 'cube = 1'
    let secondText = 'cube = 2'
    const firstHandle: FakeFileHandle = {
      kind: 'file',
      name: 'first.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => firstText,
      }),
    }
    const secondHandle: FakeFileHandle = {
      kind: 'file',
      name: 'second.kcl',
      getFile: async () => ({
        lastModified: 2,
        text: async () => secondText,
      }),
    }
    const firstSubmit = vi.fn(async () => undefined)
    const secondSubmit = vi.fn(async () => undefined)
    const firstWebView = createTrackedWebView(firstSubmit)
    const secondWebView = createTrackedWebView(secondSubmit)
    const createWebView = vi.fn()
    createWebView.mockReturnValueOnce(firstWebView)
    createWebView.mockReturnValueOnce(secondWebView)
    const showOpenFilePicker = vi.fn()
    showOpenFilePicker.mockResolvedValueOnce([firstHandle as unknown as FileSystemFileHandle])
    showOpenFilePicker.mockResolvedValueOnce([secondHandle as unknown as FileSystemFileHandle])

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    firstWebView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(firstSubmit).toHaveBeenCalledWith(new Map([['first.kcl', firstText]]), {
      mainKclPathName: 'first.kcl',
    })

    app.elements.disconnectButton.click()

    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    secondWebView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(secondSubmit).toHaveBeenCalledWith(new Map([['second.kcl', secondText]]), {
      mainKclPathName: 'second.kcl',
    })
    expect(app.state.source?.label).toBe('second.kcl')
  })

  it('loads the token from localStorage on startup', () => {
    const { storage } = createStorage({
      'zoo-api-token': 'api-token-123456789012',
    })

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    expect(app.state.token).toBe('api-token-123456789012')
    expect(app.elements.tokenInput.value).toBe('api-toke**************')
  })

  it('associates a directory source with the app when requested', async () => {
    const { storage } = createStorage()
    const directoryHandle: FakeDirectoryHandle = {
      kind: 'directory',
      name: 'project',
      entries: async function* () {
        yield [
          'main.kcl',
          {
            kind: 'file',
            name: 'main.kcl',
            getFile: async () => ({
              lastModified: 1,
              text: async () => 'cube = 1',
            }),
          },
        ]
      },
    }

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    app.elements.startButton.click()
    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.source?.kind).toBe('directory')
    expect(app.state.source?.label).toBe('project')
  })

  it('uses a regular file input outside Chrome and Edge', async () => {
    const { storage } = createStorage()
    const showOpenFilePicker = vi.fn(async () => {
      throw new Error('should not use File Access API')
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Version/17.4 Safari/605.1.15',
        vendor: 'Apple Computer, Inc.',
      },
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    const regularFileInput = document
      .getElementById('app')!
      .querySelector<HTMLInputElement>('[data-regular-file-input]')!
    const file = new File(['cube = 1'], 'widget.kcl', {
      type: 'text/plain',
      lastModified: 7,
    })
    vi.spyOn(regularFileInput, 'click').mockImplementation(() => {
      Object.defineProperty(regularFileInput, 'files', {
        configurable: true,
        value: [file],
      })
      regularFileInput.dispatchEvent(new Event('change'))
    })

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.fileButton.click()
    await flushMicrotasks()

    expect(showOpenFilePicker).not.toHaveBeenCalled()
    expect(app.state.source?.kind).toBe('browser-file')
    expect(app.state.source?.label).toBe('widget.kcl')

    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledWith(new Map([['widget.kcl', 'cube = 1']]), {
      mainKclPathName: 'widget.kcl',
    })
    expect(app.state.pollTimer).toBe(0)
  })

  it('uses a regular directory input outside Chrome and Edge', async () => {
    const { storage } = createStorage()
    const showDirectoryPicker = vi.fn(async () => {
      throw new Error('should not use File Access API')
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: showDirectoryPicker as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      navigator: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:137.0) Gecko/20100101 Firefox/137.0',
        vendor: '',
      },
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    const regularDirectoryInput = document
      .getElementById('app')!
      .querySelector<HTMLInputElement>('[data-regular-directory-input]')!
    const mainFile = new File(['cube = 1'], 'main.kcl', {
      type: 'text/plain',
      lastModified: 4,
    })
    const nestedFile = new File(['part = 2'], 'part.kcl', {
      type: 'text/plain',
      lastModified: 6,
    })
    Object.defineProperty(mainFile, 'webkitRelativePath', {
      configurable: true,
      value: 'project/main.kcl',
    })
    Object.defineProperty(nestedFile, 'webkitRelativePath', {
      configurable: true,
      value: 'project/lib/part.kcl',
    })
    vi.spyOn(regularDirectoryInput, 'click').mockImplementation(() => {
      Object.defineProperty(regularDirectoryInput, 'files', {
        configurable: true,
        value: [mainFile, nestedFile],
      })
      regularDirectoryInput.dispatchEvent(new Event('change'))
    })

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()

    expect(showDirectoryPicker).not.toHaveBeenCalled()
    expect(app.state.source?.kind).toBe('browser-directory')
    expect(app.state.source?.label).toBe('project')

    webView.dispatchEvent(new Event('ready'))
    await vi.advanceTimersByTimeAsync(0)
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledWith(
      new Map([
        ['main.kcl', 'cube = 1'],
        ['lib/part.kcl', 'part = 2'],
      ]),
      undefined,
    )
    expect(app.state.pollTimer).toBe(0)
  })

  it('sends websocket.pipe contents and writes the returned response back to websocket.pipe', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'websocket.pipe': '',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)
    webView.rtc!.send.mockImplementation(async (message: string) =>
      message === '{"type":"ping"}' ? '{"ok":true}' : undefined,
    )

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    directoryHandle.files.get('websocket.pipe')?.setText('{"type":"ping"}')

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(webView.rtc?.send).toHaveBeenCalledWith('{"type":"ping"}')
    expect(directoryHandle.files.get('websocket.pipe')?.readText()).toBe('{"ok":true}')
  })

  it('writes nested binary websocket responses directly to websocket.pipe', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'websocket.pipe': '',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)
    const binary = Uint8Array.from([1, 2, 3, 4])
    webView.rtc!.send.mockImplementation(async (message: string) =>
      message === '{"type":"binary"}' ? { data: binary } : undefined,
    )

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    directoryHandle.files.get('websocket.pipe')?.setText('{"type":"binary"}')

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(webView.rtc?.send).toHaveBeenCalledWith('{"type":"binary"}')
    expect([...((directoryHandle.files.get('websocket.pipe') as ReturnType<typeof createMutableFileHandle>).readBytes())]).toEqual([1, 2, 3, 4])
  })

  it('appends websocket pipe errors to errors.log when it exists', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'websocket.pipe': '',
      'errors.log': '',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)
    webView.rtc!.send.mockRejectedValue(new Error('Pipe failed'))

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    directoryHandle.files.get('websocket.pipe')?.setText('{"type":"ping"}')

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(directoryHandle.files.get('errors.log')?.readText()).toContain('Pipe failed')
  })

  it('does not create websocket.pipe unless it already exists', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(directoryHandle.files.has('websocket.pipe')).toBe(false)
  })

  it('appends execution errors to errors.log when it exists', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'errors.log': '',
    })
    const submit = vi.fn(async () => {
      throw new Error('Render exploded')
    })
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(directoryHandle.files.get('errors.log')?.readText()).toContain('Render exploded')
  })

  it('binds getFileHandle to the directory handle when websocket.pipe is missing', async () => {
    const { storage } = createStorage()
    const baseDirectoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
    })
    const directoryHandle: FakeDirectoryHandle = {
      ...baseDirectoryHandle,
      getFileHandle: async function (
        this: FakeDirectoryHandle,
        fileName: string,
        options?: { create?: boolean },
      ) {
        if (this !== directoryHandle) {
          throw new TypeError('Illegal invocation')
        }
        return baseDirectoryHandle.getFileHandle!(fileName, options)
      },
    }
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    expect(directoryHandle.files.has('websocket.pipe')).toBe(false)
  })

  it('does not re-send its own websocket.pipe response on the next poll', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'websocket.pipe': '',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)
    webView.rtc!.send.mockResolvedValue('{"ok":true}')

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    directoryHandle.files.get('websocket.pipe')?.setText('{"type":"ping"}')

    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()
    const pipeSendCallsAfterFirstPoll = webView.rtc!.send.mock.calls.filter(
      ([message]) => message === '{"type":"ping"}',
    ).length
    await vi.advanceTimersByTimeAsync(1000)
    await flushMicrotasks()

    const pipeSendCallsAfterSecondPoll = webView.rtc!.send.mock.calls.filter(
      ([message]) => message === '{"type":"ping"}',
    ).length
    expect(pipeSendCallsAfterFirstPoll).toBe(1)
    expect(pipeSendCallsAfterSecondPoll).toBe(1)
    expect(directoryHandle.files.get('websocket.pipe')?.readText()).toBe('{"ok":true}')
  })

  it('ignores websocket bridge files when scanning a directory source', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
      'websocket.pipe': '{"type":"ping"}',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledTimes(1)
    expect(submit.mock.calls[0]?.[0]).toBeInstanceOf(Map)
    expect((submit.mock.calls[0]?.[0] as Map<string, string>).get('main.kcl')).toBe('cube = 1')
    expect((submit.mock.calls[0]?.[0] as Map<string, string>).has('websocket.pipe')).toBe(false)
  })

  it('ignores noisy hidden and generated directories when scanning a project directory', async () => {
    const { storage } = createStorage()
    const directoryHandle: FakeDirectoryHandle = {
      kind: 'directory',
      name: 'project',
      entries: async function* () {
        yield [
          '.git',
          {
            kind: 'directory',
            name: '.git',
            entries: async function* () {
              yield [
                'index',
                {
                  kind: 'file',
                  name: 'index',
                  getFile: async () => ({
                    lastModified: Date.now(),
                    size: 4,
                    text: async () => 'noisy',
                  }),
                },
              ]
            },
          },
        ]
        yield [
          'node_modules',
          {
            kind: 'directory',
            name: 'node_modules',
            entries: async function* () {
              yield [
                'dep.js',
                {
                  kind: 'file',
                  name: 'dep.js',
                  getFile: async () => ({
                    lastModified: Date.now(),
                    size: 4,
                    text: async () => 'noisy',
                  }),
                },
              ]
            },
          },
        ]
        yield [
          'main.kcl',
          {
            kind: 'file',
            name: 'main.kcl',
            getFile: async () => ({
              lastModified: 1,
              size: 8,
              text: async () => 'cube = 1',
            }),
          },
        ]
      },
    }
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledTimes(1)
    expect(submit.mock.calls[0]?.[0]).toBeInstanceOf(Map)
    expect((submit.mock.calls[0]?.[0] as Map<string, string>).get('main.kcl')).toBe('cube = 1')
    expect((submit.mock.calls[0]?.[0] as Map<string, string>).has('.git/index')).toBe(false)
    expect((submit.mock.calls[0]?.[0] as Map<string, string>).has('node_modules/dep.js')).toBe(false)
  })

  it('ignores repeated ready events from the same web view instance', async () => {
    const { storage } = createStorage()
    const directoryHandle = createMutableDirectoryHandle('project', {
      'main.kcl': 'cube = 1',
    })
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(
        async () => directoryHandle as unknown as FileSystemDirectoryHandle,
      ),
      readClipboardText: vi.fn(async () => ''),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.directoryButton.click()
    await flushMicrotasks()
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(submit).toHaveBeenCalledTimes(1)
    const lastModifiedAfterFirstReady = app.state.lastModified

    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    await flushMicrotasks()

    expect(app.state.lastModified).toBe(lastModifiedAfterFirstReady)
    expect(submit).toHaveBeenCalledTimes(1)
  })

  it('loads KCL from the clipboard as a one-shot source', async () => {
    const { storage } = createStorage()
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => 'cube = 42'),
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      storage,
    })
    mounted.push(app)

    setToken(app.elements.tokenInput, 'api-token')
    app.elements.clipboardButton.click()
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.source?.kind).toBe('clipboard')
    expect(app.state.source?.label).toBe('Clipboard')

    webView.dispatchEvent(new Event('ready'))
    await Promise.resolve()
    await Promise.resolve()

    expect(submit).toHaveBeenCalledWith('cube = 42', undefined)
    expect(webView.rtc?.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"zoom_to_fit"'),
    )
    expect(app.state.pollTimer).toBe(0)
  })

  it('allows loading a source on zoo.dev without a pasted token', async () => {
    const { storage } = createStorage()
    const fetch = vi.fn(async () => ({ ok: true, status: 200, headers: new Headers() }))
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'main.kcl',
      getFile: async () => ({
        lastModified: 1,
        text: async () => 'cube = 1',
      }),
    }
    const submit = vi.fn(async () => undefined)
    const webView = createStubWebView(submit)

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => [fileHandle as unknown as FileSystemFileHandle]),
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      fetch,
      createWebView: () => webView,
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'zoo.dev', href: 'https://zoo.dev/viewer' },
      storage,
    })
    mounted.push(app)

    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()

    expect(app.state.source?.label).toBe('main.kcl')
    webView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()
    expect(submit).toHaveBeenCalledWith(new Map([['main.kcl', 'cube = 1']]), {
      mainKclPathName: 'main.kcl',
    })
  })
})
