import { Optional } from '@src/classes/optional'
import 'jest-extended'

describe('Optional<T>', () => {
  describe('of<T>(value: T): Optional<T>', () => {
    it('return Some', () => {
      const value = 'value'

      const result = Optional.of(value)
      const isSome = result.isSome()

      expect(result).toBeInstanceOf(Optional)
      expect(isSome).toBeTrue()
    })
  })

  describe('ofNone(): Optional<never>', () => {
    it('return None', () => {
      const result = Optional.ofNone()
      const isNone = result.isNone()

      expect(result).toBeInstanceOf(Optional)
      expect(isNone).toBeTrue()
    })
  })
})
