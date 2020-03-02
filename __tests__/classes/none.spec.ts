import { getError } from '@src/functions/get-error'
import { Optional, Some, None } from '@src/classes/optional'

describe('None', () => {
  describe('[Symbol.iterable]', () => {
    it('return Iterator', () => {
      const opt = Optional.ofNone()

      const isIter = isIterable(opt)
      const result = [...opt]

      expect(isIter).toBe(true)
      expect(result).toEqual([])
    })
  })

  describe('isSome() -> boolean', () => {
    it('return false', () => {
      const opt = Optional.ofNone()

      const result = opt.isSome()

      expect(result).toBe(false)
    })
  })

  describe('isNone() -> boolean', () => {
    it('return true', () => {
      const opt = Optional.ofNone()

      const result = opt.isNone()

      expect(result).toBe(true)
    })
  })

  describe('onSome(callback: (val: T) -> void) -> this', () => {
    it('not invoke callback', () => {
      const opt = Optional.ofNone()
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onNone(callback: () -> void) -> this', () => {
    it('invoke callback', () => {
      const opt = Optional.ofNone()
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBe(opt)
      expect(cb).toBeCalled()
    })
  })

  describe('orElse(defaultValue: U) -> Optional<T | U>', () => {
    it('return a Some', () => {
      const opt = Optional.ofNone()
      const defaultValue = 'defaultValue'

      const result = opt.orElse(defaultValue)
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Some)
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map(mapper: (val: T) -> U) -> Optional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.ofNone()
      const fn = jest.fn()

      const result = opt.map(fn)

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(None)
      expect(result).not.toBe(opt)
    })
  })

  describe('filter(predicate: (val: T) -> boolean) -> Optional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.ofNone()
      const fn = jest.fn()

      const result = opt.filter(fn)

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(None)
      expect(result).not.toBe(opt)
    })
  })

  describe('get() -> T', () => {
    it('throw error', () => {
      const opt = Optional.ofNone()

      const err = getError(() => opt.get())

      expect(err).toBeInstanceOf(Error)
    })
  })
})

function isIterable<T>(val: any): val is Iterable<T> {
  return val !== null && typeof val[Symbol.iterator] === 'function'
}
