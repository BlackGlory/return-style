import { isPromise } from 'extra-promise'
import { getError } from '../../src/error/get-error'
import { returnError } from '../../src/error/return-error'
import { getErrorPromise } from '../../src/error/get-error-promise'

test('getError(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = getError(() => fn(value))
  const expected = returnError(fn)(value)

  expect(result).toEqual(expected)
})

test('getError(fn, defaultValue)', () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => x
  const result = getError(() => fn(value), defaultValue)
  const expected = returnError(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('getError(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = getError(() => fn(value))
  const expected = returnError(fn)(value)

  expect(result).toEqual(expected)
})

test('getError(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => { throw x }
  const result = getError(() => fn(value), defaultValue)
  const expected = returnError(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('getError(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = getError(() => fn(value))
  const expected = returnError(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(asyncFn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = getError(() => fn(value), defaultValue)
  const expected = returnError(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = getError(() => fn(value))
  const expected = returnError(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = getError(() => fn(value), defaultValue)
  const expected = returnError(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(result))
  expect(await result).toBe(await expected)
})

test('getError(resolvedPromise)', async () => {
  const fn = () => Promise.resolve('result')
  const result = getError(fn())
  const expected = getErrorPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(resolvedPromise, defaultValue)', async () => {
  const fn = () => Promise.resolve('result')
  const defaultValue = 'default'
  const result = getError(fn(), defaultValue)
  const expected = getErrorPromise(fn(), defaultValue)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(rejectedPromise)', async () => {
  const fn = () => Promise.reject('error')
  const result = getError(fn())
  const expected = getErrorPromise(fn())

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getError(rejectedPromise, defaultValue)', async () => {
  const fn = () => Promise.reject('error')
  const defaultValue = 'default'
  const result = getError(fn(), defaultValue)
  const expected = getErrorPromise(fn(), defaultValue)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})
