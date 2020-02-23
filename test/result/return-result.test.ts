import { isPromise } from '../../src/utils/is-promise'
import { returnResult } from '../../src/result/return-result'
import { returnResultAsync } from '../../src/result/return-result-async'
import { returnResultSync } from '../../src/result/return-result-sync'

test('returnResult(fn)', () => {
  const value = 'result'
  const fn = (x: string) => x
  const result = returnResult(fn)(value)
  const expected = returnResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn, defaultValue)', () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => x
  const result = returnResult(fn, defaultValue)(value)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn) fn throws error', () => {
  const value = 'result'
  const fn = (x: string) => { throw x }
  const result = returnResult(fn)(value)
  const expected = returnResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => { throw x }
  const result = returnResult(fn, defaultValue)(value)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnResult(asyncFn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResult(fn)(value)
  const expected = await returnResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResult(asyncFn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = returnResult(fn, defaultValue)(value)
  const expected = await returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe(expected)
})

test('returnResult(asyncFn) asyncFn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResult(fn)(value)
  const expected = await returnResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('returnResult(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = returnResult<string>(fn, defaultValue)(value)
  const expected = await returnResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
