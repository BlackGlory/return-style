import { isFailureAsync } from '@src/functions/is-failure-async'
import 'jest-extended'
import '@test/matchers'

describe('isFailureAsync(promise: PromiseLike<unknown>): Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.resolve()

      const result = isFailureAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeFalse()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.reject()

      const result = isFailureAsync(promise)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeTrue()
    })
  })
})
