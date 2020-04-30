import { Optional, Some, None } from '@src/classes/optional'

describe('Optional<T>', () => {
  describe('of<T>(value: T): Optional<T>', () => {
    it('return Some', () => {
      const value = 'value'

      const result = Optional.of(value)

      expect(result).toBeInstanceOf(Some)
      expect(result).toBeInstanceOf(Optional)
    })
  })

  describe('ofNone(): Optional<never>', () => {
    it('return None', () => {
      const result = Optional.ofNone()

      expect(result).toBeInstanceOf(None)
      expect(result).toBeInstanceOf(Optional)
    })
  })
})
