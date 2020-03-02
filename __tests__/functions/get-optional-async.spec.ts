import { Some, None } from '@src/classes/optional'
import { getOptionalAsync, getOptionalAsyncPartial } from '@src/functions/get-optional-async'

describe('getOptionalAsync(promise: PromiseLike<T>, isNone: (val: T) => boolean) -> Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return Promise<None>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = getOptionalAsync(promise, allIsNone)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBeInstanceOf(None)
    })
  })

  describe('isNone returned false', () => {
    it('return Promise<Some>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = getOptionalAsync(promise, allIsSome)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBeInstanceOf(Some)
    })
  })
})

describe('getOptionalAsyncPartial(isNone: (val: T) => boolean) -> (promise: PromiseLike<T>) -> Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return Promise<None>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = getOptionalAsyncPartial(allIsNone)(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBeInstanceOf(None)
    })
  })

  describe('isNone returned false', () => {
    it('return Promise<Some>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = getOptionalAsyncPartial(allIsSome)(promise)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBeInstanceOf(Some)
    })
  })
})
