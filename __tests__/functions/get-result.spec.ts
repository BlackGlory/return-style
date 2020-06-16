import { Result } from '@src/classes/result'
import { getResult } from '@src/functions/get-result'
import 'jest-extended'

describe('getResult<T, X = any>(fn: () => T): Result<T, X>', () => {
  describe('fn throw error', () => {
    it('return Err', () => {
      const fn = () => { throw new Error() }

      const result = getResult<boolean>(fn)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBeTrue()
    })
  })

  describe('fn return result', () => {
    it('return Ok', () => {
      const fn = () => true

      const result = getResult<boolean>(fn)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBeTrue()
    })
  })
})
