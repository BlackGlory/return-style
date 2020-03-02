import { getErrorAsync } from '@src/functions/get-error-async'

describe('getErrorAsync(promise: PromiseLike<unknown>) -> Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.resolve('value')

      const result = getErrorAsync(promise)
      const err = await result

      expect(result).toBeInstanceOf(Promise)
      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getErrorAsync(promise)
      const err = await result

      expect(result).toBeInstanceOf(Promise)
      expect(err).toBe(customError)
    })
  })
})
