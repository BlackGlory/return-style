import { newResultErrorSync } from '../../src/result-error/new-result-error-sync'

test('newResultErrorSync(fn)', () => {
  const [res, err] = newResultErrorSync(URL)('https://result.com')

  expect(err).toBeNull()
  expect(res!.host).toBe('result.com')
})

test('newResultErrorSync(fn)', () => {
  const [res, err] = newResultErrorSync<TypeError, URL>(URL)('error')

  expect(err!.name).toBe('TypeError')
  expect(res).toBeNull()
})
