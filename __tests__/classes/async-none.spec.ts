import { getErrorAsync } from '@src/functions/get-error-async'
import { AsyncOptional } from '@src/classes/async-optional'
import { toArrayAsync } from 'iterable-operator'

describe('AsyncNone', () => {
  describe('[Symbol.itrable](): Iterator<T>', () => {
    it('return Iterator', async () => {
      const opt = AsyncOptional.ofNone()

      const isIter = isAsyncIterable(opt)
      const result = await toArrayAsync(opt)

      expect(isIter).toBe(true)
      expect(result).toEqual([])
    })
  })

  describe('isSome(): Promise<boolean>', () => {
    it('return Promise<false>', async () => {
      const opt = AsyncOptional.ofNone()

      const result = opt.isSome()
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(false)
    })
  })

  describe('isNone(): Promise<boolean>', () => {
    it('return Promise<true>', async () => {
      const opt = AsyncOptional.ofNone()

      const result = opt.isNone()
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toBe(true)
    })
  })

  describe('onSome(callback: (val: T) => void): AsyncOptional<T>', () => {
    it('not invoke callback', async () => {
      const opt = AsyncOptional.ofNone()
      const cb = jest.fn()

      const result = opt.onSome(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onNone(callback: () => void): AsyncOptional<T>', () => {
    it('invoke callback', async () => {
      const opt = AsyncOptional.ofNone()
      const cb = jest.fn()

      const result = opt.onNone(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(result).not.toBe(opt)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
    })
  })

  describe('orElse<U>(defaultValue: U): AsyncOptional<T | U>', () => {
    it('return a AsyncSome', async () => {
      const opt = AsyncOptional.ofNone()
      const defaultValue = 'defaultValue'

      const result = opt.orElse(defaultValue)
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncOptional)
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): AsyncOptional<U>', () => {
    it('return a copy', async () => {
      const opt = AsyncOptional.ofNone()
      const fn = jest.fn()

      const result = opt.map(fn)
      const isNone = await result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBe(true)
      expect(result).not.toBe(opt)
    })
  })

  describe('filter<U extends T = T>(predicate: (val: T) => boolean): AsyncOptional<U>', () => {
    it('return a copy', async () => {
      const opt = AsyncOptional.ofNone()
      const fn = jest.fn()

      const result = opt.filter(fn)
      const isNone = await result.isNone()

      expect(fn).not.toBeCalled()
      expect(result).toBeInstanceOf(AsyncOptional)
      expect(isNone).toBe(true)
      expect(result).not.toBe(opt)
    })
  })

  describe('get(): Promise<T>', () => {
    it('throw error', async () => {
      const opt = AsyncOptional.ofNone()

      const result = opt.get()
      const err = await getErrorAsync(result)

      expect(result).toBeInstanceOf(Promise)
      expect(err).toBeInstanceOf(Error)
    })
  })
})

function isAsyncIterable<T>(val: any): val is AsyncIterable<T> {
  return val && typeof val[Symbol.asyncIterator] === 'function'
}

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
