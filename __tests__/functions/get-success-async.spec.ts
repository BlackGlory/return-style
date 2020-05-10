import { getSuccessAsync } from '@src/functions/get-success-async'

describe('getSuccessAsync<X, T>(promise: PromiseLike<T>): Promise<[true, T] | [false, X]>', () => {
  describe('fn returned', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getSuccessAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    it('return Promise<[false, X]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getSuccessAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([false, customError])
    })
  })
})
