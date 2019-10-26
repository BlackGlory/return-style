import { isPromise } from 'extra-promise'
import { newResultError } from '../../src/result-error/new-result-error'
import { newResultErrorAsync } from '../../src/result-error/new-result-error-async'
import { newResultErrorSync } from '../../src/result-error/new-result-error-sync'

test('newResultError(fn)', () => {
  const value = 'https://result.com'
  const fn = URL
  const result = newResultError(fn)(value)
  const expected = newResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newResultError(fn) fn throws error', () => {
  const value = 'error'
  const fn = URL
  const result = newResultError(fn)(value)
  const expected = newResultErrorSync(fn)(value)

  expect(result).toEqual(expected)
})

test('newResultError(asyncFn)', async () => {
  const value = (resolve: any) => resolve('result')
  const fn = Promise
  const result = newResultError(fn)(value)
  const expected = await newResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})

test('newResultError(asyncFn) asyncFn throws error', async () => {
  const value = (_: any, reject: any) => reject('error')
  const fn = Promise
  const result = newResultError(fn)(value)
  const expected = await newResultErrorAsync(fn)(value)

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(expected)
})
