import * as ReturnStyle from '../src'
import * as Custom from '../src/custom'
import * as Error from '../src/error'
import * as ErrorResult from '../src/error-result'
import * as Result from '../src/result'
import * as ResultError from '../src/result-error'
import * as Safe from '../src/safe'

test('import * as ReturnStyle', () => {
  expect(ReturnStyle).toEqual(
    Object.assign(
      {}
    , Custom
    , Error
    , ErrorResult
    , ErrorResult
    , Result
    , ResultError
    , Safe
    )
  )
})
