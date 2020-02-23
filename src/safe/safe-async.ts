import { getErrorAsync } from '../error/get-error-async'
import { getDefault, isDefault } from '../utils/default'

export async function safeAsync<T = unknown>(fn: () => PromiseLike<void>, logger?: (error: T) => void) {
  const error = await getErrorAsync<T | symbol>(fn, getDefault())
  if (logger && !isDefault(error)) logger(error)
}
