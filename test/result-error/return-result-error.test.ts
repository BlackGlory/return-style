import { isPromise } from '../../src/utils/is-promise'
import { returnResultError } from '../../src/result-error/return-result-error'
import { returnResultErrorAsync } from '../../src/result-error/return-result-error-async'
import { returnResultErrorSync } from '../../src/result-error/return-result-error-sync'

test('returnResultError(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnResultError(fn)(value)
  const expected = returnResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultError(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnResultError(fn)(value)
  const expected = returnResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultError(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResultError(fn)(value)
  const expected = await returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResultError(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResultError(fn)(value)
  const expected = await returnResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
