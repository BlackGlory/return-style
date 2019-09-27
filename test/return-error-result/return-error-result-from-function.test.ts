import { returnErrorResultFromFunction } from '../../src/return-error-result/return-error-result-from-function'

test('returnErrorResultFromFunction(fn)', async () => {
  const [err, res] = await returnErrorResultFromFunction<string, string>((x: string) => x)('result')

  expect(err).toBeNull()
  expect(res).toBe('result')
})

test('returnErrorResultFromFunction(asyncFn)', async () => {
  const [err, res] = await returnErrorResultFromFunction<string, string>((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(res).toBe('result')
})

test('returnErrorResultFromFunction(fn) fn throws error', async () => {
  const [err, res] = await returnErrorResultFromFunction((x: string) => { throw x })('error')

  expect(err).toBe('error')
  expect(res).toBeNull()
})

test('returnErrorResultFromFunction(asyncFn) asyncFn throws error', async () => {
  const [err, res] = await returnErrorResultFromFunction((x: string) => Promise.reject(x))('error')

  expect(err).toBe('error')
  expect(res).toBeNull()
})
