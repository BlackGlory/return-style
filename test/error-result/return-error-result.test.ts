import { isPromise } from 'extra-promise'
import { returnErrorResult } from '../../src/error-result/return-error-result'
import { returnErrorResultAsync } from '../../src/error-result/return-error-result-async'
import { returnErrorResultSync } from '../../src/error-result/return-error-result-sync'

test('returnErrorResult(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnErrorResult(fn)(value)
  const expected = returnErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResult(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnErrorResult(fn)(value)
  const expected = returnErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResult(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnErrorResult(fn)(value)
  const expected = await returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResult(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnErrorResult(fn)(value)
  const expected = await returnErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
