import { Result } from '@src/classes/result'

export async function getResultAsync<T, X>(promise: PromiseLike<T>): Promise<Result<T, X>> {
  try {
    const result = await promise
    return Result.of(result)
  } catch (e) {
    return Result.ofErr(e)
  }
}
