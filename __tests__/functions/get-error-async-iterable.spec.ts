import { describe, it, expect } from 'vitest'
import { go } from '@blackglory/go'
import { getErrorAsyncIterable } from '@functions/get-error-async-iterable.js'
import { pass } from '@blackglory/pass'

describe('getErrorAsyncIterable<T>(iterable: AsyncIterable<unknown>): Promise<T | undefined>', () => {
  describe('promise resolved', () => {
    it('return Promise<undefined>', async () => {
      const iter = go(async function* () {
        pass()
      })

      const err = await getErrorAsyncIterable(iter)

      expect(err).toBeUndefined()
    })
  })

  describe('promise rejected', () => {
    it('return Promise<T>', async () => {
      const customError = new Error('CustomError')
      const iter = go(async function* () {
        throw customError
      })

      const err = await getErrorAsyncIterable(iter)

      expect(err).toBe(customError)
    })
  })
})
