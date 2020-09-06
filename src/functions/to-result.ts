import { Result, IResult } from '@classes/result'

export function toResult<T, X = any>(fn: () => T): IResult<T, X> {
  try {
    const result = fn()
    return Result.Ok(result)
  } catch (e) {
    return Result.Err(e)
  }
}
