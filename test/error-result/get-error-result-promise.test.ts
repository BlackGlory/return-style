import { isPromise } from '../../src/utils/is-promise'
import { getErrorResultPromise } from '../../src/error-result/get-error-result-promise'

test('getErrorResultPromise(resolvedPromise)', async () => {
  const result = getErrorResultPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('getErrorResultPromise(rejectedPromise)', async () => {
  const result = getErrorResultPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})
