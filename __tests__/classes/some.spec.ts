import { Optional, Some, None } from '@src/classes/optional'

describe('Some<T>', () => {
  describe('[Symbol.iterable](): Iterator<T>', () => {
    it('return Iterator', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const isIter = isIterable(opt)
      const result = [...opt]

      expect(isIter).toBe(true)
      expect(result).toEqual([value])
    })
  })

  describe('isSome(): boolean', () => {
    it('return true', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const isSome = opt.isSome()

      expect(isSome).toBe(true)
    })
  })

  describe('isNone(): boolean', () => {
    it('return false', () => {
      const value = 'value'
      const opt = Optional.of(value)

      const isNone = opt.isNone()

      expect(isNone).toBe(false)
    })
  })

  describe('onSome(callback: (val: T) => void): this', () => {
    it('invoke callback', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const cb = jest.fn()

      const result = opt.onSome(cb)

      expect(result).toBe(opt)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onNone(callback: () => void): this', () => {
    it('not invoke callback', () => {
      const value = 'value'
      const opt = Optional.of(value)
      const cb = jest.fn()

      const result = opt.onNone(cb)

      expect(result).toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Optional<T | U>', () => {
    it('return a copy', () => {
      const value = 'value'
      const defaultValue = 0
      const opt = Optional.of(value)

      const result = opt.orElse(defaultValue)
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Some)
      expect(result).not.toBe(opt)
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
      const internalValue = result.get()

      expect(result).toBeInstanceOf(Some)
      expect(result).not.toBe(opt)
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

        expect(result).toBeInstanceOf(None)
      })
    })

    describe('predicate return true', () => {
      it('return a copy', () => {
        const value = 'value'
        const opt = Optional.of(value)
        const fn = jest.fn().mockReturnValue(true)

        const result = opt.filter(fn)
        const internalValue = result.get()

        expect(result).toBeInstanceOf(Some)
        expect(result).not.toBe(opt)
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

function isIterable<T>(val: any): val is Iterable<T> {
  return val !== null && typeof val[Symbol.iterator] === 'function'
}
