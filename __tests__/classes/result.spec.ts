import { Result, Ok, Err } from '@src/classes/result'

describe('Result', () => {
  describe('of(value: T) -> Result<T, never>', () => {
    it('return Ok', () => {
      const value = 'value'

      const result = Result.of(value)

      expect(result).toBeInstanceOf(Ok)
      expect(result).toBeInstanceOf(Result)
    })
  })

  describe('ofErr(error: X) -> Result<never, X>', () => {
    it('return Err', () => {
      const error = 'error'

      const result = Result.ofErr(error)

      expect(result).toBeInstanceOf(Err)
      expect(result).toBeInstanceOf(Result)
    })
  })
})
