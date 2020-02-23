import { getDefault, isDefault } from '../../src/utils/default'

test('getDefault()', () => {
  expect(typeof getDefault()).toBe('symbol')
})

test('isDefault(defaultValue)', () => {
  expect(isDefault(getDefault())).toBeTruthy()
})

test('isDefault(otherSymbol)', () => {
  expect(isDefault(Symbol())).toBeFalsy()
})
