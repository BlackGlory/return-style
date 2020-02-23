import { getError } from '../error/get-error'
import { getDefault, isDefault } from '../utils/default'
import { isPromise } from '../utils/is-promise'

export function safe<T = unknown>(fn: () => PromiseLike<void>, logger?: (error: T) => void): Promise<void>
export function safe<T = unknown>(fn: () => void, logger?: (error: T) => void): void
export function safe<T = unknown>(fn: () => void | PromiseLike<void>, logger?: (error: T) => void) {
  const promiseOrError: Promise<T | symbol> | T | symbol = getError<T | symbol>(fn, getDefault())
  if (isPromise<T>(promiseOrError)) {
    return (async (promise: Promise<T | symbol>) => {
      const error = await promise
      if (logger && !isDefault(error)) logger(error)
    })(promiseOrError)
  } else {
    const error = promiseOrError
    if (logger && !isDefault(error)) logger(error)
    return
  }
}
