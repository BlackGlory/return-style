import { toArrayAsync } from 'iterable-operator'
import { AsyncResult } from '@src/classes/async-result'
import '@test/matchers'

describe('AsyncOk<T>', () => {
  describe('[Symbol.asyncIterator](): AsyncIterator<T>', () => {
    it('return AsyncIterator', async () => {
      const value = 'value'

      const res = AsyncResult.of(value)
      const result = await toArrayAsync(res)

      expect(res).toBeAsyncIterable()
      expect(result).toEqual([value])
    })
  })

  describe('isOk(): Promise<boolean>', () => {
    it('return true', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)

      const result = res.isOk()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('isErr(): Promise<boolean>', () => {
    it('return false', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)

      const result = res.isErr()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })

  describe('onOk(callback: (val: T) => void): AsyncResult<T, X>', () => {
    it('invoke callback', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)
      const cb = jest.fn()

      const result = res.onOk(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks()
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
      expect(cb).toBeCalledWith(value)
    })
  })

  describe('onErr(callback: (err: X) => void): AsyncResult<T, X>', () => {
    it('not invoke callback', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)
      const cb = jest.fn()

      const result = res.onErr(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('orElse<U>(defaultValue: U): Result<T | U, X>', () => {
    it('return a copy', async () => {
      const value = 'value'
      const defaultValue = 0
      const res = AsyncResult.of(value)

      const result = res.orElse(defaultValue)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBe(true)
      expect(internalValue).toBe(value)
    })
  })

  describe('map<U>(mapper: (val: T) => U): AsyncResult<U, X>', () => {
    it('return Ok', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBe(true)
      expect(internalValue).toBe(newValue)
    })
  })

  describe('get(): Promise<T>', () => {
    it('return T', async () => {
      const value = 'value'
      const res = AsyncResult.of(value)

      const result = res.get()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)
    })
  })
})

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
