import { returnResultFromSyncConstructor } from '../../src/return-result/return-result-from-sync-constructor'

test('returnResultFromSyncConstructor(fn)', () => {
  const result = returnResultFromSyncConstructor(URL)('https://result.com')

  expect(result!.host).toBe('result.com')
})

test('returnResultFromSyncConstructor(fn, defaultValue)', () => {
  const result = returnResultFromSyncConstructor(URL, new URL('https://default.com'))('https://result.com')

  expect(result.host).toBe('result.com')
})

test('returnResultFromSyncConstructor(fn) fn throws error', () => {
  const result = returnResultFromSyncConstructor(URL)('error')

  expect(result).toBeNull()
})

test('returnResultFromSyncConstructor(fn, defaultValue) fn throws error', () => {
  const result = returnResultFromSyncConstructor(URL, new URL('https://default.com'))('error')

  expect(result).not.toBeNull()
  expect(result.host).toBe('default.com')
})
