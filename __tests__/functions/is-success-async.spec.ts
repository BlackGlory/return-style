import { isSuccessAsync } from '@functions/is-success-async'

describe('isSuccessAsync(fn: () => PromiseLike<unknown>): Promise<boolean>', () => {
  describe('fn returned', () => {
    it('return Promise<true>', async () => {
      const fn = () => Promise.resolve()

      const result = await isSuccessAsync(fn)

      expect(result).toBe(true)
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Promise<false>', async () => {
        const fn = () => {
          throw new Error()
          return Promise.reject()
        }

        const result = await isSuccessAsync(fn)

        expect(result).toBe(false)
      })
    })

    describe('async', () => {
      it('return Promise<false>', async () => {
        const fn = () => Promise.reject()

        const result = await isSuccessAsync(fn)

        expect(result).toBe(false)
      })
    })
  })
})
