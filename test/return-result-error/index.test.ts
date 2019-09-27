import * as ReturnResultError from '../../src/return-result-error'
import { returnResultError } from '../../src/return-result-error/return-result-error'
import { returnResultErrorFromFunction } from '../../src/return-result-error/return-result-error-from-function'
import { returnResultErrorFromPromise } from '../../src/return-result-error/return-result-error-from-promise'

test('import * as ReturnResultError', () => {
  expect(ReturnResultError).toEqual({
    returnResultError
  , returnResultErrorFromFunction
  , returnResultErrorFromPromise
  })
})
