import { isSuccessPromise } from '@functions/is-success-promise.js'

describe('isSuccessPromise(promise: PromiseLike<unknown>): Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.resolve()

      const result = await isSuccessPromise(promise)

      expect(result).toBe(true)
    })
  })

  describe('promise rejected', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.reject()

      const result = await isSuccessPromise(promise)

      expect(result).toBe(false)
    })
  })
})
