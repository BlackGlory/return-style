import { isPromise } from 'extra-promise'
import { returnResultErrorAsync } from '../../src/result-error/return-result-error-async'

test('returnResultErrorAsync(asyncFn)', async () => {
  const result = returnResultErrorAsync((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorAsync(asyncFn) asyncFn throws error', async () => {
  const result = returnResultErrorAsync((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})

test('returnResultErrorAsync(fn)', async () => {
  const result = (returnResultErrorAsync as any)((x: string) => x)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorAsync(fn) fn throws error', async () => {
  const result = (returnResultErrorAsync as any)((x: string) => { throw x })('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})
