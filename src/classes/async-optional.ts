export const None = Symbol()

interface IAsyncOptional<T> extends AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>

  onSome(callback: (val: T) => void): IAsyncOptional<T>
  onNone(callback: () => void): IAsyncOptional<T>

  isSome(): Promise<boolean>
  isNone(): Promise<boolean>

  orElse<U>(defaultValue: U): IAsyncOptional<T | U>
  map<U>(mapper: (val: T) => U): IAsyncOptional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): IAsyncOptional<U>

  get(): Promise<T>
}

export class AsyncOptional<T> implements IAsyncOptional<T> {
  static of<T>(value: T): AsyncOptional<T> {
    return new AsyncSome(value)
  }

  static ofNone(): AsyncOptional<never> {
    return new AsyncNone()
  }

  #promise: PromiseLike<T | typeof None>

  constructor(promise: PromiseLike<T | typeof None>) {
    this.#promise = promise
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    const result = await this.#promise
    if (result !== None) yield result
  }

  onSome(callback: (val: T) => void): AsyncOptional<T> {
    (async () => {
      const result = await this.#promise
      if (result !== None) callback(result)
    })()
    return new AsyncOptional(this.#promise)
  }

  onNone(callback: () => void): AsyncOptional<T> {
    (async () => {
      const result = await this.#promise
      if (result === None) callback()
    })()
    return new AsyncOptional(this.#promise)
  }

  async isSome(): Promise<boolean> {
    const result = await this.#promise
    return result !== None
  }

  async isNone(): Promise<boolean> {
    const result = await this.#promise
    return result === None
  }

  orElse<U>(defaultValue: U): AsyncOptional<T | U> {
    return new AsyncOptional<T | U>((async () => {
      const result = await this.#promise
      if (result === None) return defaultValue
      return result
    })())
  }

  map<U>(mapper: (val: T) => U): AsyncOptional<U> {
    return new AsyncOptional<U>((async () => {
      const result = await this.#promise
      if (result === None) return None
      return mapper(result)
    })())
  }

  filter<U extends T = T>(predicate: (val: T) => boolean): AsyncOptional<U> {
    return new AsyncOptional<U>((async () => {
      const result = await this.#promise
      if (result === None) return None
      if (predicate(result)) return result as U
      return None
    })())
  }

  async get(): Promise<T> {
    const result = await this.#promise
    if (result === None) throw new Error('Cannot get value from None')
    return result
  }
}

class AsyncNone extends AsyncOptional<never> {
  constructor() {
    super(Promise.resolve(None))
  }
}

class AsyncSome<T> extends AsyncOptional<T> {
  constructor(value: T) {
    super(Promise.resolve(value))
  }
}
