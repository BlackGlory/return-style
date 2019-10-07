import { returnResult } from '../../src/return-result/return-result'
import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'
import { returnResultFromPromise } from '../../src/return-result/return-result-from-promise'

test('returnResult(resolvedPromise)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnResult(promise)
  const expected = await returnResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResult(resolvedPromise, defaultValue)', async () => {
  const promise = Promise.resolve('result')
  const result = await returnResult(promise, 'default')
  const expected = await returnResultFromPromise(promise, 'default')

  expect(result).toEqual(expected)
})

test('returnResult(rejectedPromise)', async () => {
  const promise = Promise.reject('error')
  const result = await returnResult(promise)
  const expected = await returnResultFromPromise(promise)

  expect(result).toEqual(expected)
})

test('returnResult(rejectedPromise, defaultValue)', async () => {
  const promise = Promise.reject('error')
  const result = await returnResult(promise, 'default')
  const expected = await returnResultFromPromise(promise, 'default')

  expect(result).toEqual(expected)
})

test('returnResult(fn)', async () => {
  const value = 'result'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnResult(fn)(value)
  const expected = await returnResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn, defaultValue)', async () => {
  const value = 'result'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.resolve(x)
  const result = await returnResult(fn, defaultValue)(value)
  const expected = await returnResultFromFunction(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn) fn throws error', async () => {
  const value = 'error'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnResult(fn)(value)
  const expected = await returnResultFromFunction(fn)(value)

  expect(result).toEqual(expected)
})

test('returnResult(fn, defaultValue) fn throws error', async () => {
  const value = 'error'
  const defaultValue = 'default'
  const fn = (x: string) => Promise.reject(x)
  const result = await returnResult(fn, defaultValue)(value)
  const expected = await returnResultFromFunction(fn, defaultValue)(value)

  expect(result).toEqual(expected)
})
