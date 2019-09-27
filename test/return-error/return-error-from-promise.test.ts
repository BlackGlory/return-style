import { returnErrorFromPromise } from '../../src/return-error/return-error-from-promise'

test('returnErrorFromPromise(resolvedPromise)', async () => {
  const result = await returnErrorFromPromise<never>(Promise.resolve('result'))

  expect(result).toBeNull()
})

test('returnErrorFromPromise(rejectedPromise)', async () => {
  const result = await returnErrorFromPromise<string>(Promise.reject('error'))

  expect(result).toBe('error')
})
