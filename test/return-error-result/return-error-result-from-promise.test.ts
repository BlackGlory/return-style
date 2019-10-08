import { isPromise } from 'extra-promise'
import { returnErrorResultFromPromise } from '../../src/return-error-result/return-error-result-from-promise'

test('returnErrorResultFromPromise(resolvedPromise)', async () => {
  const result = returnErrorResultFromPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultFromPromise(rejectedPromise)', async () => {
  const result = returnErrorResultFromPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})
