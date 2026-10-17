import { afterEach, describe, expect, it, vi } from 'vitest'
import { decode, encode } from '@msgpack/msgpack'

const mocks = vi.hoisted(() => ({
  init: vi.fn(async () => undefined),
  Context: vi.fn(),
  parse: vi.fn(() => [{}]),
  free: vi.fn(),
}))
vi.mock('@kittycad/kcl-wasm-lib', () => ({
  default: mocks.init,
  Context: mocks.Context,
  parse_wasm: mocks.parse,
}))

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
  vi.resetModules()
})

describe('execution worker', () => {
  it.each(['json', 'msgpack', 'view'])('matches %s engine responses to requests and loads project files', async format => {
    const scope = Object.assign(new EventTarget(), { location: { href: 'https://viewer.zoo.dev/executor-worker.js' } })
    const post = vi.fn()
    vi.stubGlobal('self', scope)
    vi.stubGlobal('postMessage', post)
    vi.stubGlobal('fetch', vi.fn(async () => ({ arrayBuffer: async () => new ArrayBuffer(0) })))
    mocks.Context.mockImplementation(function(engine, fs) {
      return {
        execute: async () => {
          expect(new TextDecoder().decode(await fs.readFile('params.kcl'))).toBe('height = 7')
          expect(await fs.exists('params.kcl')).toBe(true)
          expect(await fs.getAllFiles()).toEqual(['width = 42', 'height = 7'])
          return decode(await engine.sendModelingCommandFromWasm('command-1', '', 'engine command'))
        },
        free: mocks.free,
      }
    })
    await import('./executor-worker')
    scope.dispatchEvent(new MessageEvent('message', { data: {
      type: 'execute',
      input: new Map([['main.kcl', 'width = 42'], ['params.kcl', 'height = 7']]),
      options: { mainKclPathName: 'main.kcl' },
    } }))
    await vi.waitFor(() => expect(post).toHaveBeenCalledWith({ type: 'command', data: 'engine command' }))
    scope.dispatchEvent(new MessageEvent('message', { data: {
      type: 'response', data: JSON.stringify({ request_id: 'another-command', success: true }),
    } }))
    await Promise.resolve()
    expect(post).toHaveBeenCalledTimes(1)
    const response = { request_id: 'command-1', success: true }
    scope.dispatchEvent(new MessageEvent('message', { data: {
      type: 'response', data: format === 'json' ? JSON.stringify(response)
        : format === 'msgpack' ? encode(response).slice().buffer : encode(response),
    } }))
    await vi.waitFor(() => expect(post).toHaveBeenCalledWith({ type: 'result', data: response }))
    expect(mocks.parse).toHaveBeenCalledWith('width = 42')
    expect(mocks.free).toHaveBeenCalledOnce()
  })
})
