export function getResultError<E = Error, T = unknown>(
  fn: () => T
): [result: T, error: undefined] | [result: undefined, error: E] {
  try {
    const result = fn()
    return [result, void 0]
  } catch (err) {
    return [void 0, err as E]
  }
}
