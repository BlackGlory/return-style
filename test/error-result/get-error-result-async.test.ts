import { isPromise } from '../../src/utils/is-promise'
import { getErrorResultAsync } from '../../src/error-result/get-error-result-async'
import { returnErrorResultAsync } from '../../src/error-result/return-error-result-async'

test('getErrorResultAsync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getErrorResultAsync(() => fn(value))
  const expected = returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResultAsync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getErrorResultAsync(() => fn(value))
  const expected = returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResultAsync(fn)', async () => {
  const fn: any = (x: string) => x
  const value = 'result'
  const result = getErrorResultAsync(() => fn(value))
  const expected = returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResultAsync(fn) fn throws error', async () => {
  const fn: any = (x: string) => { throw x }
  const value = 'error'
  const result = getErrorResultAsync(() => fn(value))
  const expected = returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})
