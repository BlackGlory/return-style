import { isPromise } from '../../src/utils/is-promise'
import { returnError } from '../../src/error/return-error'
import { returnErrorSync } from '../../src/error/return-error-sync'
import { returnErrorAsync } from '../../src/error/return-error-async'

test('returnError(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnError(fn)(value)
  const expected = returnErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnError(fn, defaultValue)', () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => x
  const result = returnError(fn, defaultValue)(value)
  const expected = returnErrorSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnError(fn) fn throws error', () => {
  const value = 'error'
  const fn = (x: string) => { throw x }
  const result = returnError(fn)(value)
  const expected = returnError(fn)(value)

  expect(result).toEqual(expected)
})

test('returnError(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => { throw x }
  const result = returnError(fn, defaultValue)(value)
  const expected = returnError(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnError(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnError(fn)(value)
  const expected = await returnErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnError(asyncFn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnError(fn, defaultValue)(value)
  const expected = await returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnError(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnError(fn)(value)
  const expected = await returnErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnError(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = returnError(fn, defaultValue)(value)
  const expected = await returnErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
