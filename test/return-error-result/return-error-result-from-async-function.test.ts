import { returnErrorResultFromAsyncFunction } from '../../src/return-error-result/return-error-result-from-async-function'
import { isPromise } from 'extra-promise'

test('returnErrorResultFromAsyncFunction(asyncFn)', async () => {
  const result = returnErrorResultFromAsyncFunction((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultFromAsyncFunction(asyncFn) asyncFn throws error', async () => {
  const result = returnErrorResultFromAsyncFunction((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})

test('returnErrorResultFromAsyncFunction(fn)', async () => {
  const result = (returnErrorResultFromAsyncFunction as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultFromAsyncFunction(fn) fn throws error', async () => {
  const result = (returnErrorResultFromAsyncFunction as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})
