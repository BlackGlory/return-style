import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'

test('returnErrorFromFunction(fn)', async () => {
  const result = await returnErrorFromFunction<string>((x: string) => x)('result')

  expect(result).toBeNull()
})

test('returnErrorFromFunction(asyncFn)', async () => {
  const result = await returnErrorFromFunction<string>((x: string) => Promise.resolve(x))('result')

  expect(result).toBeNull()
})

test('returnErrorFromFunction(fn) fn throws error', async () => {
  const result = await returnErrorFromFunction<string>((x: string) => { throw x })('error')

  expect(result).toBe('error')
})

test('returnErrorFromFunction(asyncFn) asyncFn throws error', async () => {
  const result = await returnErrorFromFunction<string>((x: string) => Promise.reject(x))('error')

  expect(result).toBe('error')
})
