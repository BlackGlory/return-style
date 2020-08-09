export async function getErrorResultAsync<T, X = any>(fn: () => PromiseLike<T>): Promise<[undefined, T] | [X, undefined]> {
  try {
    const result = await fn()
    return [void 0, result]
  } catch (e) {
    return [e, void 0]
  }
}
