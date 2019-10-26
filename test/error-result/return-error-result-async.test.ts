import { isPromise } from 'extra-promise'
import { returnErrorResultAsync } from '../../src/error-result/return-error-result-async'

test('returnErrorResultAsync(asyncFn)', async () => {
  const result = returnErrorResultAsync((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultAsync(asyncFn) asyncFn throws error', async () => {
  const result = returnErrorResultAsync((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})

test('returnErrorResultAsync(fn)', async () => {
  const result = (returnErrorResultAsync as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultAsync(fn) fn throws error', async () => {
  const result = (returnErrorResultAsync as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})
