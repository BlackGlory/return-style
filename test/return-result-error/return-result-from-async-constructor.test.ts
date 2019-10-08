import { returnResultErrorFromAsyncConstructor } from '../../src/return-result-error/return-result-error-from-async-constructor'
import { isPromise } from 'extra-promise'

test('returnResultErrorFromAsyncConstructor(asyncFn)', async () => {
  const result = returnResultErrorFromAsyncConstructor(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('returnResultErrorFromAsyncConstructor(asyncFn) asyncFn throws error', async () => {
  const result = returnResultErrorFromAsyncConstructor(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})

test('returnResultErrorFromAsyncConstructor(fn)', async () => {
  const result = (returnResultErrorFromAsyncConstructor as any)(URL)('https://result.com')
  const [res, err] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err).toBeNull()
  expect(res.host).toEqual('result.com')
})

test('returnResultErrorFromAsyncConstructor(fn) fn throws error', async () => {
  const result = (returnResultErrorFromAsyncConstructor as any)(URL)('error')
  const [res, err] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err.name).toBe('TypeError')
  expect(res).toBeNull()
})
