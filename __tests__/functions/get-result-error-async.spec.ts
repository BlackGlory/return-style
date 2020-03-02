import { getResultErrorAsync } from '@src/functions/get-result-error-async'

describe('getResultErrorAsync(promise: PromiseLike<T>) -> Promise<[T, undefined] | [undefined, X]>', () => {
  describe('promise resolved', () => {
    it('return Promise<[T, undefined]>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getResultErrorAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([value, undefined])
    })
  })

  describe('promise rejected', () => {
    it('return Promise<[undefined, X]', async () => {
      const customError = new Error('CustomError')
      const promise = Promise.reject(customError)

      const result = getResultErrorAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([undefined, customError])
    })
  })
})
