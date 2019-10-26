import { isPromise } from 'extra-promise'
import { getResultErrorSync } from '../../src/result-error/get-result-error-sync'
import { returnResultErrorSync } from '../../src/result-error/return-result-error-sync'

test('getResultErrorSync(fn)', () => {
  const fn = (x: string) => x
  const value = 'result'
  const result = getResultErrorSync(() => fn(value))
  const expected = returnResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('getResultErrorSync(fn) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const value = 'error'
  const result = getResultErrorSync(() => fn(value))
  const expected = returnResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('getResultErrorSync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getResultErrorSync(() => fn(value))
  const expected = returnResultErrorSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(expected)
})

test('getResultErrorSync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getResultErrorSync(() => fn(value))
  const expected = returnResultErrorSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  void (result as any)[0].catch(() => {})
  void (expected as any)[0].catch(() => {})
  expect(await result).toEqual(expected)
})
