import * as Error from '../../src/error'
import { getError } from '../../src/error/get-error'
import { getErrorAsync } from '../../src/error/get-error-async'
import { getErrorSync } from '../../src/error/get-error-sync'
import { getErrorPromise } from '../../src/error/get-error-promise'
import { newError } from '../../src/error/new-error'
import { newErrorAsync } from '../../src/error/new-error-async'
import { newErrorSync } from '../../src/error/new-error-sync'
import { returnError } from '../../src/error/return-error'
import { returnErrorAsync } from '../../src/error/return-error-async'
import { returnErrorSync } from '../../src/error/return-error-sync'

test('import * as Error', () => {
  expect(Error).toEqual({
    getError
  , getErrorAsync
  , getErrorSync
  , getErrorPromise
  , newError
  , newErrorAsync
  , newErrorSync
  , returnError
  , returnErrorAsync
  , returnErrorSync
  })
})
