declare module '@kittycad/lib' {
  export interface ClientOptions {
    token?: string
    baseUrl?: string
  }

  export class Client {
    token?: string
    baseUrl?: string
    constructor(tokenOrOpts?: string | ClientOptions)
  }
}

declare module '@kittycad/lib-websocket-engine' {
  import { Client } from '@kittycad/lib'

  export class WebSocket extends EventTarget {
    constructor(args: {
      client: Client
      pool?: string
      show_grid?: boolean
      webrtc?: boolean
      video_res_width?: number
      video_res_height?: number
      fps?: number
      unlocked_framerate?: boolean
      order_independent_transparency?: boolean
      pr?: number
    })
    deconstructor(): void
    start(): Promise<void>
    executor(): {
      addEventListener(listener: (ev: MessageEvent) => void): void
      removeEventListener(listener: (ev: MessageEvent) => void): void
      submit(kclStrOrProject: string | Map<string, string>, opts?: { mainKclPathName: string }): Promise<unknown>
    }
    send(...args: unknown[]): Promise<unknown>
  }
}
