import { getError } from '@src/functions/get-error'
import { Result } from '@src/classes/result'
import 'jest-extended'
import '@test/matchers'

describe('Err<X>', () => {
  describe('[Symbol.iterator](): Iterator<T>', () => {
    it('return Iterator', () => {
      const error = new Error('error')

      const res = Result.ofErr(error)
      const result = [...res]

      expect(res).toBeIterable()
      expect(result).toEqual([])
    })
  })

  describe('isOk(): boolean', () => {
    it('return false', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = res.isOk()

      expect(result).toBeFalse()
    })
  })

  describe('isErr(): boolean', () => {
    it('return true', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = res.isErr()

      expect(result).toBeTrue()
    })
  })

  describe('onOk(callback: (val: T) => void): Result<T, X>', () => {
    it('not invoke callback', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const cb = jest.fn()

      const result = res.onOk(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onErr(callback: (err: X) => void): Result<T, X>', () => {
    it('invoke callbackl', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const cb = jest.fn()

      const result = res.onErr(cb)

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(cb).toBeCalledWith(error)
    })
  })

  describe('orElse<U>(defaultValue: U): Result<T | U, X>', () => {
    it('return Ok', () => {
      const error = new Error('error')
      const defaultValue = 0
      const res = Result.ofErr(error)

      const result = res.orElse(defaultValue)
      const isOk = result.isOk()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(isOk).toBeTrue()
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): Result<U, X>', () => {
    it('return a copy', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(result).not.toBe(res)
      expect(isErr).toBeTrue()
    })
  })

  describe('get(): T', () => {
    it('throw X', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = getError(() => res.get())

      expect(result).toBe(error)
    })
  })
})
