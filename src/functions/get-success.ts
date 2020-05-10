export function getSuccess<X, T>(fn: () => T): [true, T] | [false, X] {
  try {
    const result = fn()
    return [true, result]
  } catch (e) {
    return [false, e]
  }
}
