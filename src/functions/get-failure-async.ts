export async function getFailureAsync<X>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]> {
  try {
    await promise
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
