import { Optional } from '@src/classes/optional'

export function getOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => Promise<Optional<T>> {
  return (promise: PromiseLike<T>) => getOptionalAsync(promise, isNone)
}

export async function getOptionalAsync<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): Promise<Optional<T>> {
  const result = await promise
  if (isNone(result)) {
    return Optional.ofNone()
  } else {
    return Optional.of(result)
  }
}
