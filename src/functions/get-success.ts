export function getSuccess<T>(fn: () => T): [true, T] | [false, undefined] {
  try {
    const result = fn()
    return [true, result]
  } catch {
    return [false, void 0]
  }
}
