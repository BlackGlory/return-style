export function getErrorResult<X = Error, T = unknown>(fn: () => T): [undefined, T] | [X, undefined] {
  try {
    const result = fn()
    return [void 0, result]
  } catch (e) {
    return [e, void 0]
  }
}
