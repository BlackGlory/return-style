import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'

test('returnResultFromFunction(fn)', async () => {
  const result = await returnResultFromFunction<string>((x: string) => x)('result')

  expect(result).toBe('result')
})

test('returnResultFromFunction(asyncFn)', async () => {
  const result = await returnResultFromFunction<string>((x: string) => Promise.resolve(x))('result')

  expect(result).toBe('result')
})

test('returnResultFromFunction(fn) fn throws error', async () => {
  const result = await returnResultFromFunction<string>((x: string) => { throw x })('error')

  expect(result).toBeNull()
})

test('returnResultFromFunction(asyncFn) asyncFn throws error', async () => {
  const result = await returnResultFromFunction<string>((x: string) => Promise.reject(x))('error')

  expect(result).toBeNull()
})
