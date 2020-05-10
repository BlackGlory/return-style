import { getFailure } from '@src/functions/get-failure'

describe('getFailure<X, T>(fn: () => T): [false, T] | [true, X]', () => {
  describe('fn returned', () => {
    it('return [false, T]', () => {
      const value = 'value'
      const fn = () => value

      const result = getFailure(fn)

      expect(result).toEqual([false, value])
    })
  })

  describe('fn throwed', () => {
    it('return [true, X]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getFailure(fn)

      expect(result).toEqual([true, customError])
    })
  })
})
