import { isPromise } from '../../src/utils/is-promise'
import { newResultErrorAsync } from '../../src/result-error/new-result-error-async'

test('newResultErrorAsync(asyncFn)', async () => {
  const result = newResultErrorAsync(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual(['result', null])
})

test('newResultErrorAsync(asyncFn) asyncFn throws error', async () => {
  const result = newResultErrorAsync(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toEqual([null, 'error'])
})

test('newResultErrorAsync(fn)', async () => {
  const result = (newResultErrorAsync as any)(URL)('https://result.com')
  const [res, err] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err).toBeNull()
  expect(res.host).toEqual('result.com')
})

test('newResultErrorAsync(fn) fn throws error', async () => {
  const result = (newResultErrorAsync as any)(URL)('error')
  const [res, err] = await result

  expect(isPromise(result)).toBeTruthy()
  expect(err.name).toBe('TypeError')
  expect(res).toBeNull()
})
