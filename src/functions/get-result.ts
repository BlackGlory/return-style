import { pass } from '@blackglory/prelude'

export function getResult<T>(fn: () => T): T | undefined {
  try {
    return fn()
  } catch {
    pass()
  }
}
