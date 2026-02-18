export function getErrorResult<E = Error, T = unknown>(
  fn: () => T
): [error: undefined, result: T] | [error: E, result: undefined] {
  try {
    const result = fn()
    return [void 0, result]
  } catch (err) {
    return [err as E, void 0]
  }
}
