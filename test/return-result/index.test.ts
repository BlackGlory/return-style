import * as ReturnResult from '../../src/return-result'
import { returnResult } from '../../src/return-result/return-result'
import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'
import { returnResultFromPromise } from '../../src/return-result/return-result-from-promise'
import { returnResultFromAsyncFunction } from '../../src/return-result/return-result-from-async-function'
import { returnResultFromSyncFunction } from '../../src/return-result/return-result-from-sync-function'

test('import * as ReturnResult', () => {
  expect(ReturnResult).toEqual({
    returnResult
  , returnResultFromFunction
  , returnResultFromPromise
  , returnResultFromAsyncFunction
  , returnResultFromSyncFunction
  })
})
