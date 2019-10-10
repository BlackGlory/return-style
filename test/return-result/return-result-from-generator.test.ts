import { returnResultFromGenerator } from '../../src/return-result/return-result-from-generator'

test('returnResultFromGenerator(fn)', () => {
  function* g(init: number) {
    yield init
    return 2
    yield 3 // never
  }

  const generator = returnResultFromGenerator(g)
  const iter = generator(1)

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.next()).toEqual({ value: 2, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultFromGenerator(fn) iterator return', () => {
  function* g() {
    yield 1
    yield 2
    yield 3
  }

  const generator = returnResultFromGenerator(g)
  const iter = generator()

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.return()).toEqual({ value: undefined, done: true})
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultFromGenerator(fn) generator throws error', () => {
  function* g() {
    yield 1
    throw 'error'
    yield 2 // never
  }

  const generator = returnResultFromGenerator(g)
  expect([...generator()]).toEqual([1])

  const iter = generator()
  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.next()).toEqual({ value: null, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultFromGenerator(fn) iterator throws error', () => {
  function * g() {
    yield 1
    yield 2
    yield 3
  }

  const generator = returnResultFromGenerator(g)
  const iter = generator()

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.throw('error')).toEqual({ value: null, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})
