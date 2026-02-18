import { describe, it, expect } from 'vitest'
import { getResultPromise } from '@functions/get-result-promise.js'

describe('getResultPromise<T>(promise: PromiseLike<T>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<T>', async () => {
      const value = 'value'
      const promise = Promise.resolve(value)

      const result = await getResultPromise(promise)

      expect(result).toBe(value)
    })
  })

  describe('fn throwed', () => {
    it('return Promise<undefined>', async () => {
      const promise = Promise.reject()

      const result = await getResultPromise(promise)

      expect(result).toBeUndefined()
    })
  })
})
