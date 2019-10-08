import * as ReturnError from '../../src/return-error'
import { returnError } from '../../src/return-error/return-error'
import { returnErrorFromPromise } from '../../src/return-error/return-error-from-promise'
import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'
import { returnErrorFromAsyncFunction } from '../../src/return-error/return-error-from-async-function'
import { returnErrorFromSyncFunction } from '../../src/return-error/return-error-from-sync-function'
import { returnErrorFromConstructor } from '../../src/return-error/return-error-from-constructor'
import { returnErrorFromAsyncConstructor } from '../../src/return-error/return-error-from-async-constructor'
import { returnErrorFromSyncConstructor } from '../../src/return-error/return-error-from-sync-constructor'

test('import * as ReturnError', () => {
  expect(ReturnError).toEqual({
    returnError
  , returnErrorFromPromise
  , returnErrorFromFunction
  , returnErrorFromAsyncFunction
  , returnErrorFromSyncFunction
  , returnErrorFromConstructor
  , returnErrorFromAsyncConstructor
  , returnErrorFromSyncConstructor
  })
})
