import * as ReturnResultError from '../../src/return-result-error'
import { returnResultError } from '../../src/return-result-error/return-result-error'
import { returnResultErrorFromPromise } from '../../src/return-result-error/return-result-error-from-promise'
import { returnResultErrorFromFunction } from '../../src/return-result-error/return-result-error-from-function'
import { returnResultErrorFromAsyncFunction } from '../../src/return-result-error/return-result-error-from-async-function'
import { returnResultErrorFromSyncFunction } from '../../src/return-result-error/return-result-error-from-sync-function'
import { returnResultErrorFromConstructor } from '../../src/return-result-error/return-result-error-from-constructor'
import { returnResultErrorFromAsyncConstructor } from '../../src/return-result-error/return-result-error-from-async-constructor'
import { returnResultErrorFromSyncConstructor } from '../../src/return-result-error/return-result-error-from-sync-constructor'

test('import * as ReturnResultError', () => {
  expect(ReturnResultError).toEqual({
    returnResultError
  , returnResultErrorFromPromise
  , returnResultErrorFromFunction
  , returnResultErrorFromAsyncFunction
  , returnResultErrorFromSyncFunction
  , returnResultErrorFromConstructor
  , returnResultErrorFromAsyncConstructor
  , returnResultErrorFromSyncConstructor
  })
})
