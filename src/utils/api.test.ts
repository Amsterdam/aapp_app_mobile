import {isApiAuthorizationError, generateRequestUrl} from '@/utils/api'

describe('isApiAuthorizationError', () => {
  it.each([[401], [403], [404]])(
    'returns true for errors with status %s',
    status => {
      const error = {status, data: null}

      expect(isApiAuthorizationError(error)).toBe(true)
    },
  )

  it('returns false for errors with status outside of 401, 403, and 404', () => {
    const error = {status: 500, data: null}

    expect(isApiAuthorizationError(error)).toBe(false)
  })

  it('returns false for errors without a status property', () => {
    const error = {message: 'An error occurred'}

    expect(isApiAuthorizationError(error)).toBe(false)
  })
})

describe('generateRequestUrl', () => {
  it('should generate the correct URL with array and scalar parameters', () => {
    const result = generateRequestUrl({
      params: {
        arrayParam: ['value1', 'value2'],
        scalarParam: 'value',
      },
      path: '/test-path',
    })

    expect(result).toEqual(
      '/test-path?arrayParam=value1&arrayParam=value2&scalarParam=value',
    )
  })

  it('should generate the correct URL with only array parameters', () => {
    const result = generateRequestUrl({
      params: {
        arrayParam: ['value1', 'value2'],
      },
      path: '/test-path',
    })

    expect(result).toEqual('/test-path?arrayParam=value1&arrayParam=value2')
  })

  it('should generate the correct URL with only scalar parameters', () => {
    const result = generateRequestUrl({
      params: {
        scalarParam: 'value',
      },
      path: '/test-path',
    })

    expect(result).toEqual('/test-path?scalarParam=value')
  })

  it('should generate the correct URL with no parameters', () => {
    const result = generateRequestUrl({
      params: {},
      path: '/test-path',
    })

    expect(result).toEqual('/test-path')
  })

  it('should generate empty string if path is undefined and no params are provided', () => {
    const result = generateRequestUrl({
      params: {},
    })

    expect(result).toEqual('')
  })
})
