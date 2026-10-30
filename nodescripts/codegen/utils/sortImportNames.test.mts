import type {ImportConfig} from '../types.mts'
import {sortImportNames} from './sortImportNames.mts'

describe('sortImportNames', () => {
  const wrap = (name: string): ImportConfig => ({import: name})

  it('returns 0 when names are equal', () => {
    expect(sortImportNames(wrap('foo'), wrap('foo'))).toBe(0)
  })

  it('sorts default import first', () => {
    expect(sortImportNames(wrap('default'), wrap('bar'))).toBe(-1)
    expect(sortImportNames(wrap('bar'), wrap('default'))).toBe(1)
  })

  it('sorts namespace import after default but before others', () => {
    expect(sortImportNames(wrap('namespace'), wrap('bar'))).toBe(-1)
    expect(sortImportNames(wrap('bar'), wrap('namespace'))).toBe(1)
    expect(sortImportNames(wrap('default'), wrap('namespace'))).toBe(-1)
    expect(sortImportNames(wrap('namespace'), wrap('default'))).toBe(1)
  })

  it('sorts alphabetically otherwise', () => {
    expect(sortImportNames(wrap('a'), wrap('b'))).toBeLessThan(0)
    expect(sortImportNames(wrap('b'), wrap('a'))).toBeGreaterThan(0)
  })
})
