import { AsyncResult } from '@src/classes/async-result'
import { toResultPromise } from '@src/functions/to-result-promise'
import 'jest-extended'

describe('toResultPromise<T, X = any>(promise: PromiseLike<T>): AsyncResult<T, X>', () => {
  describe('promise rejected', () => {
    it('return Err', async () => {
      const promise = Promise.reject(new Error())

      const result = toResultPromise<boolean>(promise)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isErr).toBeTrue()
    })
  })

  describe('promise resolved', () => {
    it('return Ok', async () => {
      const promise = Promise.resolve(true)

      const result = toResultPromise<boolean>(promise)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBeTrue()
    })
  })
})
