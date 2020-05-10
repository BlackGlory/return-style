export async function getSuccessAsync<X, T>(promise: PromiseLike<T>): Promise<[true, T] | [false, X]> {
  try {
    const result = await promise
    return [true, result]
  } catch (e) {
    return [false, e]
  }
}
