import { Result } from '@src/classes/result'
import 'jest-extended'

describe('Result<T, X>', () => {
  describe('of<T>(value: T): Result<T, never>', () => {
    it('return Ok', () => {
      const value = 'value'

      const result = Result.of(value)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBeTrue()
    })
  })

  describe('ofErr<X>(error: X): Result<never, X>', () => {
    it('return Err', () => {
      const error = 'error'

      const result = Result.ofErr(error)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBeTrue()
    })
  })
})