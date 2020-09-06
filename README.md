# return-style

Non-intrusively convert the result of any function or promise to the user's desired style.

## Install

```sh
npm install --save return-style
# or
yarn add return-style
```

## API

### [Error, Result]

Return tuple (Error, Result).

* `function getErrorResult<T, X = any>(fn: () => T): [undefined, T] | [X, undefined]`
* `function getErrorResultAsync<X, T = any>(fn: () => PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>`
* `function getErrorResultPromise<X, T = any>(promise: PromiseLike<T>): Promise<[undefined, T] | [X, undefined]>`

```ts
const [err, ret] = getErrorResult(() => fn())
const [err] = getErrorResult(() => fn())

const [err, ret] = await getErrorResultAsync(() => fnAsync())
const [err] = await getErrorResultAsync(() => fnAsync())

const [err, ret] = await getErrorResultAsync(promise)
const [err] = await getErrorResultAsync(promise)
```

### [Result, Error]

Return tuple (Result, Error).

* `function getResultError<T, X = any>(fn: () => T): [T, undefined] | [undefined, X]`
* `function getResultErrorAsync<T, X = any>(fn: () => PromiseLike<T>): Promise<[T, undefined] | [undefined, X]>`
* `function getResultErrorPromise<T, X = any>(promise: PromiseLike<T>): Promise<[T, undefined] | [undefined, X]>`

```ts
const [ret, err] = getResultError(() => fn())
const [ret] = getResultError(() => fn())

const [ret, err] = await getResultErrorAsync(() => fn())
const [ret] = await getResultErrorAsync(() => fn())

const [ret, err] = await getResultErrorPromise(promise)
const [ret] = await getResultErrorPromise(promise)
```

### [isSuccess, Result | undefined]

Return tuple (isSuccess, Result | undefined)

* `function getSuccess<T>(fn: () => T): [true, T] | [false, undefined]`
* `function getSuccessAsync<T>(fn: () => PromiseLike<T>): Promise<[true, T] | [false, undefined]>`
* `function getSuccessPromise<T>(promise: PromiseLike<T>): Promise<[true, T] | [false, undefined]>`

```ts
const [succ, ret] = getSuccess(() => fn())

const [succ, ret] = await getSuccessAsync(() => asyncFn())

const [succ, ret] = await getSuccessPromise(promise)
```

### [isFailure, Error | undefined ]

Return tuple (isFailure, Error | undefined)

* `function getFailure<X>(fn: () => unknown): [true, X] | [false, undefined]`
* `function getFailureAsync<X>(fn: () => PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>`
* `function getFailurePromise<X>(promise: PromiseLike<unknown>): Promise<[true, X] | [false, undefined]>`

```ts
const [fail, ret] = getFailure(() => fn())

const [fail, ret] = await getFailureAsync(() => asyncFn())

const [fail, ret] = await getFailurePromise(promise)
```

### isSuccess

Return true when returning, false when throwing.

* `function isSuccess(fn: () => unknown): boolean`
* `function isSuccessAsync(fn: () => PromiseLike<unknown>: Promise<boolean>`
* `function isSuccessPromise(promise: PromiseLike<unknown>): Promise<boolean>`

```ts
if (isSuccess(() => fn())) {
  ...
}

if (await isSuccessAsync(() => asyncFn())) {
  ...
}

if (await isSuccessPromise(promise)) {
  ...
}
```

### isFailure

Return true when throwing, true when returning.

* `function isFailure(fn: () => unknown): boolean`
* `function isFailureAsync(fn: () => PromiseLike<unknown>): Promise<boolean>`
* `function isFailurePromise(promise: PromiseLike<unknown>): Promise<boolean>`

```ts
if (isFailure(() => fn())) {
  ...
}

if (await isFailureAsync(() => asyncFn())) {
  ...
}

if (await isFailurePromise(promise)) {
  ...
}
```

### getResult

* `function getResult<T>(fn: () => T): T | undefined`
* `function getResultAsync<T>(fn: () => PromiseLike<T>): Promise<T | undefined>`
* `function getResultPromise<T>(promise: PromiseLike<T>): Promise<T | undefined>`

```js
const result = getResult(() => fn())
if (result) {
  ...
}

const result = await getResultAsync(() => asyncFn())
if (result) {
  ...
}

const result = await getResultPromise(promise)
if (result) {
  ...
}
```

### getError

Designed for testing, helping to achieve Arrange-Act-Assert pattern.

* `function getError<T>(fn: () => unknown): T | undefined`
* `function getErrorAsync<T>(fn: () => PromiseLike<unknown>): Promise<T | undefined>`
* `function getErrorPromise<T>(promise: PromiseLike<unknown>): Promise<T | undefined>`
* `function getErrorAsyncIterable<T>(iterable: AsyncIterable<unknown>): Promise<T | undefined>`

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

### Result<T, X> = Ok<T> | Err<X>

* `function toResult<T, X = any>(fn: () => T): Result<T, X>`
* `function toResultAsync<T, X = any>(fn: () => PromiseLike<T>): AsyncResult<T, X>`
* `function toResultPromise<T, X = any>(promise: PromiseLike<T>): AsyncResult<T, X>`

```ts
interface Result<T, X> {
  [Symbol.iterator](): Iterator<T, void>

  onOk(callback: (val: T) => void): Result<T, X>
  onErr(callback: (err: X) => void): Result<T, X>

  isOk(): boolean
  isErr(): boolean

  orElse<U>(defaultValue: U): Result<T | U, never>
  map<U>(mapper: (val: T) => U): Result<U, X>

  get(): T
}

interface AsyncResult<T, X> {
  [Symbol.asyncIterator](): AsyncIterator<T, void>

  onOk(callback: (val: T) => void): AsyncResult<T, X>
  onErr(callback: (err: X) => void): AsyncResult<T, X>

  isOk(): Promise<boolean>
  isErr(): Promise<boolean>

  orElse<U>(defaultValue: U): AsyncResult<T | U, never>
  map<U>(mapper: (val: T) => U): AsyncResult<U, X>

  get(): Promise<T>
}
```

### Optional<T> = Some<T> | None

* `function toOptional<T>(fn: () => T | U, isNone: (val: T) => boolean): Optional<T>`
* `function toOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T | U) => Optional<T>`
* `function toOptionalPromise<T>(promise: PromiseLike<T>, isNone: (val: T) => boolean): AsyncOptional<T>`
* `function toOptionalPromisePartial<T>(isNone: (val: T) => boolean): (promise: PromiseLike<T>) => AsyncOptional<T>`

```ts
interface Optional<T> {
  [Symbol.iterator](): Iterator<T, void>

  onSome(callback: (val: T) => void): this
  onNone(callback: () => void): this

  isSome(): boolean
  isNone(): boolean

  orElse<U>(defaultValue: U): Optional<T | U>
  map<U>(mapper: (val: T) => U): Optional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): Optional<U>

  get(): T
}

interface AsyncOptional<T> {
  [Symbol.asyncIterator](): AsyncIterator<T, void>

  onSome(callback: (val: T) => void): this
  onNone(callback: () => void): this

  isSome(): Promise<boolean>
  isNone(): Promise<boolean>

  orElse<U>(defaultValue: U): AsyncOptional<T | U>
  map<U>(mapper: (val: T) => U): AsyncOptional<U>
  filter<U extends T = T>(predicate: (val: T) => boolean): AsyncOptional<U>

  get(): Promise<T>
}
```
