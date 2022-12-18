import { getFailurePromise } from '@functions/get-failure-promise'

describe('getFailurePromise<X = Error>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[false, undefined]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = await getFailurePromise(promise)

      expect(result).toEqual([false, undefined])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[true, X]>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = await getFailurePromise(promise)

      expect(result).toEqual([true, customError])
    })
  })
})
