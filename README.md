# return-style

Non-intrusively convert the return value of any function or promise into the style that the user needs.

## Installation

```sh
npm install --save return-style
# or
yarn add return-style
```

## API

### [Error, Result]

Return tuple (Error, Result).

* `function getErrorResult<X, T>(fn: () => T): [undefined, T] | [X, undefined]`
* `function getErrorResultAsync<X, T>(promise: PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>`

```ts
const [err, ret] = getErrorResult(() => fn())
const [err] = getErrorResult(() => fn())

const [err, ret] = await getErrorResultAsync(fnAsync())
const [err] = await getErrorResultAsync(fnAsync())
```

### [Result, Error]

Return tuple (Result, Error).

* `function getResultError<X, T>(fn: () => T): [T, undefined] | [undefined, X]`
* `function getResultErrorAsync<X, T>(promise: PromiseLike<T>): Promise<[T, undefined] | [undefined, X]>`

```ts
const [ret, err] = getResultError(() => fn())
const [ret] = getResultError(() => fn())

const [ret, err] = await getResultErrorAsync(fnAsync())
const [ret] = await getResultErrorAsync(fnAsync())
```

### isSuccess

Return true when returning, false when throwing.

* `function isSuccess(fn: () => unknown): boolean`
* `function isSuccessAsync(promise: PromiseLike<unknown>): Promise<boolean>`

```ts
if (isSuccess(() => fn())) {
  ...
}

if (await isSuccessAsync(fnAsync())) {
  ...
}
```

### isFailure

Return true when throwing, true when returning.

* `function isFailure(fn: () => unknown): boolean`
* `function isFailureAsync(promise: PromiseLike<unknown>): Promise<boolean>`

```ts
if (isFailure(() => fn())) {
  ...
}

if (await isFailureAsync(fnAsync())) {
  ...
}
```

### getError / getErrorAsync

Designed for testing, helping to achieve Arrange-Act-Assert pattern.

* `function getError<T>(fn: () => unknown): T | undefined`
* `function getErrorAsync<T>(promise: PromiseLike<unknown>): Promise<T | undefined>`

```js
// BAD: try...catch
test('divided by zero', () => {
  expect.hasAssertions()

  const calc = createCalculator()

  try {
    calc.eval('1 / 0')
  } catch (err) {
    expect(err).toInstanceOf(Error)
  }
})

// BAD: toThrow
test('divided by zero', () => {
  const calc = createCalculator()

  expect(() => calc.eval('1 / 0')).toThrow(Error)
})

// GOOD: Arrange, Act, Assert
test('divided by zero', () => {
  const calc = createCalculator()

  const err = getError(() => calc.eval('1 / 0'))

  expect(err).toInstanceOf(Error)
})
```

### Result: Ok / Err

* `function getResult<T, X>(fn: () => T): Result<T, X>`
* `function getResultAsync<T, X>(promise: PromiseLike<T>): Promise<Result<T, X>>>`

```ts
interface Result<T, X> {
  [Symbol.iterable](): Iterable<T>

  isOk(): boolean
  isErr(): boolean

  onOk(callback: (val: T) => void): this
  onErr(callback: (err: X) => void): this

  orElse<U>(defaultValue: U): Result<T | U, X>
  map<U>(mapper: (val: T) => U): Result<U, X>

  get(): T
}
```

### Optional: Some / None

* `function getOptional<T>(fn: () => T | U, isNone: (val: T) => boolean) => Option<T>`
* `function getOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T | U) => Option<T>`
* `function getOptionalAsync<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean) => Promise<Option<T>>`
* `function getOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => Promise<Option<T>>`

```ts
interface Optional<T> {
  [Symbol.iterable](): Iterator<T>

  isSome(): boolean
  isNone(): boolean

  onSome(callback: (val: T) => void): this
  onNone(callback: () => void): this

  orElse(defaultValue: U): Optional<T | U>
  map<U>(mapper: (val: T) => U): Optional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>

  get(): T
}
```
