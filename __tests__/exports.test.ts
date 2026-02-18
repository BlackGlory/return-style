import { test, expect } from 'vitest'
import * as target from '@src/index.js'

test('exports', () => {
  const expectedExports: string[] = [
    'getErrorResult'
  , 'getErrorResultAsync'
  , 'getErrorResultPromise'

  , 'getResultError'
  , 'getResultErrorAsync'
  , 'getResultErrorPromise'

  , 'getSuccess'
  , 'getSuccessAsync'
  , 'getSuccessPromise'

  , 'getFailure'
  , 'getFailureAsync'
  , 'getFailurePromise'

  , 'isSuccess'
  , 'isSuccessAsync'
  , 'isSuccessPromise'

  , 'isFailure'
  , 'isFailureAsync'
  , 'isFailurePromise'

  , 'getResult'
  , 'getResultAsync'
  , 'getResultPromise'

  , 'getError'
  , 'getErrorAsync'
  , 'getErrorPromise'
  , 'getErrorAsyncIterable'

  , 'Result'
  , 'toResult'
  , 'toResultAsync'
  , 'toResultPromise'

  , 'Option'
  , 'toOption'
  , 'toOptionAsync'
  , 'toOptionPromise'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
