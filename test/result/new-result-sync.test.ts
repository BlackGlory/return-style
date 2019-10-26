import { isPromise } from 'extra-promise'
import { newResultSync } from '../../src/result/new-result-sync'

test('newResultSync(fn)', () => {
  const result = newResultSync(URL)('https://result.com')

  expect(result!.host).toBe('result.com')
})

test('newResultSync(fn, defaultValue)', () => {
  const result = newResultSync(URL, new URL('https://default.com'))('https://result.com')

  expect(result.host).toBe('result.com')
})

test('newResultSync(fn) fn throws error', () => {
  const result = newResultSync(URL)('error')

  expect(result).toBeNull()
})

test('newResultSync(fn, defaultValue) fn throws error', () => {
  const result = newResultSync(URL, new URL('https://default.com'))('error')

  expect(result).not.toBeNull()
  expect(result.host).toBe('default.com')
})

test('newResultSync(asyncFn)', async () => {
  const result = newResultSync(Promise)(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('newResultSync(asyncFn, defaultValue)', async () => {
  const result = newResultSync(Promise, Promise.resolve('default'))(resolve => resolve('result'))

  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBe('result')
})

test('newResultSync(asyncFn) asyncFn throws error', async done => {
  const result = newResultSync(Promise)((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  try {
    await result
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})

test('newResultSync(asyncFn, defaultValue) asyncFn throws error', async done => {
  const result = newResultSync(Promise, Promise.resolve('default'))((_, reject) => reject('error'))

  expect(isPromise(result)).toBeTruthy()
  try {
    await result
    done.fail()
  } catch (err) {
    expect(err).toBe('error')
    done()
  }
})
