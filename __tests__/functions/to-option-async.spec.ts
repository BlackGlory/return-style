import { Option } from '@classes/option'
import { toOptionAsync } from '@functions/to-option-async'

describe('toOptionAsync', () => {
  describe('fn returned', () => {
    describe('sync', () => {
      it('return Some', async () => {
        const fn = jest.fn().mockReturnValue(true)

        const result = await toOptionAsync(fn)
        const isSome = result.isSome()

        expect(result).toBeInstanceOf(Option)
        expect(isSome).toBe(true)
      })
    })

    describe('async', () => {
      it('return Some', async () => {
        const fn = jest.fn().mockResolvedValue(true)

        const result = await toOptionAsync(fn)
        const isSome = result.isSome()

        expect(result).toBeInstanceOf(Option)
        expect(isSome).toBe(true)
      })
    })
  })

  describe('fn throwed', () => {
    describe('sync', () => {
      it('return None', async () => {
        const fn = () => {
          throw new Error()
        }

        const result = await toOptionAsync(fn)
        const isNone = result.isNone()

        expect(result).toBeInstanceOf(Option)
        expect(isNone).toBe(true)
      })
    })

    describe('async', () => {
      it('return None', async () => {
        const fn = jest.fn().mockRejectedValue(new Error())

        const result = await toOptionAsync(fn)
        const isNone = result.isNone()

        expect(result).toBeInstanceOf(Option)
        expect(isNone).toBe(true)
      })
    })
  })
})
