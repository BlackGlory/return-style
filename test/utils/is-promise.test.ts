import { isPromise, isPromiseLike } from '../../src/utils/is-promise'

test('isPromise === isPromiseLike', () => {
  expect(isPromise).toBe(isPromiseLike)
})

test('isPromise(Promise)', () => {
  expect(isPromise(Promise.resolve())).toBeTruthy()
})

test('isPromise(null)', () => {
  expect(isPromise(null)).toBeFalsy()
})
