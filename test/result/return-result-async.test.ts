import { isPromise } from '../../src/utils/is-promise'
import { returnResultAsync } from '../../src/result/return-result-async'

test('returnResultAsync(asyncFn)', async () => {
  const result = returnResultAsync((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultAsync(asyncFn, defaultValue)', async () => {
  const result = returnResultAsync((x: string) => Promise.resolve(x), 'default')('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultAsync(asyncFn) asyncFn throws error', async () => {
  const result = returnResultAsync((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = returnResultAsync((x: string) => Promise.reject(x), 'default')('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('returnResultAsync(fn)', async () => {
  const result = (returnResultAsync as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultAsync(fn, defaultValue)', async () => {
  const result = (returnResultAsync as any)((x: string) => x, 'default')('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultAsync(fn) fn throws error', async () => {
  const result = (returnResultAsync as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultAsync(fn, defaultValue) fn throws error', async () => {
  const result = (returnResultAsync as any)((x: string) => { throw x }, 'default')('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})
