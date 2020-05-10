import { AsyncOptional } from '@src/classes/async-optional'
import { getOptionalAsync, getOptionalAsyncPartial } from '@src/functions/get-optional-async'

describe('getOptionalAsync<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return AsyncOptional<never>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = getOptionalAsync(promise, allIsNone)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBe(true)
    })
  })

  describe('isNone returned false', () => {
    it('return AsyncOptional<T>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = getOptionalAsync(promise, allIsSome)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBe(true)
    })
  })
})

describe('getOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return Promise<None>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = getOptionalAsyncPartial(allIsNone)(promise)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBe(true)
    })
  })

  describe('isNone returned false', () => {
    it('return Promise<Some>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = getOptionalAsyncPartial(allIsSome)(promise)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBe(true)
    })
  })
})
