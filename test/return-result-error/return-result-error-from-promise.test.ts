import { isPromise } from 'extra-promise'
import { returnResultErrorFromPromise } from '../../src/return-result-error/return-result-error-from-promise'

test('returnResultErrorFromPromise(resolvedPromise)', async () => {
  const result = returnResultErrorFromPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorFromPromise(rejectedPromise)', async () => {
  const result = returnResultErrorFromPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})
