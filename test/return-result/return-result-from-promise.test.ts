import { returnResultFromPromise } from '../../src/return-result/return-result-from-promise'

test('returnResultFromPromise(resolvedPromise)', async () => {
  const result = await returnResultFromPromise(Promise.resolve('result'))

  expect(result).toBe('result')
})

test('returnResultFromPromise(rejectedPromise)', async () => {
  const result = await returnResultFromPromise(Promise.reject('error'))

  expect(result).toBeNull()
})
