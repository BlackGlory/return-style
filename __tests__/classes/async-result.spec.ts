import { AsyncResult } from '@src/classes/async-result'

describe('AsyncResult<T, X>', () => {
  describe('of<T>(value: T): AsyncResult<T, never>', () => {
    it('return Ok', async () => {
      const value = 'value'

      const result = AsyncResult.of(value)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBe(true)
    })
  })

  describe('ofErr<X>(error: X): AsyncResult<never, X>', () => {
    it('return Err', async () => {
      const error = 'error'

      const result = AsyncResult.ofErr(error)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isErr).toBe(true)
    })
  })
})
