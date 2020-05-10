export function getFailure<X, T>(fn: () => T): [false, T] | [true, X] {
  try {
    const result = fn()
    return [false, result]
  } catch (e) {
    return [true, e]
  }
}
