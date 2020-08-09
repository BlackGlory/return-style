export async function getResultErrorPromise<T, X = any>(promise: PromiseLike<T>): Promise<[T, undefined] | [undefined, X]> {
  try {
    const result = await promise
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
