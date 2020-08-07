import { AsyncResult } from '@src/classes/async-result'
import { toResultAsync } from '@src/functions/to-result-async'
import 'jest-extended'

describe('toResultAsync<T, X = any>(promise: PromiseLike<T>): AsyncResult<T, X>', () => {
  describe('promise rejected', () => {
    it('return Err', async () => {
      const promise = Promise.reject(new Error())

      const result = toResultAsync<boolean>(promise)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isErr).toBeTrue()
    })
  })

  describe('promise resolved', () => {
    it('return Ok', async () => {
      const promise = Promise.resolve(true)

      const result = toResultAsync<boolean>(promise)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBeTrue()
    })
  })
})
