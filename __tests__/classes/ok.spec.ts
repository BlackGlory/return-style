import { Result } from '@src/classes/result'
import 'jest-extended'
import '@test/matchers'

describe('Ok<T>', () => {
  describe('[Symbol.iterator](): Iterator<T>', () => {
    it('return Iterator', () => {
      const value = 'value'
      const res = Result.of(value)
      const result = [...res]

      expect(res).toBeIterable()
      expect(result).toEqual([value])
    })
  })

  describe('isOk(): boolean', () => {
    it('return true', () => {
      const value = 'value'
      const res = Result.of(value)

      const result = res.isOk()

      expect(result).toBeTrue()
    })
  })

  describe('isErr(): boolean', () => {
    it('return false', () => {
      const value = 'value'
      const res = Result.of(value)

      const result = res.isErr()

      expect(result).toBeFalse()
    })
  })

  describe('onOk(callback: (val: T) => void): Result<T, X>', () => {
    it('invoke callback', () => {
      const value = 'value'
      const res = Result.of(value)
      const cb = jest.fn()

      const result = res.onOk(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onErr(callback: (err: X) => void): Result<T, X>', () => {
    it('not invoke callback', () => {
      const value = 'value'
      const res = Result.of(value)
      const cb = jest.fn()

      const result = res.onErr(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Result<T | U, X>', () => {
    it('return a copy', () => {
      const value = 'value'
      const defaultValue = 0
      const res = Result.of(value)

      const result = res.orElse(defaultValue)
      const isOk = result.isOk()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): Result<U, X>', () => {
    it('return Ok', () => {
      const value = 'value'
      const res = Result.of(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isOk = result.isOk()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(newValue)
    })
  })

  describe('get(): T', () => {
    it('return T', () => {
      const value = 'value'
      const res = Result.of(value)

      const result = res.get()

      expect(result).toBe(value)
    })
  })
})
