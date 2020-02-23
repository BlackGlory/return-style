import { isPromise } from '../../src/utils/is-promise'
import { newError } from '../../src/error/new-error'
import { newErrorAsync } from '../../src/error/new-error-async'
import { newErrorSync } from '../../src/error/new-error-sync'

test('newError(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = newError(fn)(value)
  const expected = newErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newError(fn, defaultValue)', () => {
  const value = 'https://result.com'
  const defaultValue = new URL('https://default.com')
  const fn = URL
  const result = newError(fn, defaultValue)(value)
  const expected = newErrorSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('newError(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = newError(fn)(value)
  const expected = newErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newError(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = new URL('https://default.com')
  const fn = URL
  const result = newError(fn, defaultValue)(value)
  const expected = newErrorSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('newError(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = newError(fn)(value)
  const expected = await newErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newError(asyncFn, defaultValue)', async () => {
  const value = (resolve: any) => resolve('result')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = newError(fn, defaultValue)(value)
  const expected = await newErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newError(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = newError(fn)(value)
  const expected = await newErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newError(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = newError(fn, defaultValue)(value)
  const expected = await newErrorAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
