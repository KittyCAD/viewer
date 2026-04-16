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
  const start = document.createElement('div')
  start.className = 'start'
  el.append(start)
  const webView = new EventTarget() as EventTarget & {
    el: HTMLElement
    rtc?: { executor: () => { submit: typeof submit }; send: ReturnType<typeof vi.fn> }
  }
  webView.el = el
  webView.rtc = { executor: () => ({ submit }), send: vi.fn() }
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
      measure: () => ({ width: 640, height: 360 }),
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
    const fetch = vi.fn(async () => ({ ok: true }))

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

    expect(createClient).toHaveBeenCalledWith('')
    expect(fetch).toHaveBeenCalledWith('https://api.zoo.dev/user', {
      credentials: 'include',
    })
    expect(app.state.token).toBe('')
    expect(app.elements.tokenInput.hidden).toBe(true)
  })

  it('redirects zoo.dev users to sign in when the cookie auth check fails', async () => {
    const { storage } = createStorage()
    const redirectToLogin = vi.fn()

    const app = createApp(document.getElementById('app')!, {
      showOpenFilePicker: vi.fn(async () => []) as typeof window.showOpenFilePicker,
      showDirectoryPicker: vi.fn(async () => {
        throw new DOMException('aborted', 'AbortError')
      }) as typeof window.showDirectoryPicker,
      readClipboardText: vi.fn(async () => ''),
      fetch: vi.fn(async () => ({ ok: false })),
      redirectToLogin,
      createWebView: () => createStubWebView(async () => undefined),
      measure: () => ({ width: 640, height: 360 }),
      location: { hostname: 'zoo.dev', href: 'https://zoo.dev/viewer' },
      storage,
    })
    mounted.push(app)

    await Promise.resolve()

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

    expect(app.state.pollTimer).not.toBe(0)
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
      fetch: vi.fn(async () => ({ ok: true })),
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
