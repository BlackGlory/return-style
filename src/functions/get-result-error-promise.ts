export async function getResultErrorPromise<E = Error, T = unknown>(
  promise: PromiseLike<T>
): Promise<[result: T, error: undefined] | [result: undefined, error: E]> {
  try {
    const result = await promise
    return [result, void 0]
  } catch (err) {
    return [void 0, err as E]
  }
}
