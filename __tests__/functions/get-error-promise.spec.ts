import { getErrorPromise } from '@functions/get-error-promise.js'

describe('getErrorPromise<T>(promise: PromiseLike<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.resolve('value')

      const err = await getErrorPromise(promise)

      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const err = await getErrorPromise(promise)

      expect(err).toBe(customError)
    })
  })
})
