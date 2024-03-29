import { getFailureAsync } from '@functions/get-failure-async.js'

describe('getFailurePromise<X = Error>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[false, undefined]>', async () => {
      const fn = () => Promise.resolve('value')

      const result = await getFailureAsync(fn)

      expect(result).toEqual([false, undefined])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[true, X]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject(customError)
        }

        const result = await getFailureAsync(fn)

        expect(result).toEqual([true, customError])
      })
    })

    describe('async', () => {
      it('return Promise<[true, X]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = await getFailureAsync(fn)

        expect(result).toEqual([true, customError])
      })
    })
  })
})
