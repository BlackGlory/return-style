import { isPromise } from '../../src/utils/is-promise'
import { safeAsync } from '../../src/safe/safe-async'

test('safeAsync(fn)', async () => {
  async function unsafe() {
    throw null
  }

  const result = safeAsync(unsafe)
  expect(isPromise(result)).toBeTruthy()
  expect(await result).toBeUndefined()
})

test('safeAsync(fn, logger)', async () => {
  async function unsafe() {
    throw null
  }

  let lastError
  const result = safeAsync(unsafe, error => lastError = error)
  expect(lastError).toBeUndefined()
  expect(await result).toBeUndefined()
  expect(lastError).toBeNull()
})
