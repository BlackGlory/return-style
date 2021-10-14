export async function getErrorResultAsync<X = Error, T = unknown>(
  fn: () => PromiseLike<T> | T
): Promise<[error: undefined, result: T] | [error: X, result: undefined]> {
  try {
    const result = await fn()
    return [void 0, result]
  } catch (e: any) {
    return [e, void 0]
  }
}
