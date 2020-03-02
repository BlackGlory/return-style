export abstract class Result<T, X> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>

  static of<T>(value: T): Result<T, never> {
    return new Ok(value)
  }

  static ofErr<X>(error: X): Result<never, X> {
    return new Err(error)
  }

  abstract isOk(): boolean
  abstract isErr(): boolean

  abstract onOk(callback: (val: T) => void): this
  abstract onErr(callback: (err: X) => void): this

  abstract orElse<U>(defaultValue: U): Result<T | U, X>
  abstract map<U>(mapper: (val: T) => U): Result<U, X>

  abstract get(): T
}

export class Ok<T> extends Result<T, never> {
  #value: T

  constructor(value: T) {
    super()
    this.#value = value
  }

  * [Symbol.iterator]() {
    yield this.#value
  }

  isOk() {
    return true
  }

  isErr() {
    return false
  }

  onOk(callback: (val: T) => void) {
    callback(this.#value)
    return this
  }

  onErr() {
    return this
  }

  orElse() {
    return Result.of(this.#value)
  }

  map<U>(mapper: (val: T) => U) {
    return Result.of(mapper(this.#value))
  }

  get() {
    return this.#value
  }
}

export class Err<X> extends Result<never, X> {
  #value: X

  constructor(err: X) {
    super()
    this.#value = err
  }

  * [Symbol.iterator]() {}

  isOk() {
    return false
  }

  isErr() {
    return true
  }

  onOk() {
    return this
  }

  onErr(callback: (err: X) => void) {
    callback(this.#value)
    return this
  }

  orElse<T>(defaultValue: T) {
    return Result.of(defaultValue)
  }

  map() {
    return Result.ofErr(this.#value)
  }

  get(): never {
    throw this.#value
  }
}
