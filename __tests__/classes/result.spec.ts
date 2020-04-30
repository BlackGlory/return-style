import { Result, Ok, Err } from '@src/classes/result'

describe('Result<T, X>', () => {
  describe('of<T>(value: T): Result<T, never>', () => {
    it('return Ok', () => {
      const value = 'value'

      const result = Result.of(value)

      expect(result).toBeInstanceOf(Ok)
      expect(result).toBeInstanceOf(Result)
    })
  })

  describe('ofErr<X>(error: X): Result<never, X>', () => {
    it('return Err', () => {
      const error = 'error'

      const result = Result.ofErr(error)

      expect(result).toBeInstanceOf(Err)
      expect(result).toBeInstanceOf(Result)
    })
  })
})
