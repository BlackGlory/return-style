import { returnResultGenerator } from '../../src/result/return-result-generator'

test('returnResultGenerator(fn)', () => {
  function* g(init: number) {
    yield init
    return 2
    yield 3 // never
  }

  const generator = returnResultGenerator(g)
  const iter = generator(1)

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.next()).toEqual({ value: 2, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultGenerator(fn) iterator return', () => {
  function* g() {
    yield 1
    yield 2
    yield 3
  }

  const generator = returnResultGenerator(g)
  const iter = generator()

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.return()).toEqual({ value: undefined, done: true})
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultGenerator(fn) generator throws error', () => {
  function* g() {
    yield 1
    throw 'error'
    yield 2 // never
  }

  const generator = returnResultGenerator(g)
  expect([...generator()]).toEqual([1])

  const iter = generator()
  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.next()).toEqual({ value: null, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('returnResultGenerator(fn) iterator throws error', () => {
  function * g() {
    yield 1
    yield 2
    yield 3
  }

  const generator = returnResultGenerator(g)
  const iter = generator()

  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.throw('error')).toEqual({ value: null, done: true })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})
