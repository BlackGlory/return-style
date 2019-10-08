import { returnErrorResultFromSyncConstructor } from '../../src/return-error-result/return-error-result-from-sync-constructor'

test('returnErrorResultFromSyncConstructor(fn)', () => {
  const [err, res] = returnErrorResultFromSyncConstructor(URL)('https://result.com')

  expect(err).toBeNull()
  expect(res!.host).toBe('result.com')
})

test('returnErrorResultFromSyncConstructor(fn) fn throws error', () => {
  const [err, res] = returnErrorResultFromSyncConstructor<TypeError, URL>(URL)('error')

  expect(err!.name).toBe('TypeError')
  expect(res).toBeNull()
})
