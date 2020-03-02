import { getResultError } from '@src/functions/get-result-error'

describe('getResultError(fn: () => T) -> [T, undefined] | [undefined, X]', () => {
  describe('fn returned', () => {
    it('return [T, undefined]', () => {
      const value = 'value'
      const fn = () => value

      const result = getResultError(fn)

      expect(result).toEqual([value, undefined])
    })
  })

  describe('fn throwed', () => {
    it('return [undefined, X]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getResultError(fn)

      expect(result).toEqual([undefined, customError])
    })
  })
})
