import { newErrorResultAsync } from '../../src/error-result/new-error-result-async'
import { isPromise } from 'extra-promise'

test('newErrorResultAsync(asyncFn)', async () => {
  const result = newErrorResultAsync(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'result'])
})

test('newErrorResultAsync(asyncfn) asyncFn throws error', async () => {
  const result = newErrorResultAsync(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['error', null])
})

test('newErrorResultAsync(fn)', async () => {
  const result = (newErrorResultAsync as any)(URL)('https://result.com')
  const [err, res] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err).toBeNull()
  expect(res.host).toBe('result.com')
})

test('newErrorResultAsync(fn) fn throws error', async () => {
  const result = (newErrorResultAsync as any)(URL)('error')
  const [err, res] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err.name).toBe('TypeError')
  expect(res).toBeNull()
})
