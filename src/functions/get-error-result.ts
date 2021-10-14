export function getErrorResult<X = Error, T = unknown>(
  fn: () => T
): [error: undefined, result: T] | [error: X, result: undefined] {
  try {
    const result = fn()
    return [void 0, result]
  } catch (e: any) {
    return [e, void 0]
  }
}
