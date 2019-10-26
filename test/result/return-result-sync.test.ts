import { isPromise } from 'extra-promise'
import { returnResultSync } from '../../src/result/return-result-sync'

test('returnResultSync(fn)', () => {
  const result = returnResultSync((x: string) => x)('result')

  expect(result).toBe('result')
})

test('returnResultSync(fn, defaultValue)', () => {
  const result = returnResultSync((x: string) => x, 'default')('result')

  expect(result).toBe('result')
})

test('returnResultSync(fn) fn throws error', () => {
  const result = returnResultSync((x: string) => { throw x })('error')

  expect(result).toBeNull()
})

test('returnResultSync(fn, defaultValue) fn throws error', () => {
  const result = returnResultSync((x: string) => { throw x }, 'default')('error')

  expect(result).toBe('default')
})

test('returnResultSync(asyncFn)', async () => {
  const result = returnResultSync((x: string) => Promise.resolve(x))('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultSync(asyncFn, defaultValue)', async () => {
  const result = returnResultSync((x: string) => Promise.resolve(x), 'default' as any)('result')

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('returnResultSync(asyncFn) asyncFn throws error', async done => {
  const result = returnResultSync((x: string) => Promise.reject(x))('error')

  expect(isPromise(result)).toBeTruthy()
  try {
    await result
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})

test('returnResultSync(asyncFn, defaultValue) asyncFn throws error', async done => {
  const result = returnResultSync((x: string) => Promise.reject(x), 'default' as any)('error')

  expect(isPromise(result)).toBeTruthy()
  try {
    await result
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
