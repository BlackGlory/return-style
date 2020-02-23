import * as Safe from '../../src/safe'
import { safe } from '../../src/safe/safe'
import { safeAsync } from '../../src/safe/safe-async'
import { safeSync } from '../../src/safe/safe-sync'

test('import * as Safe', () => {
  expect(Safe).toEqual({
    safe
  , safeAsync
  , safeSync
  })
})
