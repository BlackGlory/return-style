import * as ReturnErrorResult from '../../src/return-error-result'
import { returnErrorResult } from '../../src/return-error-result/return-error-result'
import { returnErrorResultFromFunction } from '../../src/return-error-result/return-error-result-from-function'
import { returnErrorResultFromPromise } from '../../src/return-error-result/return-error-result-from-promise'
import { returnErrorResultFromAsyncFunction } from '../../src/return-error-result/return-error-result-from-async-function'
import { returnErrorResultFromSyncFunction } from '../../src/return-error-result/return-error-result-from-sync-function'

test('import * as ReturnErrorResult', () => {
  expect(ReturnErrorResult).toEqual({
    returnErrorResult
  , returnErrorResultFromFunction
  , returnErrorResultFromPromise
  , returnErrorResultFromAsyncFunction
  , returnErrorResultFromSyncFunction
  })
})
