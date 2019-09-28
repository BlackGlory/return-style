import * as ReturnError from '../../src/return-error'
import { returnError } from '../../src/return-error/return-error'
import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'
import { returnErrorFromPromise } from '../../src/return-error/return-error-from-promise'
import { returnErrorFromAsyncFunction } from '../../src/return-error/return-error-from-async-function'
import { returnErrorFromSyncFunction } from '../../src/return-error/return-error-from-sync-function'

test('import * as ReturnError', () => {
  expect(ReturnError).toEqual({
    returnError
  , returnErrorFromFunction
  , returnErrorFromPromise
  , returnErrorFromAsyncFunction
  , returnErrorFromSyncFunction
  })
})
