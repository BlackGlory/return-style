import { isPromise } from 'extra-promise'
import { getErrorResult } from '../../src/error-result/get-error-result'
import { getErrorResultPromise } from '../../src/error-result/get-error-result-promise'
import { returnErrorResult } from '../../src/error-result/return-error-result'

test('getErrorResult(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = getErrorResult(() => fn(value))
  const expected = returnErrorResult(fn)(value)

  expect(result).toEqual(expected)
})

test('getErrorResult(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = getErrorResult(() => fn(value))
  const expected = returnErrorResult(fn)(value)

  expect(result).toEqual(expected)
})

test('getErrorResult(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = getErrorResult(() => fn(value))
  const expected = returnErrorResult(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResult(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = getErrorResult(() => fn(value))
  const expected = returnErrorResult(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResult(resolvedPromise)', async () => {
  const fn = () => Promise.resolve('result')
  const result = getErrorResult(fn())
  const expected = getErrorResultPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})

test('getErrorResult(rejectedPromise)', async () => {
  const fn = () => Promise.reject('result')
  const result = getErrorResult(fn())
  const expected = getErrorResultPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toEqual(await expected)
})
