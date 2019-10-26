import { isPromise } from 'extra-promise'
import { getResultErrorAsync } from '../../src/result-error/get-result-error-async'
import { returnResultErrorAsync } from '../../src/result-error/return-result-error-async'

test('getResultErrorAsync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getResultErrorAsync(() => fn(value))
  const expected = returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultErrorAsync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getResultErrorAsync(() => fn(value))
  const expected = returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultErrorAsync(fn)', async () => {
  const fn: any = (x: string) => x
  const value = 'result'
  const result = getResultErrorAsync(() => fn(value))
  const expected = returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultErrorAsync(fn) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const value = 'error'
  const result = getResultErrorAsync(() => fn(value))
  const expected = returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})
