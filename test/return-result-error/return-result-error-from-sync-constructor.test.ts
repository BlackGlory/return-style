import { returnResultErrorFromSyncConstructor } from '../../src/return-result-error/return-result-error-from-sync-constructor'

test('returnResultErrorFromSyncConstructor(fn)', () => {
  const [res, err] = returnResultErrorFromSyncConstructor(URL)('https://result.com')

  expect(err).toBeNull()
  expect(res!.host).toBe('result.com')
})

test('returnResultErrorFromSyncConstructor(fn)', () => {
  const [res, err] = returnResultErrorFromSyncConstructor<TypeError, URL>(URL)('error')

  expect(err!.name).toBe('TypeError')
  expect(res).toBeNull()
})
