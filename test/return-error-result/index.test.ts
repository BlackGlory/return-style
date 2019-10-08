import * as ReturnErrorResult from '../../src/return-error-result'
import { returnErrorResult } from '../../src/return-error-result/return-error-result'
import { returnErrorResultFromPromise } from '../../src/return-error-result/return-error-result-from-promise'
import { returnErrorResultFromFunction } from '../../src/return-error-result/return-error-result-from-function'
import { returnErrorResultFromAsyncFunction } from '../../src/return-error-result/return-error-result-from-async-function'
import { returnErrorResultFromSyncFunction } from '../../src/return-error-result/return-error-result-from-sync-function'
import { returnErrorResultFromConstructor } from '../../src/return-error-result/return-error-result-from-constructor'
import { returnErrorResultFromAsyncConstructor } from '../../src/return-error-result/return-error-result-from-async-constructor'
import { returnErrorResultFromSyncConstructor } from '../../src/return-error-result/return-error-result-from-sync-constructor'

test('import * as ReturnErrorResult', () => {
  expect(ReturnErrorResult).toEqual({
    returnErrorResult
  , returnErrorResultFromPromise
  , returnErrorResultFromFunction
  , returnErrorResultFromAsyncFunction
  , returnErrorResultFromSyncFunction
  , returnErrorResultFromConstructor
  , returnErrorResultFromAsyncConstructor
  , returnErrorResultFromSyncConstructor
  })
})
