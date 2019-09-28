import { returnResultErrorFromSyncFunction } from '../../src/return-result-error/return-result-error-from-sync-function'
import { isPromise } from 'extra-promise'

test('returnResultErrorFromSyncFunction(fn)', () => {
  const result = returnResultErrorFromSyncFunction((x: string) => x)('result')

  expect(result).toEqual(['result', null])
})

test('returnResultErrorFromSyncFunction(fn) fn throws error', () => {
  const result = returnResultErrorFromSyncFunction((x: string) => { throw x })('error')

  expect(result).toEqual([null, 'error'])
})

test('returnResultErrorFromSyncFunction(asyncFn)', async () => {
  const result = returnResultErrorFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(result).toBeInstanceOf(Array)
  expect(isPromise(result[0])).toBeTruthy()
  expect(await result[0]).toBe('result')
  expect(result[1]).toBeNull()
})

test('returnResultErrorFromSyncFunction(asyncFn) asyncFn throws error', async done => {
  const result = returnResultErrorFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(result).toBeInstanceOf(Array)
  expect(isPromise(result[0])).toBeTruthy()
  try {
    await result[0]
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
  }
  expect(result[1]).toBeNull()
  done()
})
