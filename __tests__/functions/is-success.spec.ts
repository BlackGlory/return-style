import { isSuccess } from '@functions/is-success'
import 'jest-extended'
import { pass } from '@blackglory/pass'

describe('isSuccess(fn: () => unknown): boolean', () => {
  describe('fn returned', () => {
    it('return true', () => {
      const fn = pass

      const result = isSuccess(fn)

      expect(result).toBeTrue()
    })
  })

  describe('fn throwed', () => {
    it('return false', () => {
      const fn = () => { throw new Error() }

      const result = isSuccess(fn)

      expect(result).toBeFalse()
    })
  })
})
