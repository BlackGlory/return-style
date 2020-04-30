import { isSuccess } from '@src/functions/is-success'

describe('isSuccess(fn: () => unknown): boolean', () => {
  describe('fn returned', () => {
    it('return true', () => {
      const fn = () => {}

      const result = isSuccess(fn)

      expect(result).toBe(true)
    })
  })

  describe('fn throwed', () => {
    it('return false', () => {
      const fn = () => { throw new Error() }

      const result = isSuccess(fn)

      expect(result).toBe(false)
    })
  })
})
