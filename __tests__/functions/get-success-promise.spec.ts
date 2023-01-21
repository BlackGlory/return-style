import { getSuccessPromise } from '@functions/get-success-promise.js'

describe('getSuccessPromise<T>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = await getSuccessPromise(promise)

      expect(result).toEqual([true, value])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[false, undefined]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = await getSuccessPromise(promise)

      expect(result).toEqual([false, undefined])
    })
  })
})
