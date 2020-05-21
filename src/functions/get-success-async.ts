export async function getSuccessAsync<T>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]> {
  try {
    const result = await promise
    return [true, result]
  } catch (e) {
    return [false, void 0]
  }
}
