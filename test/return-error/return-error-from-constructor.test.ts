import { isPromise } from 'extra-promise'
import { returnErrorFromConstructor } from '../../src/return-error/return-error-from-constructor'
import { returnErrorFromAsyncConstructor } from '../../src/return-error/return-error-from-async-constructor'
import { returnErrorFromSyncConstructor } from '../../src/return-error/return-error-from-sync-constructor'

test('returnErrorFromConstructor(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = returnErrorFromConstructor(fn)(value)
  const expected = returnErrorFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorFromConstructor(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = returnErrorFromConstructor(fn)(value)
  const expected = returnErrorFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorFromConstructor(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = returnErrorFromConstructor(fn)(value)
  const expected = await returnErrorFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorFromConstructor(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = returnErrorFromConstructor(fn)(value)
  const expected = await returnErrorFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
