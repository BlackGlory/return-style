import { returnResultFromAsyncConstructor } from '../../src/return-result/return-result-from-async-constructor'
import { isPromise } from 'extra-promise'

test('returnResultFromAsyncConstructor(asyncFn)', async () => {
  const result = returnResultFromAsyncConstructor(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromAsyncConstructor(asyncFn, defaultValue)', async () => {
  const result = returnResultFromAsyncConstructor(Promise, Promise.resolve('default'))(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromAsyncConstructor(asyncFn) asyncfn throws error', async () => {
  const result = returnResultFromAsyncConstructor(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultFromAsyncConstructor(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = returnResultFromAsyncConstructor(Promise, Promise.resolve('default'))((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('returnResultFromAsyncConstructor(fn)', async () => {
  const result = (returnResultFromAsyncConstructor as any)(URL)('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('result.com')
})

test('returnResultFromAsyncConstructor(fn, defaultValue)', async () => {
  const result = (returnResultFromAsyncConstructor as any)(URL, new URL('https://default.com'))('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('result.com')
})

test('returnResultFromAsyncConstructor(fn) fn throws error', async () => {
  const result = (returnResultFromAsyncConstructor as any)(URL)('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultFromAsyncConstructor(fn, defaultValue) fn throws error', async () => {
  const result = (returnResultFromAsyncConstructor as any)(URL, new URL('https://default.com'))('error')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('default.com')
})
