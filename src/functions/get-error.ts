export function getError<X = Error>(fn: () => unknown): X | undefined {
  try {
    fn()
  } catch (syncError: any) {
    return syncError
  }
  return
}
