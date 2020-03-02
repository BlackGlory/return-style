import { isFailureAsync } from '@src/functions/is-failure-async'

describe('isFailureAsync(promise: PromiseLike<unknown>) -> Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.resolve()

      const result = isFailureAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(false)
    })
  })

  describe('promise rejected', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.reject()

      const result = isFailureAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(true)
    })
  })
})
