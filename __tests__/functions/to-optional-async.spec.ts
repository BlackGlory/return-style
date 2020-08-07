import { AsyncOptional } from '@src/classes/async-optional'
import { toOptionalAsync, toOptionalAsyncPartial } from '@src/functions/to-optional-async'
import 'jest-extended'

describe('toOptionalAsync<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return AsyncOptional<never>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = toOptionalAsync(promise, allIsNone)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return AsyncOptional<T>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = toOptionalAsync(promise, allIsSome)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})

describe('toOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => Promise<Optional<T>>', () => {
  describe('isNone returned true', () => {
    it('return Promise<None>', async () => {
      const promise = Promise.resolve()
      const allIsNone = () => true

      const result = toOptionalAsyncPartial(allIsNone)(promise)
      const isNone = await result.isNone()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBeTrue()
    })
  })

  describe('isNone returned false', () => {
    it('return Promise<Some>', async () => {
      const promise = Promise.resolve()
      const allIsSome = () => false

      const result = toOptionalAsyncPartial(allIsSome)(promise)
      const isSome = await result.isSome()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isSome).toBeTrue()
    })
  })
})
