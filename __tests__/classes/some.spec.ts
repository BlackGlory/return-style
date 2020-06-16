import { Optional } from '@src/classes/optional'
import 'jest-extended'
import '@test/matchers'

describe('Some<T>', () => {
  describe('[Symbol.iterator](): Iterator<T>', () => {
    it('return Iterator', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const result = [...opt]

      expect(opt).toBeIterable()
      expect(result).toEqual([value])
    })
  })

  describe('isSome(): boolean', () => {
    it('return true', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const isSome = opt.isSome()

      expect(isSome).toBeTrue()
    })
  })

  describe('isNone(): boolean', () => {
    it('return false', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const isNone = opt.isNone()

      expect(isNone).toBeFalse()
    })
  })

  describe('onSome(callback: (val: T) => void): Optional<T>', () => {
    it('invoke callback', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onNone(callback: () => void): Optional<T>', () => {
    it('not invoke callback', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Optional<T | U>', () => {
    it('return a copy', () => {
      const value = 'value'
      const defaultValue = 0
      const opt = Optional.of(value)

      const result = opt.orElse(defaultValue)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): Optional<U>', () => {
    it('return a Some', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = opt.map(fn)
      const isSome = result.isSome()
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Optional)
      expect(result).not.toBe(opt)
      expect(isSome).toBeTrue()
      expect(internalValue).toBe(newValue)
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>', () => {
    describe('predicate return false', () => {
      it('return None', () => {
        const value = 'value'
        const opt = Optional.of(value)
        const fn = jest.fn().mockReturnValue(false)

        const result = opt.filter(fn)
        const isNone = result.isNone()

        expect(result).toBeInstanceOf(Optional)
        expect(isNone).toBeTrue()
      })
    })

    describe('predicate return true', () => {
      it('return a copy', () => {
        const value = 'value'
        const opt = Optional.of(value)
        const fn = jest.fn().mockReturnValue(true)

        const result = opt.filter(fn)
        const isSome = result.isSome()
        const internalValue = result.get()

        expect(result).toBeInstanceOf(Optional)
        expect(result).not.toBe(opt)
        expect(isSome).toBeTrue()
        expect(internalValue).toBe(value)
      })
    })
  })

  describe('get(): T', () => {
    it('return T', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const result = opt.get()

      expect(result).toBe(value)
    })
  })
})
