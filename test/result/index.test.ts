import * as ReturnResult from '../../src/result'
import { getResult } from '../../src/result/get-result'
import { getResultAsync } from '../../src/result/get-result-async'
import { getResultSync } from '../../src/result/get-result-sync'
import { getResultPromise } from '../../src/result/get-result-promise'
import { newResult } from '../../src/result/new-result'
import { newResultAsync } from '../../src/result/new-result-async'
import { newResultSync } from '../../src/result/new-result-sync'
import { returnResult } from '../../src/result/return-result'
import { returnResultAsync } from '../../src/result/return-result-async'
import { returnResultSync } from '../../src/result/return-result-sync'

test('import * as ReturnResult', () => {
  expect(ReturnResult).toEqual({
    getResult
  , getResultAsync
  , getResultSync
  , getResultPromise
  , newResult
  , newResultAsync
  , newResultSync
  , returnResult
  , returnResultAsync
  , returnResultSync
  })
})
