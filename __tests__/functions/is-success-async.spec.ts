import { isSuccessAsync } from '@src/functions/is-success-async'

describe('isSuccessAsync(promise: PromiseLike<unknown>) -> Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.resolve()

      const result = isSuccessAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(true)
    })
  })

  describe('promise rejected', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.reject()

      const result = isSuccessAsync(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(false)
    })
  })
})
