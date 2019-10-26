import { getErrorSync } from '../../src/error/get-error-sync'
import { returnErrorSync } from '../../src/error/return-error-sync'

test('getErrorSync(fn)', () => {
  const fn = (x: string) => x
  const value = 'result'
  const result = getErrorSync(() => fn(value))
  const expected = returnErrorSync(fn)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(fn, defaultValue)', () => {
  const fn = (x: string) => x
  const defaultValue = 'default'
  const value = 'result'
  const result = getErrorSync(() => fn(value), defaultValue)
  const expected = returnErrorSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(fn) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const value = 'error'
  const result = getErrorSync(() => fn(value))
  const expected = returnErrorSync(fn)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(fn, defaultValue) fn throws error', () => {
  const fn = (x: string) => { throw x }
  const defaultValue = 'default'
  const value = 'error'
  const result = getErrorSync(() => fn(value), defaultValue)
  const expected = returnErrorSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(asyncFn)', () => {
  const fn = (x: string) => Promise.resolve(x)
  const value = 'result'
  const result = getErrorSync(() => fn(value))
  const expected = returnErrorSync(fn)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(asyncFn, defaultValue)', () => {
  const fn = (x: string) => Promise.resolve(x)
  const defaultValue = 'default'
  const value = 'result'
  const result = getErrorSync(() => fn(value), defaultValue)
  const expected = returnErrorSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(asyncFn) asyncFn throws error', () => {
  const fn = (x: string) => Promise.reject(x)
  const value = 'error'
  const result = getErrorSync(() => fn(value))
  const expected = returnErrorSync(fn)(value)

  expect(result).toBe(expected)
})

test('getErrorSync(asyncFn, defaultValue) asyncFn throws error', () => {
  const fn = (x: string) => Promise.reject(x)
  const defaultValue = 'default'
  const value = 'error'
  const result = getErrorSync(() => fn(value), defaultValue)
  const expected = returnErrorSync(fn, defaultValue)(value)

  expect(result).toBe(expected)
})
