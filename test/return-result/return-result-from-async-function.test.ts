import { returnResultFromAsyncFunction } from '../../src/return-result/return-result-from-async-function'
import { isPromise } from 'extra-promise'

test('returnResultFromAsyncFunction(asyncFn)', async () => {
  const result = returnResultFromAsyncFunction((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromAsyncFunction(asyncFn) asyncFn throws error', async () => {
  const result = returnResultFromAsyncFunction((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultFromAsyncFunction(fn)', async () => {
  const result = (returnResultFromAsyncFunction as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromAsyncFunction(fn) fn throws error', async () => {
  const result = (returnResultFromAsyncFunction as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})
