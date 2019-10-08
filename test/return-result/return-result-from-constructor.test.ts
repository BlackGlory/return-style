import { isPromise } from 'extra-promise'
import { returnResultFromConstructor } from '../../src/return-result/return-result-from-constructor'
import { returnResultFromAsyncConstructor } from '../../src/return-result/return-result-from-async-constructor'
import { returnResultFromSyncConstructor } from '../../src/return-result/return-result-from-sync-constructor'

test('returnErrorResultFromConstructor(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = returnResultFromConstructor(fn)(value)
  const expected = returnResultFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(fn, defaultValue)', () => {
  const value = 'https://result.com'
  const defaultValue = new URL('httsp://default.com')
  const fn = URL
  const result = returnResultFromConstructor(fn, defaultValue)(value)
  const expected = returnResultFromSyncConstructor(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = returnResultFromConstructor(fn)(value)
  const expected = returnResultFromSyncConstructor(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = new URL('https://default.com')
  const fn = URL
  const result = returnResultFromConstructor(fn, defaultValue)(value)
  const expected = returnResultFromSyncConstructor(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = returnResultFromConstructor(fn)(value)
  const expected = await returnResultFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn, defaultValue)', async () => {
  const value = (resolve: any) => resolve('result')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = returnResultFromConstructor(fn, defaultValue)(value)
  const expected = await returnResultFromAsyncConstructor(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = returnResultFromConstructor(fn)(value)
  const expected = await returnResultFromAsyncConstructor(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnErrorResultFromConstructor(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = returnResultFromConstructor(fn, defaultValue)(value)
  const expected = await returnResultFromAsyncConstructor(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
