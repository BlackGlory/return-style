import { isPromise } from 'extra-promise'
import { newResult } from '../../src/result/new-result'
import { newResultAsync } from '../../src/result/new-result-async'
import { newResultSync } from '../../src/result/new-result-sync'

test('newResult(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = newResult(fn)(value)
  const expected = newResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newResult(fn, defaultValue)', () => {
  const value = 'https://result.com'
  const defaultValue = new URL('https://default.com')
  const fn = URL
  const result = newResult(fn, defaultValue)(value)
  const expected = newResultSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('newResult(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = newResult(fn)(value)
  const expected = newResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newResult(fn, defaultValue) fn throws error', () => {
  const value = 'error'
  const defaultValue = new URL('https://default.com')
  const fn = URL
  const result = newResult(fn, defaultValue)(value)
  const expected = newResultSync(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('newResult(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = newResult(fn)(value)
  const expected = await newResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newResult(asyncFn, defaultValue)', async () => {
  const value = (resolve: any) => resolve('result')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = newResult(fn, defaultValue)(value)
  const expected = await newResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newResult(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = newResult(fn)(value)
  const expected = await newResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newResult(asyncFn, defaultValue) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const defaultValue = Promise.resolve('default')
  const fn = Promise
  const result = newResult(fn, defaultValue)(value)
  const expected = await newResultAsync(fn, defaultValue)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
