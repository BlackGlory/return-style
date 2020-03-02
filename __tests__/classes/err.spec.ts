import { getError } from '@src/functions/get-error'
import { Result, Ok, Err } from '@src/classes/result'

describe('Err', () => {
  describe('[Symbol.iterable]() -> Iterator<T>', () => {
    it('return Iterator', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const isIter = isIterable(res)
      const result = [...res]

      expect(isIter).toBe(true)
      expect(result).toEqual([])
    })
  })

  describe('isOk() -> boolean', () => {
    it('return true', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = res.isOk()

      expect(result).toBe(false)
    })
  })

  describe('isErr() -> boolean', () => {
    it('return false', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = res.isErr()

      expect(result).toBe(true)
    })
  })

  describe('onOk(callback: (val: T) -> void) -> this', () => {
    it('not invoke callback', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const cb = jest.fn()

      const result = res.onOk(cb)

      expect(result).toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onErr(callback: (err: X) -> void) -> this', () => {
    it('invoke callbackl', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const cb = jest.fn()

      const result = res.onErr(cb)

      expect(result).toBe(res)
      expect(cb).toBeCalledWith(error)
    })
  })

  describe('orElse(defaultValue: U) -> Result<T | U, X>', () => {
    it('return Ok', () => {
      const error = new Error('error')
      const defaultValue = 0
      const res = Result.ofErr(error)

      const result = res.orElse(defaultValue)
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Ok)
      expect(result).not.toBe(res)
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map(mapper: (val: T) -> U) -> Result<U, X>', () => {
    it('return a copy', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)

      expect(result).toBeInstanceOf(Err)
      expect(result).not.toBe(res)
    })
  })

  describe('get() -> T', () => {
    it('throw X', () => {
      const error = new Error('error')
      const res = Result.ofErr(error)

      const result = getError(() => res.get())

      expect(result).toBe(error)
    })
  })
})

function isIterable<T>(val: any): val is Iterable<T> {
  return val !== null && typeof val[Symbol.iterator] === 'function'
}
