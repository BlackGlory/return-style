import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnError } from './return-error'

export function newError<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function newError<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function newError<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown): (...args: U) => T | null
export function newError<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function newError(fn: new (...args: unknown[]) => unknown | PromiseLike<unknown>, defaultValue = null) {
  return returnError(convertConstructorToFunction(fn), defaultValue) as any // AnyScript
}
