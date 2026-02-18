import { describe, it, expect } from 'vitest'
import { getErrorAsync } from '@functions/get-error-async.js'

describe('getErrorAsync<T>(fn: () => PromiseLike<unknown>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<undefined>', async () => {
      const fn = () => Promise.resolve('value')

      const err = await getErrorAsync(fn)

      expect(err).toBeUndefined()
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<T>', async () => {
        const customError = new Error('CusomtError')
        const fn = () => {
          throw customError
          return Promise.resolve('value')
        }

        const err = await getErrorAsync(fn)

        expect(err).toBe(customError)
      })
    })

    describe('async', () => {
      it('return Promise<T>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const err = await getErrorAsync(fn)

        expect(err).toBe(customError)
      })
    })
  })
})
