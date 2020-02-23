import { safeSync } from '../../src/safe/safe-sync'

test('safeSync(fn)', () => {
  function unsafe() {
    throw null
  }

  expect(safeSync(unsafe)).toBeUndefined()
})

test('safeSync(fn, logger)', () => {
  function unsafe() {
    throw null
  }

  let lastError
  expect(safeSync(unsafe, error => lastError = error)).toBeUndefined()
  expect(lastError).toBeNull()
})
