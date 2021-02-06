export async function getSuccessPromise<T = unknown>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]> {
  try {
    const result = await promise
    return [true, result]
  } catch {
    return [false, void 0]
  }
}
