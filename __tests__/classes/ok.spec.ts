import { Result, Ok } from '@src/classes/result'

describe('Ok<T>', () => {
  describe('[Symbol.iterable](): Iterator<T>', () => {
    it('return Iterator', () => {
      const value = 'value'
      const res = Result.of(value)

      const isIter = isIterable(res)
      const result = [...res]

      expect(isIter).toBe(true)
      expect(result).toEqual([value])
    })
  })

  describe('isOk(): boolean', () => {
    it('return true', () => {
      const value = 'value'
      const res = Result.of(value)

      const result = res.isOk()

      expect(result).toBe(true)
    })
  })

  describe('isErr(): boolean', () => {
    it('return false', () => {
      const value = 'value'
      const res = Result.of(value)

      const result = res.isErr()

      expect(result).toBe(false)
    })
  })

  describe('onOk(callback: (val: T) => void): this', () => {
    it('invoke callback', () => {
      const value = 'value'
      const res = Result.of(value)
      const cb = jest.fn()

      const result = res.onOk(cb)

      expect(result).toBe(res)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onErr(callback: (err: X) => void): this', () => {
    it('not invoke callback', () => {
      const value = 'value'
      const res = Result.of(value)
      const cb = jest.fn()

      const result = res.onErr(cb)

      expect(result).toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Result<T | U, X>', () => {
    it('return a copy', () => {
      const value = 'value'
      const defaultValue = 0
      const res = Result.of(value)

      const result = res.orElse(defaultValue)
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Ok)
      expect(result).not.toBe(res)
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
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Ok)
      expect(result).not.toBe(res)
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

function isIterable<T>(val: any): val is Iterable<T> {
  return val !== null && typeof val[Symbol.iterator] === 'function'
}
