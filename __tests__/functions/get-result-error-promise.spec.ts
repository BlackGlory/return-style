import { getResultErrorPromise } from '@functions/get-result-error-promise'

describe('getResultErrorPromise<X = Error, T = unknown>(promise: PromiseLike<T>) -> Promise<[T, undefined] | [undefined, X]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[T, undefined]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = await getResultErrorPromise<string>(promise)

      expect(result).toEqual([value, undefined])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[undefined, X]', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = await getResultErrorPromise<string>(promise)

      expect(result).toEqual([undefined, customError])
    })
  })
})
