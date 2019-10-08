import { isPromise } from 'extra-promise'
import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'
import { returnErrorFromSyncFunction } from '../../src/return-error/return-error-from-sync-function'
import { returnErrorFromAsyncFunction } from '../../src/return-error/return-error-from-async-function'

test('returnErrorFromFunction(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnErrorFromFunction(fn)(value)
  const expected = returnErrorFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorFromFunction(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnErrorFromFunction(fn)(value)
  const expected = returnErrorFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorFromFunction(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnErrorFromFunction(fn)(value)
  const expected = await returnErrorFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorFromFunction(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnErrorFromFunction(fn)(value)
  const expected = await returnErrorFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
