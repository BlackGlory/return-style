import { Result } from '@classes/result'
import { toResultAsync } from '@functions/to-result-async'
import 'jest-extended'
import '@blackglory/jest-matchers'

describe('toResultAsync', () => {
  describe('fn returned', () => {
    describe('sync', () => {
      it('return Ok', async () => {
        const fn = jest.fn().mockReturnValue(true)

        const result = await toResultAsync(fn)
        const isOk = result.isOk()

        expect(result).toBeInstanceOf(Result)
        expect(isOk).toBeTrue()
      })
    })

    describe('async', () => {
      it('return Ok', async () => {
        const fn = jest.fn().mockResolvedValue(true)

        const result = await toResultAsync(fn)
        const isOk = result.isOk()

        expect(result).toBeInstanceOf(Result)
        expect(isOk).toBeTrue()
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
        expect(isErr).toBeTrue()
      })
    })

    describe('async', () => {
      it('return Err', async () => {
        const fn = jest.fn().mockRejectedValue(new Error())

        const result = await toResultAsync(fn)
        const isErr = result.isErr()

        expect(result).toBeInstanceOf(Result)
        expect(isErr).toBeTrue()
      })
    })
  })
})
