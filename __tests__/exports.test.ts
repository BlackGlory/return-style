import * as target from '@src/index'

test('exports', () => {
  const expectedExports: string[] = [
    'getErrorResult'
  , 'getErrorResultAsync'

  , 'getResultError'
  , 'getResultErrorAsync'

  , 'getSuccess'
  , 'getSuccessAsync'

  , 'getFailure'
  , 'getFailureAsync'

  , 'isSuccess'
  , 'isSuccessAsync'

  , 'isFailure'
  , 'isFailureAsync'

  , 'getError'
  , 'getErrorAsync'
  , 'getErrorAsyncIterable'

  , 'toResult'
  , 'toResultAsync'

  , 'toOptional'
  , 'toOptionalPartial'
  , 'toOptionalAsync'
  , 'toOptionalAsyncPartial'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
