import { isPromise } from 'extra-promise'
import { newErrorResult } from '../../src/error-result/new-error-result'
import { newErrorResultAsync } from '../../src/error-result/new-error-result-async'
import { newErrorResultSync } from '../../src/error-result/new-error-result-sync'

test('newErrorResult(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = newErrorResult(fn)(value)
  const expected = newErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newErrorResult(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = newErrorResult(fn)(value)
  const expected = newErrorResultSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newErrorResult(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = newErrorResult(fn)(value)
  const expected = await newErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newErrorResult(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = newErrorResult(fn)(value)
  const expected = await newErrorResultAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
