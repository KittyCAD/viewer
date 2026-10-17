import init, { Context, parse_wasm } from '@kittycad/kcl-wasm-lib'
import { decode, encode } from '@msgpack/msgpack'

const responses = new Map<string, (value: Uint8Array) => void>()
const ready = fetch(new URL('./kcl_wasm_lib_bg.wasm', self.location.href))
  .then(response => response.arrayBuffer())
  .then(module_or_path => init({ module_or_path }))

async function execute(input: string | Map<string, string>, mainKclPathName = 'main.kcl') {
  await ready
  const files = typeof input === 'string' ? new Map([[mainKclPathName, input]]) : input
  const context = new Context({
    fireModelingCommandFromWasm() {},
    startNewSession: async () => {},
    sendModelingCommandFromWasm(id: string, _range: string, command: string) {
      return new Promise<Uint8Array>(resolve => {
        responses.set(id, resolve)
        postMessage({ type: 'command', data: command })
      })
    },
  }, {
    readFile: async (path: string) => new TextEncoder().encode(
      typeof input === 'string' ? input : files.get(path) ?? '',
    ),
    exists: async (path: string) => typeof input !== 'string' && files.has(path),
    getAllFiles: async () => [...files.values()],
  })
  try {
    const program = parse_wasm(files.get(mainKclPathName) ?? '')[0]
    return await context.execute(JSON.stringify(program), mainKclPathName, JSON.stringify({
      settings: { modeling: { enable_ssao: true } },
    }))
  } finally {
    responses.clear()
    context.free()
  }
}

self.addEventListener('message', event => {
  const message = event.data
  if (message.type === 'execute') {
    void execute(message.input, message.options.mainKclPathName).then(
      data => postMessage({ type: 'result', data }),
      data => postMessage({ type: 'error', data }),
    )
  } else if (message.type === 'response') {
    try {
      const data = message.data
      const response = typeof data === 'string' ? JSON.parse(data)
        : data instanceof ArrayBuffer ? decode(new Uint8Array(data))
          : ArrayBuffer.isView(data) ? decode(new Uint8Array(data.buffer, data.byteOffset, data.byteLength))
            : data
      const resolve = responses.get(response?.request_id)
      if (resolve) {
        responses.delete(response.request_id)
        resolve(encode(response))
      }
    } catch {
      // Other traffic on the shared session is not an executor response.
    }
  }
})
