import { returnErrorResultFromPromise } from '../../src/return-error-result/return-error-result-from-promise'

test('returnErrorResultFromPromise(resolvedPromise)', async () => {
  const [err, res] = await returnErrorResultFromPromise(Promise.resolve('result'))

  expect(err).toBeNull()
  expect(res).toBe('result')
})

test('returnErrorResultFromPromise(rejectedPromise)', async () => {
  const [err, res] = await returnErrorResultFromPromise(Promise.reject('error'))

  expect(err).toBe('error')
  expect(res).toBeNull()
})
