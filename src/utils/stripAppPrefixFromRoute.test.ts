import {stripAppPrefixFromRoute} from '@/utils/stripAppPrefixFromRoute'

const appPrefix = 'app://'

jest.mock('@/app/navigation/constants', () => ({appPrefix}))

describe('stripAppPrefixFromRoute', () => {
  it('returns undefined if route is undefined', () => {
    expect(stripAppPrefixFromRoute(undefined)).toBeUndefined()
  })

  it('returns undefined if route is not a string', () => {
    expect(stripAppPrefixFromRoute(undefined)).toBeUndefined()
    expect(stripAppPrefixFromRoute(null)).toBeUndefined()
    // @ts-expect-error Testing non-string input
    expect(stripAppPrefixFromRoute(42)).toBeUndefined()
    // @ts-expect-error Testing non-string input
    expect(stripAppPrefixFromRoute({})).toBeUndefined()
  })

  it('removes appPrefix and adds leading slash', () => {
    expect(stripAppPrefixFromRoute('app://home')).toBe('/home')
    expect(stripAppPrefixFromRoute('app://')).toBe('/')
  })

  it('adds leading slash if missing and no appPrefix', () => {
    expect(stripAppPrefixFromRoute('home')).toBe('/home')
  })

  it('returns route unchanged if already starts with slash and no appPrefix', () => {
    expect(stripAppPrefixFromRoute('/home')).toBe('/home')
  })

  it('handles empty string', () => {
    expect(stripAppPrefixFromRoute('')).toBe('/')
  })
})
