import { returnError } from '../../src/return-error/return-error'
import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'
import { returnErrorFromPromise } from '../../src/return-error/return-error-from-promise'

test('returnError(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnError<string>(promise)
  const expected = await returnErrorFromPromise<string>(promise)

  expect(result).toEqual(expected)
})

test('returnError(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnError<string>(promise)
  const expected = await returnErrorFromPromise<string>(promise)

  expect(result).toEqual(expected)
})

test('returnError(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnError<string>(fn)(value)
  const expected = returnErrorFromFunction<string>(fn)(value)

  expect(result).toEqual(expected)
})

test('returnError(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnError<string>(fn)(value)
  const expected = returnErrorFromFunction<string>(fn)(value)

  expect(result).toEqual(expected)
})
