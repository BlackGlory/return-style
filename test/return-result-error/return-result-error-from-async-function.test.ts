import { returnResultErrorFromAsyncFunction } from '../../src/return-result-error/return-result-error-from-async-function'
import { isPromise } from 'extra-promise'

test('returnResultErrorFromAsyncFunction(asyncFn)', async () => {
  const result = returnResultErrorFromAsyncFunction((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorFromAsyncFunction(asyncFn) asyncFn throws error', async () => {
  const result = returnResultErrorFromAsyncFunction((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})

test('returnResultErrorFromAsyncFunction(fn)', async () => {
  const result = (returnResultErrorFromAsyncFunction as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorFromAsyncFunction(fn) fn throws error', async () => {
  const result = (returnResultErrorFromAsyncFunction as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})
