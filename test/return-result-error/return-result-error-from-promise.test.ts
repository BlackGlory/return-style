import { returnResultErrorFromPromise } from '../../src/return-result-error/return-result-error-from-promise'

test('returnResultErrorFromPromise(resolvedPromise)', async () => {
  const [res, err] = await returnResultErrorFromPromise(Promise.resolve('result'))

  expect(res).toBe('result')
  expect(err).toBeNull()
})

test('returnResultErrorFromPromise(rejectedPromise)', async () => {
  const [res, err] = await returnResultErrorFromPromise(Promise.reject('error'))

  expect(res).toBeNull()
  expect(err).toBe('error')
})
