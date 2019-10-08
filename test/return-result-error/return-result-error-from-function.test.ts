import { isPromise } from 'extra-promise'
import { returnResultErrorFromFunction } from '../../src/return-result-error/return-result-error-from-function'
import { returnResultErrorFromAsyncFunction } from '../../src/return-result-error/return-result-error-from-async-function'
import { returnResultErrorFromSyncFunction } from '../../src/return-result-error/return-result-error-from-sync-function'

test('returnResultErrorFromFunction(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnResultErrorFromFunction(fn)(value)
  const expected = returnResultErrorFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultErrorFromFunction(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnResultErrorFromFunction(fn)(value)
  const expected = returnResultErrorFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultErrorFromFunction(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResultErrorFromFunction(fn)(value)
  const expected = await returnResultErrorFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResultErrorFromFunction(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResultErrorFromFunction(fn)(value)
  const expected = await returnResultErrorFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
