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
  // fuck tsc https://github.com/microsoft/TypeScript/issues/36841
  private _value: T

  constructor(value: T) {
    super()
    this._value = value
  }

  * [Symbol.iterator]() {
    yield this._value
  }

  isOk() {
    return true
  }

  isErr() {
    return false
  }

  onOk(callback: (val: T) => void) {
    callback(this._value)
    return Result.of(this._value)
  }

  onErr() {
    return Result.of(this._value)
  }

  orElse() {
    return Result.of(this._value)
  }

  map<U>(mapper: (val: T) => U) {
    return Result.of(mapper(this._value))
  }

  get() {
    return this._value
  }
}

class Err<X> extends Result<never, X> {
  // fuck tsc https://github.com/microsoft/TypeScript/issues/36841
  private _value: X

  constructor(err: X) {
    super()
    this._value = err
  }

  * [Symbol.iterator]() {}

  isOk() {
    return false
  }

  isErr() {
    return true
  }

  onOk() {
    return Result.ofErr(this._value)
  }

  onErr(callback: (err: X) => void) {
    callback(this._value)
    return Result.ofErr(this._value)
  }

  orElse<T>(defaultValue: T) {
    return Result.of(defaultValue)
  }

  map() {
    return Result.ofErr(this._value)
  }

  get(): never {
    throw this._value
  }
}
