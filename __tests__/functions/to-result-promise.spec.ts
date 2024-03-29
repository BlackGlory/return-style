import { Result } from '@classes/result.js'
import { toResultPromise } from '@functions/to-result-promise.js'

describe('toResultPromise', () => {
  describe('promise rejected', () => {
    it('return Err', async () => {
      const promise = Promise.reject(new Error())

      const result = await toResultPromise(promise)
      const isErr = result.isErr()

      expect(result).toBeInstanceOf(Result)
      expect(isErr).toBe(true)
    })
  })

  describe('promise resolved', () => {
    it('return Ok', async () => {
      const promise = Promise.resolve(true)

      const result = await toResultPromise(promise)
      const isOk = result.isOk()

      expect(result).toBeInstanceOf(Result)
      expect(isOk).toBe(true)
    })
  })
})
