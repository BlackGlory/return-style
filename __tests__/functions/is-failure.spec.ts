import { describe, it, expect } from 'vitest'
import { isFailure } from '@functions/is-failure.js'
import { pass } from '@blackglory/pass'

describe('isFailure(fn: () => unknown): boolean', () => {
  describe('fn returned', () => {
    it('return false', () => {
      const fn = pass

      const result = isFailure(fn)

      expect(result).toBe(false)
    })
  })

  describe('fn throwed', () => {
    it('return true', () => {
      const fn = () => { throw new Error() }

      const result = isFailure(fn)

      expect(result).toBe(true)
    })
  })
})
