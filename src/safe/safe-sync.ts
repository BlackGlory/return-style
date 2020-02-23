import { getErrorSync } from '../error/get-error-sync'
import { getDefault, isDefault } from '../utils/default'

export function safeSync<T= unknown>(fn: () => void, logger?: (error: T) => void): void {
  const error = getErrorSync<T | symbol>(fn, getDefault())
  if (logger && !isDefault(error)) logger(error)
}
