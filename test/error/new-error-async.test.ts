import { isPromise } from '../../src/utils/is-promise'
import { newErrorAsync } from '../../src/error/new-error-async'

test('newErrorAsync(asyncFn)', async () => {
  const result = newErrorAsync(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('newErrorAsync(asyncFn, defaultValue)', async () => {
  const result = newErrorAsync(Promise, 'default')(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('newErrorAsync(asyncFn) asyncFn throws error', async () => {
  const result = newErrorAsync(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('newErrorAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = newErrorAsync(Promise, 'default')((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('newErrorAsync(fn)', async () => {
  const result = (newErrorAsync as any)(URL)('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('newErrorAsync(fn, defaultValue)', async () => {
  const result = (newErrorAsync as any)(URL, new URL('https://default.com'))('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('default.com')
})

test('newErrorAsync(fn) fn throws error', async () => {
  const result = (newErrorAsync as any)(URL)('error')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).name).toBe('TypeError')
})

test('newErrorAsync(fn, defaultValue) fn throws error', async () => {
  const result = (newErrorAsync as any)(URL, new URL('https://default.com'))('error')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).name).toBe('TypeError')
})
