import { returnErrorResultFromAsyncConstructor } from '../../src/return-error-result/return-error-result-from-async-constructor'
import { isPromise } from 'extra-promise'

test('returnErrorResultFromAsyncConstructor(asyncFn)', async () => {
  const result = returnErrorResultFromAsyncConstructor(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('returnErrorResultFromAsyncConstructor(asyncfn) asyncFn throws error', async () => {
  const result = returnErrorResultFromAsyncConstructor(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})

test('returnErrorResultFromAsyncConstructor(fn)', async () => {
  const result = (returnErrorResultFromAsyncConstructor as any)(URL)('https://result.com')
  const [err, res] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err).toBeNull()
  expect(res.host).toBe('result.com')
})

test('returnErrorResultFromAsyncConstructor(fn) fn throws error', async () => {
  const result = (returnErrorResultFromAsyncConstructor as any)(URL)('error')
  const [err, res] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err.name).toBe('TypeError')
  expect(res).toBeNull()
})
