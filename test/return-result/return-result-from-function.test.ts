import { isPromise } from 'extra-promise'
import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'

test('returnResultFromFunction(fn)', () => {
  const result = returnResultFromFunction<string>((x: string) => x)('result')

  expect(result).toBe('result')
})

test('returnResultFromFunction(fn, defaultValue)', () => {
  const result = returnResultFromFunction<string>((x: string) => x, 'default')('result')

  expect(result).toBe('result')
})

test('returnResultFromFunction(fn) fn throws error', () => {
  const result = returnResultFromFunction<string>((x: string) => { throw x })('error')

  expect(result).toBeNull()
})

test('returnResultFromFunction(fn, defaultValue) fn throws error', () => {
  const result = returnResultFromFunction<string>((x: string) => { throw x }, 'default')('error')

  expect(result).toBe('default')
})

test('returnResultFromFunction(asyncFn)', async () => {
  const result = returnResultFromFunction<string>((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromFunction(asyncFn, defaultValue)', async () => {
  const result = returnResultFromFunction<string>((x: string) => Promise.resolve(x), 'default')('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromFunction(asyncFn) asyncFn throws error', async () => {
  const result = returnResultFromFunction<string>((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultFromFunction(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = returnResultFromFunction<string>((x: string) => Promise.reject(x), 'default')('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})
