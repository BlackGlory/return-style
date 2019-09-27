import * as ReturnError from '../../src/return-error'
import { returnError } from '../../src/return-error/return-error'
import { returnErrorFromFunction } from '../../src/return-error/return-error-from-function'
import { returnErrorFromPromise } from '../../src/return-error/return-error-from-promise'

test('import * as ReturnError', () => {
  expect(ReturnError).toEqual({
    returnError
  , returnErrorFromFunction
  , returnErrorFromPromise
  })
})
