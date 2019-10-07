import { isPromise } from 'extra-promise'
import { returnResultFromPromise } from '../../src/return-result/return-result-from-promise'

test('returnResultFromPromise(resolvedPromise)', async () => {
  const result = returnResultFromPromise(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromPromise(resolvedPromise, defaultValue)', async () => {
  const result = returnResultFromPromise(Promise.resolve('result'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultFromPromise(rejectedPromise)', async () => {
  const result = returnResultFromPromise(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('returnResultFromPromise(rejectedPromise, defaultValue)', async () => {
  const result = returnResultFromPromise(Promise.reject('error'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})
