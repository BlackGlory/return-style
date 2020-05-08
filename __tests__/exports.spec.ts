import * as target from '@src/index'

test('exports', () => {
  const expectedExports: string[] = [
    'getErrorResult'
  , 'getErrorResultAsync'

  , 'getResultError'
  , 'getResultErrorAsync'

  , 'isSuccess'
  , 'isSuccessAsync'

  , 'isFailure'
  , 'isFailureAsync'

  , 'getError'
  , 'getErrorAsync'
  , 'getErrorAsyncIterable'

  , 'getResult'
  , 'getResultAsync'

  , 'getOptional'
  , 'getOptionalPartial'
  , 'getOptionalAsync'
  , 'getOptionalAsyncPartial'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
