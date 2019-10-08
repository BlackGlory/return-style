import { isPromise } from 'extra-promise'
import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'
import { returnResultFromAsyncFunction } from '../../src/return-result/return-result-from-async-function'
import { returnResultFromSyncFunction } from '../../src/return-result/return-result-from-sync-function'

test('returnResultFromFunction(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnResultFromFunction(fn)(value)
  const expected = returnResultFromSyncFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultFromFunction(fn, defaultValue)', () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => x
  const result = returnResultFromFunction(fn, defaultValue)(value)
  const expected = returnResultFromSyncFunction(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnResultFromFunction(fn) fn throws error', () => {
  const value = 'result'
  const fn = (x: string) => { throw x }
  const result = returnResultFromFunction(fn)(value)
  const expected = returnResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResultFromFunction(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => { throw x }
  const result = returnResultFromFunction(fn, defaultValue)(value)
  const expected = returnResultFromFunction(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnResultFromFunction(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResultFromFunction(fn)(value)
  const expected = await returnResultFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResultFromFunction(asyncFn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResultFromFunction(fn, defaultValue)(value)
  const expected = await returnResultFromAsyncFunction(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe(expected)
})

test('returnResultFromFunction(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResultFromFunction(fn)(value)
  const expected = await returnResultFromAsyncFunction(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResultFromFunction(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResultFromFunction<string>(fn, defaultValue)(value)
  const expected = await returnResultFromAsyncFunction(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
