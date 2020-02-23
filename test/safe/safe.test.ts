import { isPromise } from '../../src/utils/is-promise'
import { safe } from '../../src/safe/safe'

test('safe(fn)', () => {
  function unsafe() {
    throw null
  }

  expect(safe(unsafe)).toBeUndefined()
})

test('safe(fn, logger)', () => {
  function unsafe() {
    throw null
  }

  let lastError
  expect(safe(unsafe, error => lastError = error)).toBeUndefined()
  expect(lastError).toBeNull()
})

test('safe(asyncFn)', async () => {
  async function unsafe() {
    throw null
  }

  const result = safe(unsafe)
  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeUndefined()
})

test('safe(asyncFn, logger)', async () => {
  async function unsafe() {
    throw null
  }

  let lastError
  const result = safe(unsafe, error => lastError = error)
  expect(lastError).toBeUndefined()
  expect(await result).toBeUndefined()
  expect(lastError).toBeNull()
})
