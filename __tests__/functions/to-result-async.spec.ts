import { Result } from '@classes/result.js'
import { toResultAsync } from '@functions/to-result-async.js'
import { jest } from '@jest/globals'

describe('toResultAsync', () => {
  describe('fn returned', () => {
    describe('sync', () => {
      it('return Ok', async () => {
        const fn = jest.fn().mockReturnValue(true)

        const result = await toResultAsync(fn)
        const isOk = result.isOk()

        expect(result).toBeInstanceOf(Result)
        expect(isOk).toBe(true)
      })
    })

    describe('async', () => {
      it('return Ok', async () => {
        const fn = jest.fn<any>().mockResolvedValue(true)

        const result = await toResultAsync(fn)
        const isOk = result.isOk()

        expect(result).toBeInstanceOf(Result)
        expect(isOk).toBe(true)
      })
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return Err', async () => {
        const fn = () => {
          throw new Error()
        }

        const result = await toResultAsync(fn)
        const isErr = result.isErr()

        expect(result).toBeInstanceOf(Result)
        expect(isErr).toBe(true)
      })
    })

    describe('async', () => {
      it('return Err', async () => {
        const fn = jest.fn<any>().mockRejectedValue(new Error())

        const result = await toResultAsync(fn)
        const isErr = result.isErr()

        expect(result).toBeInstanceOf(Result)
        expect(isErr).toBe(true)
      })
    })
  })
})
