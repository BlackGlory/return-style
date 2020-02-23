import { isPromise } from '../../src/utils/is-promise'
import { getErrorAsync } from '../../src/error/get-error-async'
import { returnErrorAsync } from '../../src/error/return-error-async'

test('getErrorAsync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getErrorAsync(() => fn(value))
  const expected = returnErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(asyncFn, defaultValue)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const defaultValue = 'default'
  const value = 'result'
  const result = getErrorAsync(() => fn(value), defaultValue)
  const expected = returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getErrorAsync(() => fn(value))
  const expected = returnErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const defaultValue = 'default'
  const value = 'error'
  const result = getErrorAsync(() => fn(value))
  const expected = returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(fn)', async () => {
  const fn: any = (x: string) => x
  const value = 'result'
  const result = getErrorAsync(() => fn(value))
  const expected = returnErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(fn, defaultValue)', async () => {
  const fn: any = (x: string) => x
  const defaultValue = 'default'
  const value = 'result'
  const result = getErrorAsync(() => fn(value), defaultValue)
  const expected = returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(fn) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const value = 'error'
  const result = getErrorAsync(() => fn(value))
  const expected = returnErrorAsync(fn)('error')

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getErrorAsync(fn, defaultValue) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const defaultValue = 'default'
  const value = 'error'
  const result = getErrorAsync(() => fn(value), defaultValue)
  const expected = returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})
