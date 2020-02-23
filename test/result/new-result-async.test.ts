import { isPromise } from '../../src/utils/is-promise'
import { newResultAsync } from '../../src/result/new-result-async'

test('newResultAsync(asyncFn)', async () => {
  const result = newResultAsync(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('newResultAsync(asyncFn, defaultValue)', async () => {
  const result = newResultAsync(Promise, 'default')(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('newResultAsync(asyncFn) asyncfn throws error', async () => {
  const result = newResultAsync(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('newResultAsync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = newResultAsync(Promise, 'default')((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('newResultAsync(fn)', async () => {
  const result = (newResultAsync as any)(URL)('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('result.com')
})

test('newResultAsync(fn, defaultValue)', async () => {
  const result = (newResultAsync as any)(URL, new URL('https://default.com'))('https://result.com')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('result.com')
})

test('newResultAsync(fn) fn throws error', async () => {
  const result = (newResultAsync as any)(URL)('error')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('newResultAsync(fn, defaultValue) fn throws error', async () => {
  const result = (newResultAsync as any)(URL, new URL('https://default.com'))('error')

  expect(isPromise(result)).toBeTruthy()
  expect((await result).host).toBe('default.com')
})
