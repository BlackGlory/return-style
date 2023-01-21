import { Result } from '@classes/result.js'
import { toResult } from '@functions/to-result.js'

describe('toResult', () => {
  describe('fn throw error', () => {
    it('return Err', () => {
      const fn = () => { throw new Error() }

      const result = toResult(fn)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBe(true)
    })
  })

  describe('fn return result', () => {
    it('return Ok', () => {
      const fn = () => true

      const result = toResult(fn)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBe(true)
    })
  })
})
