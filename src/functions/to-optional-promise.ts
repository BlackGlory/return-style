import { AsyncOptional, None } from '@src/classes/async-optional'

export function toOptionalPromisePartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => AsyncOptional<T> {
  return (promise: PromiseLike<T>) => toOptionalPromise(promise, isNone)
}

export function toOptionalPromise<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): AsyncOptional<T> {
  return new AsyncOptional<T>((async () => {
    const result = await promise
    if (isNone(result)) return None
    return result
  })())
}
