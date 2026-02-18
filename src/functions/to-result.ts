import { Result } from '@classes/result.js'

export function toResult<E = Error, T = unknown>(fn: () => T): Result<T, E> {
  try {
    const result = fn()
    return Result.Ok(result)
  } catch (err) {
    return Result.Err(err as E)
  }
}
