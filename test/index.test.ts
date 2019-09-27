import * as ReturnType from '../src'
import * as ReturnError from '../src/return-error/'
import * as ReturnErrorResult from '../src/return-error-result'
import * as ReturnResult from '../src/return-result'
import * as ReturnResultError from '../src/return-result-error'

test('import * as ReturnType', () => {
  expect(ReturnType).toEqual(Object.assign({}, ReturnError, ReturnErrorResult, ReturnResult, ReturnResultError))
})
