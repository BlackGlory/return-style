import { getSuccessAsync } from '@functions/get-success-async.js'

describe('getSuccessAsync<T>(fn: () => PromiseLike<T>): Promise<[true, T] | [false, undefined]>', () => {
  describe('fn returned', () => {
    it('return Promise<[true, T]>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = await getSuccessAsync(fn)

      expect(result).toEqual([true, value])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[false, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject()
        }

        const result = await getSuccessAsync(fn)

        expect(result).toEqual([false, undefined])
      })
    })

    describe('async', () => {
      it('return Promise<[false, undefined]>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = await getSuccessAsync(fn)

        expect(result).toEqual([false, undefined])
      })
    })
  })
})
