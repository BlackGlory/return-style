import { returnErrorResultFromSyncFunction } from '../../src/return-error-result/return-error-result-from-sync-function'
import { isPromise } from 'extra-promise'

test('returnErrorResultFromSyncFunction(fn)', () => {
  const result = returnErrorResultFromSyncFunction((x: string) => x)('result')

  expect(result).toEqual([null, 'result'])
})

test('returnErrorResultFromSyncFunction(fn) fn throws error', () => {
  const result = returnErrorResultFromSyncFunction((x: string) => { throw x })('error')

  expect(result).toEqual(['error', null])
})

test('returnErrorResultFromSyncFunction(asyncFn)', async () => {
  const result = returnErrorResultFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(result).toBeInstanceOf(Array)
  expect(result[0]).toBeNull()
  expect(isPromise(result[1])).toBeTruthy()
  expect(await result[1]).toBe('result')
})

test('returnErrorResultFromSyncFunction(asyncFn) asyncFn throws error', async done => {
  const result = returnErrorResultFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(result).toBeInstanceOf(Array)
  expect(result[0]).toBeNull()
  expect(isPromise(result[1])).toBeTruthy()
  try {
    await result[1]
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
