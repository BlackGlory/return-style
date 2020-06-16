import { getError } from '@src/functions/get-error'
import { Optional } from '@src/classes/optional'
import 'jest-extended'
import '@test/matchers'

describe('None', () => {
  describe('[Symbol.iterator](): Iterator<T>', () => {
    it('return Iterator', () => {
      const opt = Optional.ofNone()
      const result = [...opt]

      expect(opt).toBeIterable()
      expect(result).toEqual([])
    })
  })

  describe('isSome(): boolean', () => {
    it('return false', () => {
      const opt = Optional.ofNone()

      const result = opt.isSome()

      expect(result).toBeFalse()
    })
  })

  describe('isNone(): boolean', () => {
    it('return true', () => {
      const opt = Optional.ofNone()

      const result = opt.isNone()

      expect(result).toBeTrue()
    })
  })

  describe('onSome(callback: (val: T) => void): Optional<T>', () => {
    it('not invoke callback', () => {
      const opt = Optional.ofNone()
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onNone(callback: () => void): Optional<T>', () => {
    it('invoke callback', () => {
      const opt = Optional.ofNone()
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Optional<T | U>', () => {
    it('return a Some', () => {
      const opt = Optional.ofNone()
      const defaultValue = 'defaultValue'

      const result = opt.orElse(defaultValue)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): Optional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.ofNone()
      const fn = jest.fn()

      const result = opt.map(fn)
      const isNone = result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isNone).toBeTrue()
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>', () => {
    it('return a copy', () => {
      const opt = Optional.ofNone()
      const fn = jest.fn()

      const result = opt.filter(fn)
      const isNone = result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isNone).toBeTrue()
    })
  })

  describe('get(): T', () => {
    it('throw error', () => {
      const opt = Optional.ofNone()

      const err = getError(() => opt.get())

      expect(err).toBeInstanceOf(Error)
    })
  })
})
