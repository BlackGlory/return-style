import { isPromise } from 'extra-promise'
import { returnErrorResultSync } from '../../src/error-result/return-error-result-sync'

test('returnErrorResultSync(fn)', () => {
  const result = returnErrorResultSync((x: string) => x)('result')

  expect(result).toEqual([null, 'result'])
})

test('returnErrorResultSync(fn) fn throws error', () => {
  const result = returnErrorResultSync((x: string) => { throw x })('error')

  expect(result).toEqual(['error', null])
})

test('returnErrorResultSync(asyncFn)', async () => {
  const [err, res] = returnErrorResultSync((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  expect(await res).toBe('result')
})

test('returnErrorResultSync(asyncFn) asyncFn throws error', async done => {
  const [err, res] = returnErrorResultSync((x: string) => Promise.reject(x))('error')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  try {
    await res
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
