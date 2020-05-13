import { getErrorAsync } from '@src/functions/get-error-async'
import '@test/matchers'

describe('getErrorAsync<T>(promise: PromiseLike<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.resolve('value')

      const result = getErrorAsync(promise)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getErrorAsync(promise)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBe(customError)
    })
  })
})
