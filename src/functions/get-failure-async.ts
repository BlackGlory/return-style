export async function getFailureAsync<X, T>(promise: PromiseLike<T>): Promise<[false, T] | [true, X]> {
  try {
    const result = await promise
    return [false, result]
  } catch (e) {
    return [true, e]
  }
}
