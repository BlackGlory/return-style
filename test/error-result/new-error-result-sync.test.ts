import { newErrorResultSync } from '../../src/error-result/new-error-result-sync'

test('newErrorResultSync(fn)', () => {
  const [err, res] = newErrorResultSync(URL)('https://result.com')

  expect(err).toBeNull()
  expect(res!.host).toBe('result.com')
})

test('newErrorResultSync(fn) fn throws error', () => {
  const [err, res] = newErrorResultSync<TypeError, URL>(URL)('error')

  expect(err!.name).toBe('TypeError')
  expect(res).toBeNull()
})
