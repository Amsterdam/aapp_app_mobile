import type {RouteProp} from '@/app/navigation/types'
import {buildMetadata} from '@/modules/survey/utils/buildMetadata'

describe('buildMetadata', () => {
  it('returns route name only if no params', () => {
    const route = {name: 'SurveyScreen', params: undefined} as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen')
  })

  it('returns route name with one param', () => {
    const route = {
      name: 'SurveyScreen',
      params: {foo: 'bar'},
    } as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen/?foo=bar')
  })

  it('encodes param values', () => {
    const route = {
      name: 'SurveyScreen',
      params: {foo: 'bar baz'},
    } as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen/?foo=bar%20baz')
  })

  it('handles multiple params', () => {
    const route = {
      name: 'SurveyScreen',
      params: {a: '1', b: '2'},
    } as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen/?a=1&b=2')
  })

  it('handles array params', () => {
    const route = {
      name: 'SurveyScreen',
      params: {foo: ['a', 'b']},
    } as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen/?foo.0=a&foo.1=b')
  })

  it('handles mixed params', () => {
    const route = {
      name: 'SurveyScreen',
      params: {foo: ['a', 'b'], bar: 'c'},
    } as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen/?foo.0=a&foo.1=b&bar=c')
  })

  it('returns route name if params is empty object', () => {
    const route = {name: 'SurveyScreen', params: {}} as RouteProp<string>

    expect(buildMetadata(route)).toBe('SurveyScreen')
  })
})
