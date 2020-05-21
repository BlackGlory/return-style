import { getFailureAsync } from '@src/functions/get-failure-async'
import '@test/matchers'

describe('getFailureAsync<X>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[false, undefined]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getFailureAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([false, undefined])
    })
  })

  describe('fn throwed', () => {
    it('return Promise<[true, X]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getFailureAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([true, customError])
    })
  })
})
