export function getError<E = Error>(fn: () => unknown): E | undefined {
  try {
    fn()
  } catch (err) {
    return err as E
  }
}
