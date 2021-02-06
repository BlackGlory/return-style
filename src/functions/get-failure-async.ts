export async function getFailureAsync<X = Error>(fn: () => PromiseLike<unknown>): Promise<[true, X] | [false, undefined]> {
  try {
    await fn()
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
