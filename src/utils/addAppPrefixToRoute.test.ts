import {addAppPrefixToRoute} from '@/utils/addAppPrefixToRoute'

const appPrefix = 'app://'

jest.mock('@/app/navigation/constants', () => ({appPrefix}))

describe('addAppPrefixToRoute', () => {
  it('returns route unchanged if it already starts with appPrefix', () => {
    expect(addAppPrefixToRoute('app://start')).toBe('app://start')
  })

  it('adds appPrefix and slash if route does not start with slash', () => {
    expect(addAppPrefixToRoute('home')).toBe('app://home')
  })

  it('adds appPrefix if route starts with slash but not appPrefix', () => {
    expect(addAppPrefixToRoute('/home')).toBe('app://home')
  })

  it('handles empty route', () => {
    expect(addAppPrefixToRoute('')).toBe('app://')
  })

  it('handles route with only slash', () => {
    expect(addAppPrefixToRoute('/')).toBe('app://')
  })

  it('returns null if route is not a string', () => {
    expect(addAppPrefixToRoute(undefined)).toBeNull()
    expect(addAppPrefixToRoute(null)).toBeNull()
    // @ts-expect-error Testing non-string input
    expect(addAppPrefixToRoute(42)).toBeNull()
    // @ts-expect-error Testing non-string input
    expect(addAppPrefixToRoute({})).toBeNull()
  })
})
