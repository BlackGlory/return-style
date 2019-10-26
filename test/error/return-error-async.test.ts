import { isPromise } from 'extra-promise'
import { returnErrorAsync } from '../../src/error/return-error-async'

test('returnErrorAsync(asyncFn)', async () => {
  const result = returnErrorAsync((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorAsync(asyncFn, defaultValue)', async () => {
  const result = returnErrorAsync((x: string) => Promise.resolve(x), 'default')('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('returnErrorAsync(asyncFn) asyncFn throws error', async () => {
  const result = returnErrorAsync((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('returnErrorAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = returnErrorAsync((x: string) => Promise.reject(x), 'default')('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('returnErrorAsync(fn)', async () => {
  const result = (returnErrorAsync as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorAsync(fn, defaultValue)', async () => {
  const result = (returnErrorAsync as any)((x: string) => x, 'default')('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('returnErrorAsync(fn) fn throws error', async () => {
  const result = (returnErrorAsync as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('returnErrorAsync(fn, defaultValue) fn throws error', async () => {
  const result = (returnErrorAsync as any)((x: string) => { throw x }, 'default')('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})
