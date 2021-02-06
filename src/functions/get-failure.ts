export function getFailure<X = Error>(fn: () => unknown): [true, X] | [false, undefined] {
  try {
    fn()
    return [false, void 0]
  } catch (e) {
    return [true, e]
  }
}
