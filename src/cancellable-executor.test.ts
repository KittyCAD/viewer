import { describe, expect, it, vi } from 'vitest'
import { createCancellableExecutor } from './cancellable-executor'

class FakeWorker extends EventTarget {
  postMessage = vi.fn()
  terminate = vi.fn()
  message(data: unknown) {
    this.dispatchEvent(new MessageEvent('message', { data }))
  }
}

function setup() {
  const transport = new EventTarget()
  const workers: FakeWorker[] = []
  const send = vi.fn(async () => undefined)
  const removeEventListener = vi.fn(transport.removeEventListener.bind(transport, 'message'))
  const executor = createCancellableExecutor({
    executor: () => ({
      addEventListener: transport.addEventListener.bind(transport, 'message'),
      removeEventListener,
    }),
    send,
  }, () => {
    const worker = new FakeWorker()
    workers.push(worker)
    return worker as unknown as Worker
  })
  return { executor, transport, workers, send, removeEventListener }
}

describe('cancellable executor', () => {
  it('terminates superseded WASM work and ignores its later commands and results', async () => {
    const { executor, workers, send } = setup()
    const first = executor.submit('width = 42')
    const cancelled = expect(first).rejects.toMatchObject({ name: 'AbortError' })
    const second = executor.submit('width = 100')
    await cancelled
    expect(workers[0].terminate).toHaveBeenCalledOnce()
    expect(workers[1].postMessage).toHaveBeenCalledWith({
      type: 'execute', input: 'width = 100', options: {},
    })
    workers[0].message({ type: 'command', data: 'stale command' })
    workers[0].message({ type: 'result', data: 'stale result' })
    expect(send).not.toHaveBeenCalled()
    workers[1].message({ type: 'result', data: 'latest result' })
    await expect(second).resolves.toBe('latest result')
    executor.dispose()
    expect(workers[1].terminate).toHaveBeenCalledOnce()
  })

  it('bridges engine traffic and command events through the existing session', async () => {
    const { executor, transport, workers, send, removeEventListener } = setup()
    const observe = vi.fn()
    executor.addEventListener(observe)
    const result = executor.submit(new Map([['main.kcl', 'width = 42']]), { mainKclPathName: 'main.kcl' })
    const command = '{"cmd_id":"command-1"}'
    workers[0].message({ type: 'command', data: command })
    expect(send).toHaveBeenCalledWith(command)
    expect(observe.mock.calls[0][0].data).toEqual({
      to: 'websocket', payload: { type: 'send', data: command },
    })
    const response = '{"request_id":"command-1","success":true}'
    transport.dispatchEvent(new MessageEvent('message', {
      data: { from: 'websocket', payload: { type: 'message', data: response } },
    }))
    expect(workers[0].postMessage).toHaveBeenLastCalledWith({ type: 'response', data: response })
    workers[0].message({ type: 'result', data: { variables: {} } })
    await expect(result).resolves.toEqual({ variables: {} })
    executor.dispose()
    expect(removeEventListener).toHaveBeenCalledOnce()
  })

  it('stops pending work on disposal and reports worker failures', async () => {
    const { executor, workers } = setup()
    const failed = executor.submit('width = 42')
    workers[0].dispatchEvent(new ErrorEvent('error', { message: 'Worker failed' }))
    await expect(failed).rejects.toThrow('Worker failed')
    expect(workers[0].terminate).toHaveBeenCalledOnce()
    const pending = executor.submit('width = 100')
    executor.dispose()
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(workers[1].terminate).toHaveBeenCalledOnce()
  })

  it('reuses an idle worker and handles transport failures', async () => {
    const { executor, workers, send } = setup()
    const first = executor.submit('width = 42')
    workers[0].message({ type: 'result', data: 'first' })
    await expect(first).resolves.toBe('first')
    const second = executor.submit('width = 100')
    expect(workers).toHaveLength(1)
    send.mockRejectedValueOnce(new Error('Connection closed'))
    workers[0].message({ type: 'command', data: 'command' })
    await expect(second).rejects.toThrow('Connection closed')
    expect(workers[0].terminate).toHaveBeenCalledOnce()
    executor.dispose()
  })
})
