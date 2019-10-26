import { isPromise } from 'extra-promise'
import { returnResultErrorSync } from '../../src/result-error/return-result-error-sync'

test('returnResultErrorSync(fn)', () => {
  const result = returnResultErrorSync((x: string) => x)('result')

  expect(result).toEqual(['result', null])
})

test('returnResultErrorSync(fn) fn throws error', () => {
  const result = returnResultErrorSync((x: string) => { throw x })('error')

  expect(result).toEqual([null, 'error'])
})

test('returnResultErrorSync(asyncFn)', async () => {
  const [res, err] = returnResultErrorSync((x: string) => Promise.resolve(x))('result')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  expect(await res).toBe('result')
})

test('returnResultErrorSync(asyncFn) asyncFn throws error', async done => {
  const [res, err] = returnResultErrorSync((x: string) => Promise.reject(x))('error')

  expect(err).toBeNull()
  expect(isPromise(res)).toBeTruthy()
  try {
    await res
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
  }
  done()
})
