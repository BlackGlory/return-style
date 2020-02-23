import * as ResultError from '../../src/result-error'
import { getResultError } from '../../src/result-error/get-result-error'
import { getResultErrorAsync } from '../../src/result-error/get-result-error-async'
import { getResultErrorSync } from '../../src/result-error/get-result-error-sync'
import { getResultErrorPromise } from '../../src/result-error/get-result-error-promise'
import { newResultError } from '../../src/result-error/new-result-error'
import { newResultErrorAsync } from '../../src/result-error/new-result-error-async'
import { newResultErrorSync } from '../../src/result-error/new-result-error-sync'
import { returnResultError } from '../../src/result-error/return-result-error'
import { returnResultErrorAsync } from '../../src/result-error/return-result-error-async'
import { returnResultErrorSync } from '../../src/result-error/return-result-error-sync'

test('import * as ResultError', () => {
  expect(ResultError).toEqual({
    getResultError
  , getResultErrorAsync
  , getResultErrorSync
  , getResultErrorPromise
  , newResultError
  , newResultErrorAsync
  , newResultErrorSync
  , returnResultError
  , returnResultErrorAsync
  , returnResultErrorSync
  })
})
