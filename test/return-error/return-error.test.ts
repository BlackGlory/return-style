import { returnError, returnErrorFromFunction, returnErrorFromPromise } from '../../src/return-error'

test('returnError(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnError<string>(promise)
  const expected = await returnErrorFromPromise<string>(promise)

  expect(result).toEqual(expected)
})

test('returnError(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnError<string>(promise)
  const expected = await returnErrorFromPromise<string>(promise)

  expect(result).toEqual(expected)
})

test('returnError(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnError<string>(fn)(value)
  const expected = await returnErrorFromFunction<string>(fn)(value)

  expect(result).toEqual(expected)
})

test('returnError(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnError<string>(fn)(value)
  const expected = await returnErrorFromFunction<string>(fn)(value)

  expect(result).toEqual(expected)
})
