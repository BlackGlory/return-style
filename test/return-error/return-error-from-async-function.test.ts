import { returnErrorFromAsyncFunction } from '../../src/return-error/return-error-from-async-function'
import { isPromise } from 'extra-promise'

test('returnErrorFromAsyncFunction(asyncFn)', async () => {
  const result = returnErrorFromAsyncFunction((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorFromAsyncFunction(asyncFn) asyncFn throws error', async () => {
  const result = returnErrorFromAsyncFunction((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('returnErrorFromAsyncFunction(fn)', async () => {
  const result = (returnErrorFromAsyncFunction as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorFromAsyncFunction(fn) fn throws error', async () => {
  const result = (returnErrorFromAsyncFunction as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})
