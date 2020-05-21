export function getFailure<X>(fn: () => unknown): [true, X] | [false, undefined] {
  try {
    fn()
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
