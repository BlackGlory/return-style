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
  const [err, res] = returnErrorResultFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  expect(await res).toBe('result')
})

test('returnErrorResultFromSyncFunction(asyncFn) asyncFn throws error', async done => {
  const [err, res] = returnErrorResultFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  try {
    await res
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
