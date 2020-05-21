export function getSuccess<T>(fn: () => T): [true, T] | [false, undefined] {
  try {
    const result = fn()
    return [true, result]
  } catch (e) {
    return [false, void 0]
  }
}
