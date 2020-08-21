import { getSuccessPromise } from '@src/functions/get-success-promise'
import { getFailurePromise } from '@src/functions/get-failure-promise'
import { isSuccessPromise } from '@src/functions/is-success-promise'
import { isFailurePromise } from '@src/functions/is-failure-promise'

interface IAsyncResult<T, X> extends AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>

  onOk(callback: (val: T) => void): IAsyncResult<T, X>
  onErr(callback: (err: X) => void): IAsyncResult<T, X>

  isOk(): Promise<boolean>
  isErr(): Promise<boolean>

  orElse<U>(defaultValue: U): IAsyncResult<T | U, never>
  map<U>(mapper: (val: T) => U): IAsyncResult<U, X>

  get(): Promise<T>
}

export class AsyncResult<T, X> implements IAsyncResult<T, X> {
  static of<T>(value: T): AsyncResult<T, never> {
    return new AsyncOk(value)
  }

  static ofErr<X>(error: X): AsyncResult<never, X> {
    return new AsyncErr(error)
  }

  #promise: PromiseLike<T>

  constructor(promise: PromiseLike<T>) {
    this.#promise = promise
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    const [succ, ret] = await getSuccessPromise<T>(this.#promise)
    if (succ) yield ret as T
  }

  onOk(callback: (val: T) => void): AsyncResult<T, X> {
    (async () => {
      const [succ, ret] = await getSuccessPromise<T>(this.#promise)
      if (succ) callback(ret as T)
    })()
    return new AsyncResult(this.#promise)
  }

  onErr(callback: (err: X) => void): AsyncResult<T, X> {
    (async () => {
      const [fail, err] = await getFailurePromise<X>(this.#promise)
      if (fail) callback(err as X)
    })()
    return new AsyncResult(this.#promise)
  }

  async isOk(): Promise<boolean> {
    return await isSuccessPromise(this.#promise)
  }

  async isErr(): Promise<boolean> {
    return await isFailurePromise(this.#promise)
  }

  orElse<U>(defaultValue: U): AsyncResult<T | U, never> {
    return new AsyncResult((async () => {
      try {
        return await this.#promise
      } catch {
        return defaultValue
      }
    })())
  }

  map<U>(mapper: (val: T) => U): AsyncResult<U, X> {
    return new AsyncResult((async () => {
      const result = await this.#promise
      return mapper(result as T)
    })())
  }

  async get(): Promise<T> {
    return await this.#promise
  }
}

class AsyncOk<T> extends AsyncResult<T, never> {
  constructor(value: T) {
    super(Promise.resolve(value))
  }
}

class AsyncErr<X> extends AsyncResult<never, X> {
  constructor(err: X) {
    super(Promise.reject(err))
  }
}
