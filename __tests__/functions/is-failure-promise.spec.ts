import { describe, it, expect } from 'vitest'
import { isFailurePromise } from '@functions/is-failure-promise.js'

describe('isFailurePromise(promise: PromiseLike<unknown>): Promise<boolean>', () => {
  describe('promise resolved', () => {
    it('return Promise<false>', async () => {
      const promise = Promise.resolve()

      const result = await isFailurePromise(promise)

      expect(result).toBe(false)
    })
  })

  describe('promise rejected', () => {
    it('return Promise<true>', async () => {
      const promise = Promise.reject()

      const result = await isFailurePromise(promise)

      expect(result).toBe(true)
    })
  })
})
