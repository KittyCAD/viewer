type ExecutionInput = string | Map<string, string>
type ExecutionOptions = { mainKclPathName?: string }

type Rtc = {
  executor: () => {
    addEventListener?: (listener: EventListener) => void
    removeEventListener?: (listener: EventListener) => void
  }
  send?: (message: string) => unknown
}

// Keep the WebRTC/WebSocket session alive while allowing the WASM work to stop.
export function createCancellableExecutor(
  rtc: Rtc,
  createWorker = () => new Worker(new URL('./executor-worker.js', import.meta.url), { type: 'module' }),
) {
  const events = new EventTarget()
  const transport = rtc.executor()
  let worker: Worker | null = null
  let pending: { resolve: (value: unknown) => void; reject: (error: unknown) => void } | null = null

  const cancel = () => {
    worker?.terminate()
    worker = null
    const previous = pending
    pending = null
    previous?.reject(new DOMException('Execution cancelled', 'AbortError'))
  }
  const onTransportMessage = (event: Event) => {
    const message = (event as MessageEvent).data
    events.dispatchEvent(new MessageEvent('message', { data: message }))
    if (message?.from === 'websocket' && message.payload?.type === 'message' && pending) {
      worker?.postMessage({ type: 'response', data: message.payload.data })
    }
  }
  transport.addEventListener?.(onTransportMessage)

  const fail = (activeWorker: Worker, error: unknown) => {
    if (worker !== activeWorker) return
    const current = pending
    pending = null
    activeWorker.terminate()
    worker = null
    current?.reject(error)
  }
  const ensureWorker = () => {
    if (worker) return worker
    const activeWorker = createWorker()
    worker = activeWorker
    activeWorker.addEventListener('message', event => {
      if (worker !== activeWorker || !pending) return
      const message = event.data
      if (message.type === 'command') {
        const current = pending
        events.dispatchEvent(new MessageEvent('message', {
          data: { to: 'websocket', payload: { type: 'send', data: message.data } },
        }))
        try {
          if (!rtc.send) throw new Error('Missing RTC transport')
          void Promise.resolve(rtc.send(message.data)).catch(error => {
            if (pending === current) fail(activeWorker, error)
          })
        } catch (error) {
          fail(activeWorker, error)
        }
      } else if (message.type === 'result' || message.type === 'error') {
        const current = pending
        pending = null
        if (message.type === 'error') current.reject(message.data)
        else current.resolve(message.data)
      }
    })
    activeWorker.addEventListener('error', event => fail(activeWorker, new Error(event.message)))
    return activeWorker
  }

  return {
    addEventListener: events.addEventListener.bind(events, 'message'),
    removeEventListener: events.removeEventListener.bind(events, 'message'),
    cancel,
    dispose() {
      cancel()
      transport.removeEventListener?.(onTransportMessage)
    },
    submit(input: ExecutionInput, options: ExecutionOptions = {}) {
      if (pending) cancel()
      return new Promise<unknown>((resolve, reject) => {
        pending = { resolve, reject }
        try {
          ensureWorker().postMessage({ type: 'execute', input, options })
        } catch (error) {
          pending = null
          worker?.terminate()
          worker = null
          reject(error)
        }
      })
    },
  }
}
