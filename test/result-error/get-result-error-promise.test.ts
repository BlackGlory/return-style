import { isPromise } from 'extra-promise'
import { getResultErrorPromise } from '../../src/result-error/get-result-error-promise'

test('getResultErrorPromise(resolvedPromise)', async () => {
  const result = getResultErrorPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('getResultErrorPromise(rejectedPromise)', async () => {
  const result = getResultErrorPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})
