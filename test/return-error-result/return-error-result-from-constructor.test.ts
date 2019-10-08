import { isPromise } from 'extra-promise'
import { returnErrorResultFromConstructor } from '../../src/return-error-result/return-error-result-from-constructor'
import { returnErrorResultFromAsyncConstructor } from '../../src/return-error-result/return-error-result-from-async-constructor'
import { returnErrorResultFromSyncConstructor } from '../../src/return-error-result/return-error-result-from-sync-constructor'

test('returnErrorResultFromConstructor(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = returnErrorResultFromConstructor(fn)(value)
  const expected = returnErrorResultFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = returnErrorResultFromConstructor(fn)(value)
  const expected = returnErrorResultFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = returnErrorResultFromConstructor(fn)(value)
  const expected = await returnErrorResultFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = returnErrorResultFromConstructor(fn)(value)
  const expected = await returnErrorResultFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
