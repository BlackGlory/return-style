import { returnErrorFromSyncFunction } from '../../src/return-error/return-error-from-sync-function'

test('returnErrorFromSyncFunction(fn)', () => {
  const result = returnErrorFromSyncFunction((x: string) => x)('result')

  expect(result).toBeNull()
})

test('returnErrorFromSyncFunction(fn) fn throws error', () => {
  const result = returnErrorFromSyncFunction((x: string) => { throw x })('error')

  expect(result).toBe('error')
})

test('returnErrorFromSyncFunction(asyncFn)', () => {
  const result = returnErrorFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(result).toBeNull()
})

test('returnErrorFromSyncFunction(asyncFn) asyncFn throws error', () => {
  const result = returnErrorFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(result).toBeNull()
})
