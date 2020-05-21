import { getSuccessAsync } from '@src/functions/get-success-async'
import '@test/matchers'

describe('getSuccessAsync<T>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getSuccessAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    it('return Promise<[false, undefined]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getSuccessAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([false, undefined])
    })
  })
})
