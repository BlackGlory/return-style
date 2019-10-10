import * as ReturnResult from '../../src/return-result'
import { returnResult } from '../../src/return-result/return-result'
import { returnResultFromPromise } from '../../src/return-result/return-result-from-promise'
import { returnResultFromFunction } from '../../src/return-result/return-result-from-function'
import { returnResultFromAsyncFunction } from '../../src/return-result/return-result-from-async-function'
import { returnResultFromSyncFunction } from '../../src/return-result/return-result-from-sync-function'
import { returnResultFromConstructor } from '../../src/return-result/return-result-from-constructor'
import { returnResultFromAsyncConstructor } from '../../src/return-result/return-result-from-async-constructor'
import { returnResultFromSyncConstructor } from '../../src/return-result/return-result-from-sync-constructor'
import { returnResultFromGenerator } from '../../src/return-result/return-result-from-generator'

test('import * as ReturnResult', () => {
  expect(ReturnResult).toEqual({
    returnResult
  , returnResultFromPromise
  , returnResultFromFunction
  , returnResultFromAsyncFunction
  , returnResultFromSyncFunction
  , returnResultFromConstructor
  , returnResultFromAsyncConstructor
  , returnResultFromSyncConstructor
  , returnResultFromGenerator
  })
})
