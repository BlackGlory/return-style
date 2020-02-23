const defaultValue = Symbol()

export function getDefault() {
  return defaultValue
}

export function isDefault(obj: unknown): obj is symbol {
  return obj === defaultValue
}
