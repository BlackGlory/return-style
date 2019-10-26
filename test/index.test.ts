import * as ReturnStyle from '../src'
import * as ErrorStyle from '../src/error/'
import * as ErrorResultStyle from '../src/error-result'
import * as ResultStyle from '../src/result'
import * as ResultErrorStyle from '../src/result-error'

test('import * as ReturnType', () => {
  expect(ReturnStyle).toEqual(
    Object.assign(
      {}
    , ErrorStyle
    , ErrorResultStyle
    , ErrorResultStyle
    , ResultStyle
    , ResultErrorStyle
    )
  )
})
