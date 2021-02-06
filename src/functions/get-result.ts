export function getResult<T = unknown>(fn: () => T): T | undefined {
  try {
    return fn()
  } catch {
    return
  }
}
