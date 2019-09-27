import { returnResult, returnResultFromFunction, returnResultFromPromise } from '../../src/return-result'

test('returnResult(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnResult(promise)
  const expected = await returnResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResult(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnResult(promise)
  const expected = await returnResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResult(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnResult(fn)(value)
  const expected = await returnResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnResult(fn)(value)
  const expected = await returnResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})
