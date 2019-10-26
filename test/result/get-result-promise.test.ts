import { isPromise } from 'extra-promise'
import { getResultPromise } from '../../src/result/get-result-promise'

test('getResultPromise(resolvedPromise)', async () => {
  const result = getResultPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('getResultPromise(resolvedPromise, defaultValue)', async () => {
  const result = getResultPromise(Promise.resolve('result'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('getResultPromise(rejectedPromise)', async () => {
  const result = getResultPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('getResultPromise(rejectedPromise, defaultValue)', async () => {
  const result = getResultPromise(Promise.reject('error'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})
