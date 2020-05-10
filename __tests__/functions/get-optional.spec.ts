import { Optional } from '@src/classes/optional'
import { getOptional, getOptionalPartial } from '@src/functions/get-optional'

describe('getOptional<T>(fn: () => T | U, isNone: (val: T) => boolean): Optional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = getOptional(fn, allIsNone)
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBe(true)
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = getOptional(fn, allIsSome)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBe(true)
    })
  })
})

describe('getOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T | U) => Optional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = getOptionalPartial(allIsNone)(fn)
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBe(true)
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = getOptionalPartial(allIsSome)(fn)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBe(true)
    })
  })
})
