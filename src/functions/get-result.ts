import { Result } from '@src/classes/result'

export function getResult<X, T>(fn: () => T): Result<T, X> {
  try {
    const result = fn()
    return Result.of(result)
  } catch (e) {
    return Result.ofErr(e)
  }
}
