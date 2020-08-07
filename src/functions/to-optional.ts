import { Optional } from '@src/classes/optional'

export function toOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T) => Optional<T> {
  return (fn: () => T) => toOptional(fn, isNone)
}

export function toOptional<T>(fn: () => T, isNone: (val: T) => boolean): Optional<T> {
  const result = fn()
  if (isNone(result)) {
    return Optional.ofNone()
  } else {
    return Optional.of(result)
  }
}
