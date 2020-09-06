import { getResultError } from '@functions/get-result-error'

describe('getResultError<T, X = any>(fn: () => T): [T, undefined] | [undefined, X]', () => {
  describe('fn returned', () => {
    it('return [T, undefined]', () => {
      const value = 'value'
      const fn = () => value

      const result = getResultError<string>(fn)

      expect(result).toEqual([value, undefined])
    })
  })

  describe('fn throwed', () => {
    it('return [undefined, X]', () => {
      const customError = new Error('CustomError')
      const fn = () => { throw customError }

      const result = getResultError<string>(fn)

      expect(result).toEqual([undefined, customError])
    })
  })
})
