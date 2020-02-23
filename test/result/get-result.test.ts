import { isPromise } from '../../src/utils/is-promise'
import { getResult } from '../../src/result/get-result'
import { getResultPromise } from '../../src/result/get-result-promise'
import { returnResult } from '../../src/result/return-result'

test('getResult(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = getResult(() => fn(value))
  const expected = returnResult(fn)(value)

  expect(result).toBe(expected)
})

test('getResult(fn, defaultValue)', () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => x
  const result = getResult(() => fn(value), defaultValue)
  const expected = returnResult(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getResult(fn) fn throws error', () => {
  const value = 'result'
  const fn = (x: string) => { throw x }
  const result = getResult(() => fn(value))
  const expected = returnResult(fn)(value)

  expect(result).toBe(expected)
})

test('getResult(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => { throw x }
  const result = getResult(() => fn(value), defaultValue)
  const expected = returnResult(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getResult(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = getResult(() => fn(value))
  const expected = returnResult(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResult(asyncFn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = getResult(() => fn(value), defaultValue)
  const expected = returnResult(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResult(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = getResult(() => fn(value))
  const expected = returnResult(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResult(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = getResult(() => fn(value), defaultValue)
  const expected = returnResult(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResult(resolvedPromise)', async () => {
  const fn = () => Promise.resolve('result')
  const result = getResult(fn())
  const expected = getResultPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(resolvedPromise, defaultValue)', async () => {
  const fn = () => Promise.resolve('result')
  const defaultValue = 'default'
  const result = getResult(fn(), defaultValue)
  const expected = getResultPromise(fn(), defaultValue)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(rejectedPromise)', async () => {
  const fn = () => Promise.reject('error')
  const result = getResult(fn())
  const expected = getResultPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(rejectedPromise, defaultValue)', async () => {
  const fn = () => Promise.reject('error')
  const defaultValue = 'default'
  const result = getResult(fn(), defaultValue)
  const expected = getResultPromise(fn(), defaultValue)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})
