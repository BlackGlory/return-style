import { getSuccess } from '@src/functions/get-success'

describe('getSuccess<X, T>(fn: () => T): [true, T] | [false, X]', () => {
  describe('fn returned', () => {
    it('return [true, T]', () => {
      const value = 'value'
      const fn = () => value

      const result = getSuccess(fn)

      expect(result).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    it('return [false, X]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getSuccess(fn)

      expect(result).toEqual([false, customError])
    })
  })
})
