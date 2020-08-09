export async function getResultErrorAsync<T, X = any>(fn: () => PromiseLike<T>): Promise<[T, undefined] | [undefined, X]> {
  try {
    const result = await fn()
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
