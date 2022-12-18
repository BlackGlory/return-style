import { Option } from '@classes/option'
import { toOption } from '@functions/to-option'

describe('toOption', () => {
  describe('fn throw error', () => {
    it('return None', () => {
      const fn = () => { throw new Error() }

      const result = toOption(fn)
      const isErr = result.isNone()

      expect(result).toBeInstanceOf(Option)
      expect(isErr).toBe(true)
    })
  })

  describe('fn return result', () => {
    it('return Some', () => {
      const fn = () => true

      const result = toOption(fn)
      const isOk = result.isSome()

      expect(result).toBeInstanceOf(Option)
      expect(isOk).toBe(true)
    })
  })
})
