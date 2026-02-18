import { describe, test, it, expect, vi } from 'vitest'
import { getError } from '@functions/get-error.js'
import { Result } from '@classes/result.js'
import { Option } from '@classes/option.js'

describe('Result', () => {
  describe('Ok', () => {
    it('return Ok', () => {
      const value = 'value'

      const result = Result.Ok(value)

      expect(result).toBeInstanceOf(Result)
      expect(result.isOk()).toBe(true)
    })
  })

  describe('Err', () => {
    it('return Err', () => {
      const error = new Error('error')

      const result = Result.Err(error)

      expect(result).toBeInstanceOf(Result)
      expect(result.isErr()).toBe(true)
    })
  })

  describe('isOk', () => {
    describe('Ok', () => {
      it('returns true', () => {
        const value = 'value'
        const res = Result.Ok(value)

        const result = res.isOk()

        expect(result).toBe(true)
      })
    })

    describe('Err', () => {
      it('returns false', () => {
        const error = new Error('error')
        const res = Result.Err(error)

        const result = res.isOk()

        expect(result).toBe(false)
      })
    })
  })

  describe('isErr', () => {
    describe('Ok', () => {
      it('returns false', () => {
        const value = 'value'
        const res = Result.Ok(value)

        const result = res.isErr()

        expect(result).toBe(false)
      })
    })

    describe('Err', () => {
      it('returns true', () => {
        const error = new Error('value')
        const res = Result.Err(error)

        const result = res.isErr()

        expect(result).toBe(true)
      })
    })
  })

  describe('map', () => {
    test('Ok', () => {
      const res = Result.Ok('value')
      const fn = vi.fn().mockReturnValue('new-value')

      const result = res.map(fn)

      expect(result).not.toBe(res)
      expect(result.isOk()).toBe(true)
      expect(result.unwrap()).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(res.unwrap()).toBe('value')
    })

    test('Err', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const fn = vi.fn().mockReturnValue('new-value')

      const result = res.map(fn)

      expect(result).not.toBe(res)
      expect(result.isErr()).toBe(true)
      expect(getError(() => result.unwrap())).toBe(error)
      expect(fn).not.toBeCalled()
    })
  })

  describe('mapErr', () => {
    test('Ok', () => {
      const res = Result.Ok('value')
      const fn = vi.fn().mockReturnValue(new Error('new-error'))

      const result = res.mapErr(fn)

      expect(result).not.toBe(res)
      expect(result.isOk()).toBe(true)
      expect(result.unwrap()).toBe('value')
      expect(fn).not.toBeCalled()
      expect(res.unwrap()).toBe('value')
    })

    test('Err', () => {
      const error = new Error('error')
      const newError = new Error('new-error')
      const res = Result.Err(error)
      const fn = vi.fn().mockReturnValue(newError)

      const result = res.mapErr(fn)

      expect(result).not.toBe(res)
      expect(result.isErr()).toBe(true)
      expect(getError(() => result.unwrap())).toBe(newError)
      expect(fn).toBeCalled()
    })
  })

  describe('mapOr', () => {
    test('Ok', () => {
      const res = Result.Ok('value')
      const fn = vi.fn().mockReturnValue('new-value')

      const result = res.mapOr('default-value', fn)

      expect(result).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(res.unwrap()).toBe('value')
    })

    test('Err', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const fn = vi.fn().mockReturnValue('new-value')

      const result = res.mapOr('default-value', fn)

      expect(result).toBe('default-value')
      expect(fn).not.toBeCalled()
    })
  })

  describe('mapOrElse', () => {
    test('Ok', () => {
      const res = Result.Ok('value')
      const fn = vi.fn().mockReturnValue('new-value')
      const createDefaultValue = vi.fn().mockReturnValue('default-value')

      const result = res.mapOrElse(createDefaultValue, fn)

      expect(result).toBe('new-value')
      expect(fn).toBeCalled()
      expect(fn).toBeCalledWith('value')
      expect(res.unwrap()).toBe('value')
    })

    test('Err', () => {
      const error = new Error('error')
      const res = Result.Err(error)
      const fn = vi.fn().mockReturnValue('new-value')
      const createDefaultValue = vi.fn().mockReturnValue('default-value')

      const result = res.mapOrElse(createDefaultValue, fn)

      expect(result).toBe('default-value')
      expect(fn).not.toBeCalled()
    })
  })

  describe('unwrap', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const result = res.unwrap()

      expect(result).toBe('value')
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)

      const err = getError(() => res.unwrap())

      expect(err).toBe(error)
    })
  })

  describe('unwrapOr', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const result = res.unwrapOr('default-value')

      expect(result).toBe('value')
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)

      const result = res.unwrapOr('default-value')

      expect(result).toBe('default-value')
    })
  })

  describe('unwrapOrElse', () => {
    test('Ok', () => {
      const res = Result.Ok('value')
      const createDefaultValue = vi.fn().mockReturnValue('default-value')

      const result = res.unwrapOrElse(createDefaultValue)

      expect(result).toBe('value')
      expect(createDefaultValue).not.toBeCalled()
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)
      const createDefaultValue = vi.fn().mockReturnValue('default-value')

      const result = res.unwrapOrElse(createDefaultValue)

      expect(result).toBe('default-value')
      expect(createDefaultValue).toBeCalled()
    })
  })

  describe('unwrapErr', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const err = getError(() => res.unwrapErr())

      expect(err).toBeInstanceOf(Error)
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)

      const err = res.unwrapErr()

      expect(err).toBe(error)
    })
  })

  describe('expect', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const result = res.expect('message')

      expect(result).toBe('value')
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)

      const err = getError(() => res.expect('message'))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toMatch(/message/)
      expect(err?.cause).toBe(error)
    })
  })

  describe('expectErr', () => {
    test('Ok', () => {
      const result = 'value'
      const res = Result.Ok(result)

      const err = getError(() => res.expectErr('message'))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toMatch(/message/)
      expect(err?.cause).toBe(result)
    })

    test('Err', () => {
      const error = new Error('err')
      const res = Result.Err(error)

      const result = res.expectErr('message')

      expect(result).toBe(error)
    })
  })

  describe('ok', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const result = res.ok()

      expect(result).toBeInstanceOf(Option)
      expect(result.isSome()).toBe(true)
      expect(result.unwrap()).toBe('value')
    })

    test('Err', () => {
      const error = new Error('error')
      const res = Result.Err(error)

      const result = res.ok()

      expect(result).toBeInstanceOf(Option)
      expect(result.isNone()).toBe(true)
    })
  })

  describe('err', () => {
    test('Ok', () => {
      const res = Result.Ok('value')

      const result = res.err()

      expect(result).toBeInstanceOf(Option)
      expect(result.isNone()).toBe(true)
    })

    test('Err', () => {
      const error = new Error('error')
      const res = Result.Err(error)

      const result = res.err()

      expect(result).toBeInstanceOf(Option)
      expect(result.isSome()).toBe(true)
      expect(result.unwrap()).toBe(error)
    })
  })
})
