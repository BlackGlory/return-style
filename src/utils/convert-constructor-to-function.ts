export function convertConstructorToFunction<T, U extends unknown[] = any[]>(fn: new (...args: U) => T): (...args: U) => T {
  return function (this: unknown, ...args: U) {
    return Reflect.construct(fn, args)
  }
}
