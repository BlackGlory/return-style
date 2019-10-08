import { isPromise } from 'extra-promise'
import { returnErrorResultFromFunction } from '../../src/return-error-result/return-error-result-from-function'
import { returnErrorResultFromAsyncFunction } from '../../src/return-error-result/return-error-result-from-async-function'
import { returnErrorResultFromSyncFunction } from '../../src/return-error-result/return-error-result-from-sync-function'

test('returnErrorResultFromFunction(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnErrorResultFromFunction(fn)(value)
  const expected = returnErrorResultFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromFunction(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnErrorResultFromFunction(fn)(value)
  const expected = returnErrorResultFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromFunction(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnErrorResultFromFunction(fn)(value)
  const expected = await returnErrorResultFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResultFromFunction(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnErrorResultFromFunction(fn)(value)
  const expected = await returnErrorResultFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
