import { isPromise } from 'extra-promise'
import { returnResultErrorFromConstructor } from '../../src/return-result-error/return-result-error-from-constructor'
import { returnResultErrorFromAsyncConstructor } from '../../src/return-result-error/return-result-error-from-async-constructor'
import { returnResultErrorFromSyncConstructor } from '../../src/return-result-error/return-result-error-from-sync-constructor'

test('returnResultErrorFromConstructor(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = returnResultErrorFromConstructor(fn)(value)
  const expected = returnResultErrorFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultErrorFromConstructor(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = returnResultErrorFromConstructor(fn)(value)
  const expected = returnResultErrorFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultErrorFromConstructor(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = returnResultErrorFromConstructor(fn)(value)
  const expected = await returnResultErrorFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResultErrorFromConstructor(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = returnResultErrorFromConstructor(fn)(value)
  const expected = await returnResultErrorFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
