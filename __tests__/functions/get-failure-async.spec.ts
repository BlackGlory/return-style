import { getFailureAsync } from '@src/functions/get-failure-async'

describe('getFailureAsync<X, T>(promise: PromiseLike<T>): Promise<[false, T] | [true, X]>', () => {
  describe('fn returned', () => {
    it('return Promise<[false, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getFailureAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([false, value])
    })
  })

  describe('fn throwed', () => {
    it('return Promise<[true, X]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getFailureAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([true, customError])
    })
  })
})
