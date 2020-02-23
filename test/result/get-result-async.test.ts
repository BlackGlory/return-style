import { isPromise } from '../../src/utils/is-promise'
import { getResultAsync } from '../../src/result/get-result-async'
import { returnResultAsync } from '../../src/result/return-result-async'

test('getResultAsync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getResultAsync(() => fn(value))
  const expected = returnResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(asyncFn, defaultValue)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const defaultValue = 'default'
  const value = 'result'
  const result = getResultAsync(() => fn(value), defaultValue)
  const expected = returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getResultAsync(() => fn(value))
  const expected = returnResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const defaultValue = 'default'
  const value = 'error'
  const result = getResultAsync(() => fn(value), defaultValue)
  const expected = returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(fn)', async () => {
  const fn: any = (x: string) => x
  const value = 'result'
  const result = getResultAsync(() => fn(value))
  const expected = returnResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(fn, defaultValue)', async () => {
  const fn: any = (x: string) => x
  const defaultValue = 'default'
  const value = 'result'
  const result = getResultAsync(() => fn(value), defaultValue)
  const expected = returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(fn) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const value = 'error'
  const result = getResultAsync(() => fn(value))
  const expected = returnResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultAsync(fn, defaultValue) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const defaultValue = 'default'
  const value = 'error'
  const result = getResultAsync(() => fn(value), defaultValue)
  const expected = returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})
