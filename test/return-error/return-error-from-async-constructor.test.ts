import { returnErrorFromAsyncConstructor } from '../../src/return-error/return-error-from-async-constructor'
import { isPromise } from 'extra-promise'

test('returnErrorFromAsyncConstructor(asyncFn)', async () => {
  const result = returnErrorFromAsyncConstructor(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorFromAsyncConstructor(asyncFn) asyncFn throws error', async () => {
  const result = returnErrorFromAsyncConstructor(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('returnErrorFromAsyncConstructor(fn)', async () => {
  const result = (returnErrorFromAsyncConstructor as any)(URL)('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnErrorFromAsyncConstructor(fn) fn throws error', async () => {
  const result = (returnErrorFromAsyncConstructor as any)(URL)('error')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).name).toBe('TypeError')
})
