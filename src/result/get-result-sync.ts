import { returnResultSync } from './return-result-sync'

export function getResultSync<T>(fn: () => T): T | null
export function getResultSync<T>(fn: () => T, defaultValue: T): T
export function getResultSync<T>(fn: () => T, defaultValue = null) {
  return returnResultSync(fn, defaultValue)()
}
