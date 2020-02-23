import { isPromise } from '../../src/utils/is-promise'
import { getResultError } from '../../src/result-error/get-result-error'
import { getResultErrorPromise } from '../../src/result-error/get-result-error-promise'
import { returnResultError } from '../../src/result-error/return-result-error'

test('getResultError(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = getResultError(() => fn(value))
  const expected = returnResultError(fn)(value)

  expect(result).toEqual(expected)
})

test('getResultError(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = getResultError(() => fn(value))
  const expected = returnResultError(fn)(value)

  expect(result).toEqual(expected)
})

test('getResultError(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = getResultError(() => fn(value))
  const expected = returnResultError(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultError(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = getResultError(() => fn(value))
  const expected = returnResultError(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultError(resolvedPromise)', async () => {
  const fn = () => Promise.resolve('result')
  const result = getResultError(fn())
  const expected = getResultErrorPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getResultError(rejectedPromise)', async () => {
  const fn = () => Promise.reject('error')
  const result = getResultError(fn())
  const expected = getResultErrorPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})
