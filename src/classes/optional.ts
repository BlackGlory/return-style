export abstract class Optional<T> implements Iterable<T> {
  static of<T>(value: T): Optional<T> {
    return new Some(value)
  }

  static ofNone(): Optional<never> {
    return new None()
  }

  abstract [Symbol.iterator](): Iterator<T>

  abstract isSome(): boolean
  abstract isNone(): boolean

  abstract onSome(callback: (val: T) => void): Optional<T>
  abstract onNone(callback: () => void): Optional<T>

  abstract orElse<U>(defaultValue: U): Optional<T | U>
  abstract map<U>(mapper: (val: T) => U): Optional<U>
  abstract filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>

  abstract get(): T
}

class Some<T> extends Optional<T> {
  // fuck tsc https://github.com/microsoft/TypeScript/issues/36841
  private _value: T

  constructor(value: T) {
    super()
    this._value = value
  }

  *[Symbol.iterator]() {
    yield this._value
  }

  isSome() {
    return true
  }

  isNone() {
    return false
  }

  onSome(callback: (val: T) => void) {
    callback(this._value)
    return Optional.of(this._value)
  }

  onNone() {
    return Optional.of(this._value)
  }

  orElse() {
    return Optional.of(this._value)
  }

  map<U>(mapper: (val: T) => U) {
    return Optional.of(mapper(this._value))
  }

  filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U> {
    if (predicate(this._value)) {
      return Optional.of(this._value) as Optional<U>
    } else {
      return Optional.ofNone()
    }
  }

  get() {
    return this._value
  }
}

class None extends Optional<never> {
  * [Symbol.iterator]() {}

  isSome() {
    return false
  }

  isNone() {
    return true
  }

  onSome(_: (val: never) => void) {
    return Optional.ofNone()
  }

  onNone(callback: () => void) {
    callback()
    return Optional.ofNone()
  }

  orElse<T>(defaultValue: T) {
    return Optional.of(defaultValue)
  }

  map() {
    return Optional.ofNone()
  }

  filter() {
    return Optional.ofNone()
  }

  get(): never {
    throw new Error('Cannot get value from None')
  }
}
