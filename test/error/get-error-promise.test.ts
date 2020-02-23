import { isPromise } from '../../src/utils/is-promise'
import { getErrorPromise } from '../../src/error/get-error-promise'

test('getErrorPromise(resolvedPromise)', async () => {
  const result = getErrorPromise<never>(Promise.resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeNull()
})

test('getErrorPromise(resolvedPromise, defaultValue)', async () => {
  const result = getErrorPromise(Promise.resolve('result'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('default')
})

test('getErrorPromise(rejectedPromise)', async () => {
  const result = getErrorPromise<string>(Promise.reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})

test('getErrorPromise(rejectedPromise, defaultValue)', async () => {
  const result = getErrorPromise<string>(Promise.reject('error'), 'default')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('error')
})
