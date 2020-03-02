export function getError<T = Error>(fn: () => unknown): T | undefined {
  try {
    fn()
  } catch (syncError) {
    return syncError
  }
  return
}
