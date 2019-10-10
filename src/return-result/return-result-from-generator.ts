export function returnResultFromGenerator<Yield, Return, Next, Args extends unknown[] = any[]>(fn: (...args: Args) => Generator<Yield, Return, Next>): (...args: Args) => Generator<Yield, Return | null, Next> {
  return function (this: unknown, ...args: Args) {
    const iter = Reflect.apply<Generator<Yield, Return, Next>>(fn, this, args)
    return {
      next(...args: [] | [Next]) {
        try {
          return Reflect.apply(iter.next, iter, args)
        } catch {
          return { value: null, done: true } // return value will be ignore by built-in feature like for...of
        }
      }
    , return(value: Return) {
        return Reflect.apply(iter.return, iter, [value])
      }
    , throw(error: any) {
        try {
          return Reflect.apply(iter.throw, iter, [error])
        } catch {
          return { value: null, done: true }
        }
      }
    , [Symbol.iterator]() {
        return this
      }
    }
  }
}
