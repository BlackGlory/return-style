export async function getFailurePromise<X = Error>(
  promise: PromiseLike<unknown>
): Promise<[failed: true, error: X] | [failed: false, error: undefined]> {
  try {
    await promise
    return [false, void 0]
  } catch (e: any) {
    return [true, e]
  }
}
