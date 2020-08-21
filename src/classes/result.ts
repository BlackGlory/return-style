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

  abstract onOk(callback: (val: T) => void): Result<T, X>
  abstract onErr(callback: (err: X) => void): Result<T, X>

  abstract orElse<U>(defaultValue: U): Result<T | U, never>
  abstract map<U>(mapper: (val: T) => U): Result<U, X>

  abstract get(): T
}

class Ok<T> extends Result<T, never> {
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
    return Result.of(this.#value)
  }

  onErr() {
    return Result.of(this.#value)
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

class Err<X> extends Result<never, X> {
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
    return Result.ofErr(this.#value)
  }

  onErr(callback: (err: X) => void) {
    callback(this.#value)
    return Result.ofErr(this.#value)
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
