import { Some, None } from '@src/classes/optional'
import { getOptional, getOptionalPartial } from '@src/functions/get-optional'

describe('getOptional(fn: () => T | U, isNone: (val: T) => boolean) -> Optional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = getOptional(fn, allIsNone)

      expect(result).toBeInstanceOf(None)
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = getOptional(fn, allIsSome)

      expect(result).toBeInstanceOf(Some)
    })
  })
})

describe('getOptionalPartial(isNone: (val: T) => boolean) -> (fn: () => T | U) -> Optional<T>', () => {
  describe('isNone returned true', () => {
    it('return None', () => {
      const fn = () => null
      const allIsNone = () => true

      const result = getOptionalPartial(allIsNone)(fn)

      expect(result).toBeInstanceOf(None)
    })
  })

  describe('isNone returned false', () => {
    it('return Some', () => {
      const fn = () => null
      const allIsSome = () => false

      const result = getOptionalPartial(allIsSome)(fn)

      expect(result).toBeInstanceOf(Some)
    })
  })
})
