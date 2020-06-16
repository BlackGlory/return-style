export function getResultError<T, X = any>(fn: () => T): [T, undefined] | [undefined, X] {
  try {
    const result = fn()
    return [result, void 0]
  } catch (e) {
    return [void 0, e]
  }
}
