import { isFailureAsync } from '@functions/is-failure-async.js'

describe('isFailureAsync(fn: () => PromiseLike<unknown>): Promise<boolean>', () => {
  describe('fn returned', () => {
    it('return Promise<false>', async () => {
      const fn = () => Promise.resolve()

      const result = await isFailureAsync(fn)

      expect(result).toBe(false)
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<true>', async () => {
        const fn = () => {
          throw new Error()
          return Promise.reject()
        }

        const result = await isFailureAsync(fn)

        expect(result).toBe(true)
      })
    })

    describe('async', () => {
      it('return Promise<true>', async () => {
        const fn = () => Promise.reject()

        const result = await isFailureAsync(fn)

        expect(result).toBe(true)
      })
    })
  })
})
