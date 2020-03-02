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

  abstract onSome(callback: (val: T) => void): this
  abstract onNone(callback: () => void): this

  abstract orElse<U>(defaultValue: U): Optional<T | U>
  abstract map<U>(mapper: (val: T) => U): Optional<U>
  abstract filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>

  abstract get(): T
}

export class Some<T> extends Optional<T> {
  #value: T

  constructor(value: T) {
    super()
    this.#value = value
  }

  *[Symbol.iterator]() {
    yield this.#value
  }

  isSome() {
    return true
  }

  isNone() {
    return false
  }

  onSome(callback: (val: T) => void) {
    callback(this.#value)
    return this
  }

  onNone() {
    return this
  }

  orElse() {
    return Optional.of(this.#value)
  }

  map<U>(mapper: (val: T) => U) {
    return Optional.of(mapper(this.#value))
  }

  filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U> {
    if (predicate(this.#value)) {
      return Optional.of(this.#value) as Optional<U>
    } else {
      return Optional.ofNone()
    }
  }

  get() {
    return this.#value
  }
}

export class None extends Optional<never> {
  * [Symbol.iterator]() {}

  isSome() {
    return false
  }

  isNone() {
    return true
  }

  onSome(_: (val: never) => void) {
    return this
  }

  onNone(callback: () => void) {
    callback()
    return this
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
