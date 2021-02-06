export async function getSuccessAsync<T = unknown>(fn: () => PromiseLike<T>): Promise<[true, T] | [false, undefined]> {
  try {
    const result = await fn()
    return [true, result]
  } catch {
    return [false, void 0]
  }
}
