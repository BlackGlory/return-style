import { getErrorAsyncIterable } from '@functions/get-error-async-iterable'
import '@test/matchers'

describe('getErrorAsyncIterable<T>(iterable: AsyncIterable<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const iter = (async function* () {})()

      const result = getErrorAsyncIterable(iter)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const iter = (async function* () { throw customError })()

      const result = getErrorAsyncIterable(iter)
      const err = await result

      expect(result).toBePromise()
      expect(err).toBe(customError)
    })
  })
})
