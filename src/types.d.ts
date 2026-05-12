declare module 'js-untar' {
  type UntarFile = {
    name: string
    type?: string
    buffer: ArrayBuffer
    readAsString?: () => string
  }

  type ProgressivePromise<T> = Promise<T> & {
    progress: (callback: (file: UntarFile) => void) => ProgressivePromise<T>
  }

  export default function untar(arrayBuffer: ArrayBuffer): ProgressivePromise<UntarFile[]>
}
