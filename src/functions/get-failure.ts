export function getFailure<E = Error>(
  fn: () => unknown
): [failed: true, error: E] | [failed: false, error: undefined] {
  try {
    fn()
    return [false, void 0]
  } catch (err) {
    return [true, err as E]
  }
}
