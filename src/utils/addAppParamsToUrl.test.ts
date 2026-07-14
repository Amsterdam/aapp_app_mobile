import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {isAmsterdamNlUrl, addAppParamsToUrl} from '@/utils/addAppParamsToUrl'

describe('isAmsterdamNlUrl', () => {
  it('should return true for amsterdam.nl URLs', () => {
    expect(isAmsterdamNlUrl('https://amsterdam.nl')).toBe(true)
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    expect(isAmsterdamNlUrl('http://subdomain.amsterdam.nl/path')).toBe(true)
    expect(isAmsterdamNlUrl('https://www.amsterdam.nl/?query=123')).toBe(true)
    expect(isAmsterdamNlUrl('https://a.amsterdam.nl/?query=123')).toBe(true)
    expect(isAmsterdamNlUrl('https://a-a_a.amsterdam.nl/?query=123')).toBe(true)
    expect(isAmsterdamNlUrl('https://a.a.amsterdam.nl/?query=123')).toBe(true)
  })

  it('should return false for non-amsterdam.nl URLs', () => {
    expect(isAmsterdamNlUrl('https://amsterdam.com')).toBe(false)
    expect(isAmsterdamNlUrl('http://subdomain.example.com/path')).toBe(false)
    expect(isAmsterdamNlUrl('https://www.example.com/?query=123')).toBe(false)
  })
})

describe('addAppParamsToUrl', () => {
  it('should add app parameters to Amsterdam URLs without existing query string', () => {
    const url = 'https://amsterdam.nl'
    const slug: ModuleSlug = ModuleSlug.user
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe('https://amsterdam.nl?app_from=1&app_module=user')
  })

  it('should add app parameters to Amsterdam URLs with existing query string', () => {
    const url = 'https://amsterdam.nl/path?existing_param=value'
    const slug: ModuleSlug = ModuleSlug['waste-guide']
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe(
      'https://amsterdam.nl/path?existing_param=value&app_from=1&app_module=waste-guide',
    )
  })

  it('should omit the app_module param if it has no value', () => {
    const url = 'https://amsterdam.nl'
    const result = addAppParamsToUrl(url)

    expect(result).toBe('https://amsterdam.nl?app_from=1')
  })

  it('should return original URL for non-Amsterdam URLs', () => {
    const url = 'https://example.com'
    const slug: ModuleSlug = ModuleSlug.home
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe(url)
  })

  it('should handle hash strings', () => {
    const url =
      'https://kaart.amsterdam.nl/afvalcontainers?fractie=Rest#52.3656/4.8982/52.3696/4.9022/topo/12491//'
    const slug: ModuleSlug = ModuleSlug['waste-guide']
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe(
      'https://kaart.amsterdam.nl/afvalcontainers?fractie=Rest&app_from=1&app_module=waste-guide#52.3656/4.8982/52.3696/4.9022/topo/12491//',
    )
  })
})
