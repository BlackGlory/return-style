import { getResultErrorAsync } from '@functions/get-result-error-async'

describe('getResultErrorAsync<X = Error, T = unknown>(fn: () => PromiseLike<T>): Promise<[T, undefined] | [undefined, X]>', () => {
  describe('fn returned', () => {
    it('return Promise<[T, undefined]>', async () => {
      const value = 'value'
      const promise = () => Promise.resolve(value)

      const result = await getResultErrorAsync<string>(promise)

      expect(result).toEqual([value, undefined])
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<[undefined, X]', async () => {
        const customError = new Error('CustomError')
        const fn = () => {
          throw customError
          return Promise.reject()
        }

        const result = await getResultErrorAsync<string>(fn)

        expect(result).toEqual([undefined, customError])
      })
    })

    describe('async', () => {
      it('return Promise<[undefined, X]', async () => {
        const customError = new Error('CustomError')
        const fn = () => Promise.reject(customError)

        const result = await getResultErrorAsync<string>(fn)

        expect(result).toEqual([undefined, customError])
      })
    })
  })
})
