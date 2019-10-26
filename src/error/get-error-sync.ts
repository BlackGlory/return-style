import { returnErrorSync } from './return-error-sync'

export function getErrorSync<T>(fn: () => unknown): T | null
export function getErrorSync<T>(fn: () => unknown, defaultValue: T): T
export function getErrorSync(fn: () => unknown, defaultValue = null) {
  return returnErrorSync(fn, defaultValue)()
}
