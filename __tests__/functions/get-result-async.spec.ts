import { getResultAsync } from '@functions/get-result-async.js'

describe('getResultAsync<T>(fn: () => PromiseLike<T>): Promise<T | undefined>', () => {
  describe('fn returned', () => {
    it('return Promise<undefined>', async () => {
      const value = 'value'
      const fn = () => Promise.resolve(value)

      const result = await getResultAsync(fn)

      expect(result).toBe(value)
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<undefined>', async () => {
        const customError = new Error('CusomtError')
        const fn = () => {
          throw customError
          return Promise.resolve('value')
        }

        const result = await getResultAsync(fn)

        expect(result).toBeUndefined()
      })
    })

    describe('async', () => {
      it('return Promise<undefined>', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = await getResultAsync(fn)

        expect(result).toBeUndefined()
      })
    })
  })
})
