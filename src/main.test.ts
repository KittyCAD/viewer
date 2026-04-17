import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from './main'

type FakeFileHandle = {
  kind: 'file'
  name: string
  getFile: () => Promise<{ lastModified: number; text: () => Promise<string> }>
}

type FakeDirectoryHandle = {
  kind: 'directory'
  name: string
  entries: () => AsyncGenerator<[string, FakeFileHandle | FakeDirectoryHandle], void, void>
}

function deferred() {
  let resolve = (_value?: unknown) => {}
  const promise = new Promise<unknown>(nextResolve => {
    resolve = nextResolve
  })
  return { promise, resolve }
}

function createStubWebView(submit: (input: string | Map<string, string>) => Promise<unknown>) {
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
  const webView = new EventTarget() as EventTarget & {
    el: HTMLElement
    rtc?: { executor: () => typeof executor; send: ReturnType<typeof vi.fn> }
  }
  webView.el = el
  webView.rtc = { executor: () => executor, send: vi.fn() }
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

  it('shows a Chrome download banner outside Google Chrome', () => {
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
      'Only supports',
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

  it('uses cookie auth on zoo.dev and hides the token input', () => {
    const { storage } = createStorage({
      'zoo-api-token': 'api-token-should-not-be-used',
    })
    const createClient = vi.fn((token: string) => ({ token }))
    document.cookie = '__Secure-next-auth.session-token=abc123'

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      createClient,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'app.zoo.dev', href: 'https://app.zoo.dev/model' },
      storage,
    })
    mounted.push(app)

    expect(createClient).toHaveBeenCalledWith('')
    expect(app.state.token).toBe('')
    expect(app.elements.tokenInput.hidden).toBe(true)
  })

  it('redirects zoo.dev users to sign in when the session cookie is missing', () => {
    const { storage } = createStorage()
    const redirectToLogin = vi.fn()

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      redirectToLogin,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'zoo.dev', href: 'https://zoo.dev/viewer' },
      storage,
    })
    mounted.push(app)

    expect(redirectToLogin).toHaveBeenCalledWith(
      'https://zoo.dev/signin?callbackUrl=https%3A%2F%2Fzoo.dev%2Fviewer',
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

    expect(submit).toHaveBeenCalledWith(text)
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
    expect(radialBatch.requests.map(request => ({ cmd: request.cmd }))).toEqual([
      {
        cmd: {
          type: 'set_object_transform',
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: 10, y: -10, z: 0 },
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
                property: { x: -10, y: 10, z: 0 },
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

  it('lays out grid explode in a centered near-square grid', async () => {
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
          object_id: 'solid-object-1',
          transforms: [
            {
              translate: {
                property: { x: -76, y: -39.5, z: 0 },
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
                property: { x: -4, y: -42.5, z: -1 },
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
                property: { x: 78, y: -38.5, z: -2 },
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
                property: { x: -37.5, y: 43.5, z: 0 },
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
                property: { x: 35.5, y: 38.5, z: 3 },
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

    expect(firstSubmit).toHaveBeenCalledWith(firstText)

    app.elements.disconnectButton.click()

    app.elements.fileButton.click()
    await Promise.resolve()
    await Promise.resolve()
    secondWebView.dispatchEvent(new Event('ready'))
    await vi.runOnlyPendingTimersAsync()

    expect(secondSubmit).toHaveBeenCalledWith(secondText)
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

    expect(submit).toHaveBeenCalledWith('cube = 42')
    expect(webView.rtc?.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"zoom_to_fit"'),
    )
    expect(app.state.pollTimer).toBe(0)
  })

  it('allows loading a source on zoo.dev without a pasted token', async () => {
    const { storage } = createStorage()
    document.cookie = '__Secure-next-auth.session-token=abc123'
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
    expect(submit).toHaveBeenCalledWith('cube = 1')
  })
})
