import { toArrayAsync } from 'iterable-operator'
import { getErrorAsync } from '@src/functions/get-error-async'
import { AsyncResult } from '@src/classes/async-result'
import '@test/matchers'

describe('AsyncErr<X>', () => {
  describe('[Symbol.asyncIterator](): AsyncIterator<T>', () => {
    it('return Iterator', async () => {
      const error = new Error('error')

      const res = AsyncResult.ofErr(error)
      const result = await toArrayAsync(res)

      expect(res).toBeAsyncIterable()
      expect(result).toEqual([])
    })
  })

  describe('isOk(): Promise<boolean>', () => {
    it('return false', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)

      const result = res.isOk()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })

  describe('isErr(): Promise<boolean>', () => {
    it('return true', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)

      const result = res.isErr()
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('onOk(callback: (val: T) => void): AsyncResult<T, X>', () => {
    it('not invoke callback', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)
      const cb = jest.fn()

      const result = res.onOk(cb)
      await runAllMicrotasks()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(cb).not.toBeCalled()
    })
  })

  describe('onErr(callback: (err: X) => void): AsyncResult<T, X>', () => {
    it('invoke callback', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)
      const cb = jest.fn()

      const result = res.onErr(cb)
      const calledTimesBefore = getCalledTimes(cb)
      await runAllMicrotasks()
      const calledTimesAfter = getCalledTimes(cb)

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(calledTimesBefore).toBe(0)
      expect(calledTimesAfter).toBe(1)
      expect(cb).toBeCalledWith(error)
    })
  })

  describe('orElse<U>(defaultVAlue: U): AsyncResult<T | U, X>', () => {
    it('return Ok', async () => {
      const error = new Error('error')
      const defaultValue = 0
      const res = AsyncResult.ofErr(error)

      const result = res.orElse(defaultValue)
      const isOk = await result.isOk()
      const internalValue = await result.get()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isOk).toBe(true)
      expect(internalValue).toBe(defaultValue)
    })
  })

  describe('map<U>(mapper: (val: T) => U): AsyncResult<U, X>', () => {
    it('return a copy', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)
      const newValue = 0
      const fn = jest.fn().mockReturnValue(newValue)

      const result = res.map(fn)
      const isErr = await result.isErr()

      expect(result).toBeInstanceOf(AsyncResult)
      expect(result).not.toBe(res)
      expect(isErr).toBe(true)
    })
  })

  describe('get(): T', () => {
    it('throw X', async () => {
      const error = new Error('error')
      const res = AsyncResult.ofErr(error)

      const result = await getErrorAsync(res.get())

      expect(result).toBe(error)
    })
  })
})

function runAllMicrotasks(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}
