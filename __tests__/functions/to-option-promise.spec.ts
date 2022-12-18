import { Option } from '@classes/option'
import { toOptionPromise } from '@functions/to-option-promise'

describe('toOptionPromise', () => {
  describe('promise rejected', () => {
    it('return None', async () => {
      const promise = Promise.reject(new Error())

      const result = await toOptionPromise(promise)
      const isErr = result.isNone()

      expect(result).toBeInstanceOf(Option)
      expect(isErr).toBe(true)
    })
  })

  describe('promise resolved', () => {
    it('return Some', async () => {
      const promise = Promise.resolve(true)

      const result = await toOptionPromise(promise)
      const isOk = result.isSome()

      expect(result).toBeInstanceOf(Option)
      expect(isOk).toBe(true)
    })
  })
})
