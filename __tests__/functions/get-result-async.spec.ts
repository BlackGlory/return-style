import { getResultAsync } from '@src/functions/get-result-async'
import '@test/matchers'

describe('getResultAsync<T>(promise: PromiseLike<T>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<T>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = getResultAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)
    })
  })

  describe('fn throwed', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.reject()

      const result = getResultAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })
})
