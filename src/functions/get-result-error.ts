export function getResultError<X = Error, T = unknown>(fn: () => T): [T, undefined] | [undefined, X] {
  try {
    const result = fn()
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
