import { returnErrorSync } from '../../src/error/return-error-sync'

test('returnErrorSync(fn)', () => {
  const result = returnErrorSync((x: string) => x)('result')

  expect(result).toBeNull()
})

test('returnErrorSync(fn, defaultValue)', () => {
  const result = returnErrorSync((x: string) => x, 'default')('result')

  expect(result).toBe('default')
})

test('returnErrorSync(fn) fn throws error', () => {
  const result = returnErrorSync((x: string) => { throw x })('error')

  expect(result).toBe('error')
})

test('returnErrorSync(fn, defaultValue) fn throws error', () => {
  const result = returnErrorSync((x: string) => { throw x }, 'default')('error')

  expect(result).toBe('error')
})

test('returnErrorSync(asyncFn)', () => {
  const result = returnErrorSync((x: string) => Promise.resolve(x))('result')

  expect(result).toBeNull()
})

test('returnErrorSync(asyncFn, defaultValue)', () => {
  const result = returnErrorSync((x: string) => Promise.resolve(x), 'default')('result')

  expect(result).toBe('default')
})

test('returnErrorSync(asyncFn) asyncFn throws error', () => {
  const result = returnErrorSync((x: string) => Promise.reject(x))('error')

  expect(result).toBeNull()
})

test('returnErrorSync(asyncFn, defaultValue) asyncFn throws error', () => {
  const result = returnErrorSync((x: string) => Promise.reject(x), 'default')('error')

  expect(result).toBe('default')
})
