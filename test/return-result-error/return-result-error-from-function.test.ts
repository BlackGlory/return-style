import { returnResultErrorFromFunction } from '../../src/return-result-error/return-result-error-from-function'

test('returnResultErrorFromFunction(fn)', async () => {
  const [res, err] = await returnResultErrorFromFunction<string, string>((x: string) => x)('result')

  expect(err).toBeNull()
  expect(res).toBe('result')
})

test('returnResultErrorFromFunction(fn)', async () => {
  const [res, err] = await returnResultErrorFromFunction<string, string>((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(res).toBe('result')
})

test('returnResultErrorFromFunction(fn) fn throws error', async () => {
  const [res, err] = await returnResultErrorFromFunction((x: string) => { throw x })('error')

  expect(err).toBe('error')
  expect(res).toBeNull()
})

test('returnResultErrorFromFunction(asyncFn) asyncFn throws error', async () => {
  const [res, err] = await returnResultErrorFromFunction((x: string) => Promise.reject(x))('error')

  expect(err).toBe('error')
  expect(res).toBeNull()
})
