import { convertConstructorToFunction } from '../../src/utils/convert-constructor-to-function'

test('convertConstructorToFunction(constructor)', () => {
  class Virus {
    constructor(public name: string) {}
  }

  const createVirus = convertConstructorToFunction(Virus)
  const v = createVirus('SARS-Cov-2')

  expect(v).toBeInstanceOf(Virus)
  expect(v.name).toEqual('SARS-Cov-2')
})
