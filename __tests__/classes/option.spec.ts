import { Option } from '@classes/option.js'
import { Result } from '@classes/result.js'
import { getError } from '@functions/get-error.js'
import { jest } from '@jest/globals'

describe('Option', () => {
  describe('Some', () => {
    it('returns Some', () => {
      const value = 'value'

      const result = Option.Some(value)

      expect(result.isSome()).toBe(true)
      expect(result).toBeInstanceOf(Option)
    })
  })

  describe('None', () => {
    it('return None', () => {
      const result = Option.None()

      expect(result.isNone()).toBe(true)
      expect(result).toBeInstanceOf(Option)
    })
  })

  describe('isSome', () => {
    describe('Some', () => {
      it('returns true', () => {
        const value = 'value'
        const option = Option.Some(value)

        const isSome = option.isSome()

        expect(isSome).toBe(true)
      })
    })

    describe('None', () => {
      it('returns false', () => {
        const option = Option.None()

        const isSome = option.isSome()

        expect(isSome).toBe(false)
      })
    })
  })

  describe('isNone', () => {
    describe('Some', () => {
      it('returns false', () => {
        const value = 'value'
        const option = Option.Some(value)

        const isNone = option.isNone()

        expect(isNone).toBe(false)
      })
    })

    describe('None', () => {
      it('returns true', () => {
        const option = Option.None()

        const isNone = option.isNone()

        expect(isNone).toBe(true)
      })
    })
  })

  describe('map', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const fn = jest.fn().mockReturnValue('new-value')

      const result = option.map(fn)

      expect(result).not.toBe(option)
      expect(result.isSome()).toBe(true)
      expect(result.unwrap()).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(option.unwrap()).toBe('value')
    })

    test('None', () => {
      const option = Option.None()
      const fn = jest.fn().mockReturnValue('new-value')

      const result = option.map(fn)

      expect(result).not.toBe(option)
      expect(result.isNone()).toBe(true)
      expect(fn).not.toBeCalled()
      expect(result).not.toBe(option)
    })
  })

  describe('mapOr', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const fn = jest.fn().mockReturnValue('new-value')

      const result = option.mapOr('default-value', fn)

      expect(result).not.toBe(option)
      expect(result.unwrap()).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(option.unwrap()).toBe('value')
    })

    test('None', () => {
      const option = Option.None()
      const fn = jest.fn().mockReturnValue('new-value')

      const result = option.mapOr('default-value', fn)

      expect(result).not.toBe(option)
      expect(result.unwrap()).toBe('default-value')
      expect(fn).not.toBeCalled()
    })
  })

  describe('mapOrElse', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const fn = jest.fn().mockReturnValue('new-value')
      const createDefaultValue = jest.fn().mockReturnValue('default-value')

      const result = option.mapOrElse(createDefaultValue, fn)

      expect(result).not.toBe(option)
      expect(result.unwrap()).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(createDefaultValue).not.toBeCalled()
      expect(option.unwrap()).toBe('value')
    })

    test('None', () => {
      const option = Option.None()
      const fn = jest.fn().mockReturnValue('new-value')
      const createDefaultValue = jest.fn().mockReturnValue('default-value')

      const result = option.mapOrElse(createDefaultValue, fn)

      expect(result).not.toBe(option)
      expect(result.unwrap()).toBe('default-value')
      expect(fn).not.toBeCalled()
      expect(createDefaultValue).toBeCalled()
    })
  })

  describe('filter', () => {
    describe('Some', () => {
      describe('predicate return false', () => {
        it('return None', () => {
          const option = Option.Some('value')
          const fn = jest.fn<any>().mockReturnValue(false)

          const result = option.filter(fn)

          expect(result).not.toBe(option)
          expect(result).toBeInstanceOf(Option)
          expect(result.isNone()).toBe(true)
        })
      })

      describe('predicate return true', () => {
        it('return a copy', () => {
          const option = Option.Some('value')
          const fn = jest.fn<any>().mockReturnValue(true)

          const result = option.filter(fn)

          expect(result).not.toBe(option)
          expect(result).toBeInstanceOf(Option)
          expect(result).not.toBe(option)
          expect(result.isSome()).toBe(true)
          expect(result.unwrap()).toBe('value')
        })
      })
    })

    describe('None', () => {
      describe('predicate return false', () => {
        it('return None', () => {
          const option = Option.None()
          const fn = jest.fn<any>().mockReturnValue(false)

          const result = option.filter(fn)

          expect(result).toBeInstanceOf(Option)
          expect(result.isNone()).toBe(true)
        })
      })

      describe('predicate return true', () => {
        it('return a copy', () => {
          const option = Option.Some('value')
          const fn = jest.fn<any>().mockReturnValue(true)

          const result = option.filter(fn)
          const isSome = result.isSome()
          const internalValue = result.unwrap()

          expect(result).toBeInstanceOf(Option)
          expect(result).not.toBe(option)
          expect(isSome).toBe(true)
          expect(internalValue).toBe('value')
        })
      })
    })
  })

  describe('unwrap', () => {
    test('Some', () => {
      const option = Option.Some('value')

      const result = option.unwrap()

      expect(result).toBe('value')
    })

    test('None', () => {
      const option = Option.None()

      const err = getError(() => option.unwrap())

      expect(err).toBeInstanceOf(Error)
    })
  })

  describe('unwrapOr', () => {
    test('Some', () => {
      const option = Option.Some('value')

      const result = option.unwrapOr('new-value')

      expect(result).toBe('value')
    })

    test('None', () => {
      const option = Option.None()

      const result = option.unwrapOr('new-value')

      expect(result).toBe('new-value')
    })
  })

  describe('unwrapOrElse', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const fn = jest.fn()

      const result = option.unwrapOrElse(fn)

      expect(result).toBe('value')
      expect(fn).not.toBeCalled()
    })

    test('None', () => {
      const option = Option.None()
      const fn = jest.fn().mockReturnValue('new-value')

      const result = option.unwrapOrElse(fn)

      expect(result).toBe('new-value')
      expect(fn).toBeCalled()
    })
  })

  describe('expect', () => {
    test('Some', () => {
      const option = Option.Some('value')

      const result = option.expect('message')

      expect(result).toBe('value')
    })

    test('None', () => {
      const option = Option.None()

      const err = getError(() => option.expect('message'))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toMatch(/message/)
    })
  })

  describe('okOr', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const err = new Error('error')

      const result = option.okOr(err)

      expect(result).toBeInstanceOf(Result)
      expect(result.isOk()).toBe(true)
      expect(result.unwrap()).toBe('value')
    })

    test('None', () => {
      const option = Option.None()
      const err = new Error('error')

      const result = option.okOr(err)

      expect(result).toBeInstanceOf(Result)
      expect(result.isErr()).toBe(true)
      expect(getError(() => result.unwrap())).toBe(err)
    })
  })

  describe('okOrElse', () => {
    test('Some', () => {
      const option = Option.Some('value')
      const err = new Error('error')
      const createErr = jest.fn().mockReturnValue(err)

      const result = option.okOrElse(createErr)

      expect(result).toBeInstanceOf(Result)
      expect(result.isOk()).toBe(true)
      expect(result.unwrap()).toBe('value')
      expect(createErr).not.toBeCalled()
    })

    test('None', () => {
      const option = Option.None()
      const err = new Error('error')
      const createErr = jest.fn().mockReturnValue(err)

      const result = option.okOrElse(createErr)

      expect(result).toBeInstanceOf(Result)
      expect(result.isErr()).toBe(true)
      expect(createErr).toBeCalled()
      expect(getError(() => result.unwrap())).toBe(err)
    })
  })
})
