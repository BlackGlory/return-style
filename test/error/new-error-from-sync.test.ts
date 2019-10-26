import { isPromise } from 'extra-promise'
import { newErrorSync } from '../../src/error/new-error-sync'

test('newErrorSync(fn)', () => {
  const result = newErrorSync(URL)('https://result.com')

  expect(result).toBeNull()
})

test('newErrorSync(fn, defaultValue)', () => {
  const result = newErrorSync(URL, 'default')('https://result.com')

  expect(result).toBe('default')
})

test('newErrorSync(fn) fn throws error', () => {
  const result = newErrorSync<TypeError>(URL)('error')

  expect(result!.name).toBe('TypeError')
})

test('newErrorSync(fn, defaultValue) fn throws error', () => {
  const result = newErrorSync<any>(URL, 'default')('error')

  expect(result!.name).toBe('TypeError')
})

test('newErrorSync(asyncFn)', () => {
  const result = newErrorSync(Promise)(resolve => resolve('result'))

  expect(result).toBeNull()
})

test('newErrorSync(asyncFn, defaultValue)', async () => {
  const result = newErrorSync(Promise, Promise.resolve('default'))(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('newErrorSync(asyncFn) asyncFn throws error', () => {
  const result = newErrorSync(Promise)((_, reject) => reject('error'))

  expect(result).toBeNull()
})

test('newErrorSync(asyncFn, defaultValue) asyncFn throws error', async () => {
  const result = newErrorSync(Promise, Promise.resolve('default'))((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})
