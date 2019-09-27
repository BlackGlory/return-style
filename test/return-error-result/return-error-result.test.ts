import { returnErrorResult } from '../../src/return-error-result/return-error-result'
import { returnErrorResultFromFunction } from '../../src/return-error-result/return-error-result-from-function'
import { returnErrorResultFromPromise } from '../../src/return-error-result/return-error-result-from-promise'

test('returnErrorResult(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnErrorResult(promise)
  const expected = await returnErrorResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnErrorResult(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnErrorResult(promise)
  const expected = await returnErrorResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnErrorResult(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnErrorResult(fn)(value)
  const expected = await returnErrorResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnErrorResult(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnErrorResult(fn)(value)
  const expected = await returnErrorResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})
