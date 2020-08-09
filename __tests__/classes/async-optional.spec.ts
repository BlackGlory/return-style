import { AsyncOptional } from '@src/classes/async-optional'
import 'jest-extended'

describe('AsyncOptional<T>', () => {
  describe('of<T>(value: T): AsyncOptional<T>', () => {
    it('return Some', async () => {
      const value = 'value'

      const result = AsyncOptional.of(value)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })

  describe('ofNone(): AsyncOptional<never>', () => {
    it('return AsyncNone', async () => {
      const result = AsyncOptional.ofNone()
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })
})