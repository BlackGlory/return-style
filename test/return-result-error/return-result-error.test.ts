import { returnResultError } from '../../src/return-result-error/return-result-error'
import { returnResultErrorFromFunction } from '../../src/return-result-error/return-result-error-from-function'
import { returnResultErrorFromPromise } from '../../src/return-result-error/return-result-error-from-promise'

test('returnResultError(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnResultError(promise)
  const expected = await returnResultErrorFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResultError(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnResultError(promise)
  const expected = await returnResultErrorFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResultError(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnResultError(fn)(value)
  const expected = await returnResultErrorFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultError(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnResultError(fn)(value)
  const expected = await returnResultErrorFromFunction(fn)(value)

  expect(result).toEqual(expected)
})
