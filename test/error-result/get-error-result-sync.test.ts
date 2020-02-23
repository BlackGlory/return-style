import { isPromise } from '../../src/utils/is-promise'
import { getErrorResultSync } from '../../src/error-result/get-error-result-sync'
import { returnErrorResultSync } from '../../src/error-result/return-error-result-sync'

test('getErrorResultSync(fn)', () => {
  const fn = (x: string) => x
  const value = 'result'
  const result = getErrorResultSync(() => fn(value))
  const expected = returnErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('getErrorResultSync(fn) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const value = 'error'
  const result = getErrorResultSync(() => fn(value))
  const expected = returnErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('getErrorResultSync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getErrorResultSync(() => fn(value))
  const expected = returnErrorResultSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResultSync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getErrorResultSync(() => fn(value))
  const expected = returnErrorResultSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  void (result as any)[1].catch(() => {})
  void (expected as any)[1].catch(() => {})
  expect(await result).toEqual(await expected)
})
