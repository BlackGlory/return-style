import { returnErrorFromSyncConstructor } from '../../src/return-error/return-error-from-sync-constructor'

test('returnErrorFromSyncConstructor(fn)', () => {
  const result = returnErrorFromSyncConstructor(URL)('https://result.com')

  expect(result).toBeNull()
})

test('returnErrorFromSyncConstructor(fn) fn throws error', () => {
  const result = returnErrorFromSyncConstructor<TypeError>(URL)('error')

  expect(result!.name).toBe('TypeError')
})

test('returnErrorFromSyncConstructor(asyncFn)', () => {
  const result = returnErrorFromSyncConstructor(Promise)(resolve => resolve('result'))

  expect(result).toBeNull()
})

test('returnErrorFromSyncConstructor(asyncFn) asyncFn throws error', () => {
  const result = returnErrorFromSyncConstructor(Promise)((_, reject) => reject('error'))

  expect(result).toBeNull()
})
