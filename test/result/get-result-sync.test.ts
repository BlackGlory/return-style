import { isPromise } from 'extra-promise'
import { getResultSync } from '../../src/result/get-result-sync'
import { returnResultSync } from '../../src/result/return-result-sync'

test('getResultSync(fn)', () => {
  const fn = (x: string) => x
  const value = 'result'
  const result = getResultSync(() => fn(value))
  const expected = returnResultSync(fn)(value)

  expect(result).toBe(expected)
})

test('getResultSync(fn, defaultValue)', () => {
  const fn = (x: string) => x
  const defaultValue = 'default'
  const value = 'result'
  const result = getResultSync(() => fn(value), defaultValue)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getResultSync(fn) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const value = 'error'
  const result = getResultSync(() => fn(value))
  const expected = returnResultSync(fn)(value)

  expect(result).toBe(expected)
})

test('getResultSync(fn, defaultValue) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const defaultValue = 'default'
  const value = 'error'
  const result = getResultSync(() => fn(value), defaultValue)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getResultSync(asyncFn)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getResultSync(() => fn(value))
  const expected = returnResultSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultSync(asyncFn, defaultValue)', async () => {
  const fn = (x: string) => Promise.resolve(x)
  const defaultValue: any = 'default'
  const value = 'result'
  const result = getResultSync(() => fn(value), defaultValue)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result).toBe(await expected)
})

test('getResultSync(asyncFn) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getResultSync(() => fn(value))
  const expected = returnResultSync(fn)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result!.catch((x: any) => x)).toEqual(await expected!.catch((x: any) => x))
})

test('getResultSync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const fn = (x: string) => Promise.reject(x)
  const defaultValue: any = 'default'
  const value = 'error'
  const result = getResultSync(() => fn(value), defaultValue)
  const expected = returnResultSync(fn, defaultValue)(value)

  expect(isPromise(result)).toBe(isPromise(expected))
  expect(await result.catch((x: any) => x)).toEqual(await expected.catch((x: any) => x))
})
