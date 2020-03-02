import { Optional } from '@src/classes/optional'

export function getOptionalPartial<T>(isNone: (val: T) => boolean): (fn: () => T) => Optional<T> {
  return (fn: () => T) => getOptional(fn, isNone)
}

export function getOptional<T>(fn: () => T, isNone: (val: T) => boolean): Optional<T> {
  const result = fn()
  if (isNone(result)) {
    return Optional.ofNone()
  } else {
    return Optional.of(result)
  }
}
