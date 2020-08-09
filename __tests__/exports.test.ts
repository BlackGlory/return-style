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
