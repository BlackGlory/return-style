import { isFailure } from '@src/functions/is-failure'

describe('isFailure(fn: () => unknown) -> boolean', () => {
  describe('fn returned', () => {
    it('return false', () => {
      const fn = () => {}

      const result = isFailure(fn)

      expect(result).toBe(false)
    })
  })

  describe('fn throwed', () => {
    it('return true', () => {
      const fn = () => { throw new Error() }

      const result = isFailure(fn)

      expect(result).toBe(true)
    })
  })
})
