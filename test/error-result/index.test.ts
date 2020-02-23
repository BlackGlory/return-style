import * as ErrorResult from '../../src/error-result'
import { getErrorResult } from '../../src/error-result/get-error-result'
import { getErrorResultAsync } from '../../src/error-result/get-error-result-async'
import { getErrorResultSync } from '../../src/error-result/get-error-result-sync'
import { getErrorResultPromise } from '../../src/error-result/get-error-result-promise'
import { newErrorResult } from '../../src/error-result/new-error-result'
import { newErrorResultAsync } from '../../src/error-result/new-error-result-async'
import { newErrorResultSync } from '../../src/error-result/new-error-result-sync'
import { returnErrorResult } from '../../src/error-result/return-error-result'
import { returnErrorResultAsync } from '../../src/error-result/return-error-result-async'
import { returnErrorResultSync } from '../../src/error-result/return-error-result-sync'

test('import * as ErrorResult', () => {
  expect(ErrorResult).toEqual({
    getErrorResult
  , getErrorResultAsync
  , getErrorResultSync
  , getErrorResultPromise
  , newErrorResult
  , newErrorResultAsync
  , newErrorResultSync
  , returnErrorResult
  , returnErrorResultAsync
  , returnErrorResultSync
  })
})
