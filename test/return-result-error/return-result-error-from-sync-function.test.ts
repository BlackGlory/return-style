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
  const [res, err] = returnResultErrorFromSyncFunction((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  expect(await res).toBe('result')
})

test('returnResultErrorFromSyncFunction(asyncFn) asyncFn throws error', async done => {
  const [res, err] = returnResultErrorFromSyncFunction((x: string) => Promise.reject(x))('error')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  try {
    await res
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
  }
  done()
})
