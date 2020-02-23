export function isPromise<T>(obj: any): obj is Promise<T> {
  return obj !== null && typeof obj === 'object' && typeof obj.then === 'function'
}

export const isPromiseLike: <T>(obj: any) => obj is PromiseLike<T> = isPromise
