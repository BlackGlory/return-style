import { returnResultFromSyncFunction } from '../../src/return-result/return-result-from-sync-function'
import { isPromise } from 'extra-promise'

test('returnResultFromSyncFunction(fn)', () => {
  const result = returnResultFromSyncFunction((x: string) => x)('result')

  expect(result).toBe('result')
})

test('returnResultFromSyncFunction(fn) fn throws error', () => {
  const result = returnResultFromSyncFunction((x: string) => { throw x })('error')

  expect(result).toBeNull()
})

test('returnResultFromSyncFunction(asyncFn)', async () => {
  const result = returnResultFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromSyncFunction(asyncFn) asyncFn throws error', async done => {
  const result = returnResultFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  try {
    await result
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
