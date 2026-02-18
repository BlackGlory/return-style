import { describe, it, expect } from 'vitest'
import { getErrorResultAsync } from '@functions/get-error-result-async.js'

describe('getErrorResultAsync<X = Error, T = unknown>(fn: () => PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[undefined, T]>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = await getErrorResultAsync<string>(fn)

      expect(result).toEqual([undefined, value])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[X, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject(customError)
        }

        const result = await getErrorResultAsync<string>(fn)

        expect(result).toEqual([customError, undefined])
      })
    })

    describe('async', () => {
      it('return Promise<[X, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = await getErrorResultAsync<string>(fn)

        expect(result).toEqual([customError, undefined])
      })
    })
  })
})
