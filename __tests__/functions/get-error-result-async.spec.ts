import { getErrorResultAsync } from '@src/functions/get-error-result-async'
import '@test/matchers'

describe('getErrorResultAsync<T, X = any>(promise: PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[undefined, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getErrorResultAsync<string>(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([undefined, value])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[X, undefined]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getErrorResultAsync<string>(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([customError, undefined])
    })
  })
})
