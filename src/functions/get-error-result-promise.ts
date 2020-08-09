export async function getErrorResultPromise<T, X = any>(promise: PromiseLike<T>): Promise<[undefined, T] | [X, undefined]> {
  try {
    const result = await promise
    return [void 0, result]
  } catch (e) {
    return [e, void 0]
  }
}
