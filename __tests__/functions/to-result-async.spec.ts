import { AsyncResult } from '@src/classes/async-result'
import { toResultAsync } from '@src/functions/to-result-async'
import 'jest-extended'

describe('toResultAsync<T, X = any>(fn: () => PromiseLike<T>): AsyncResult<T, X>', () => {
  describe('fn returned', () => {
    it('return Ok', async () => {
      const fn = () => Promise.resolve(true)

      const result = toResultAsync<boolean>(fn)
      const isOk = await result.isOk()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(isOk).toBeTrue()
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Err', async () => {
        const fn = () => {
          throw new Error()
          return Promise.resolve(true)
        }

        const result = toResultAsync<boolean>(fn)
        const isErr = await result.isErr()

        expect(result).toBeInstanceOf(AsyncResult)
        expect(isErr).toBeTrue()
      })
    })

    describe('async', () => {
      it('return Err', async () => {
        const fn = () => Promise.reject(new Error())

        const result = toResultAsync<boolean>(fn)
        const isErr = await result.isErr()

        expect(result).toBeInstanceOf(AsyncResult)
        expect(isErr).toBeTrue()
      })
    })
  })
})
