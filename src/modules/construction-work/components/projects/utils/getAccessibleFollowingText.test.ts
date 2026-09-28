import {getAccessibleFollowingText} from '@/modules/construction-work/components/projects/utils/getAccessibleFollowingText'

describe('getAccessibleFollowingText', () => {
  it('handles a followed project with zero recent articles', () => {
    expect(getAccessibleFollowingText(true, 0)).toBe('Volgend')
  })
  it('handles a followed project with one recent article', () => {
    expect(getAccessibleFollowingText(true, 1)).toBe('1 Bericht')
  })
  it('handles a followed project with multiple recent articles', () => {
    expect(getAccessibleFollowingText(true, 2)).toBe('2 Berichten')
  })
  it('handles a non-followed project with zero recent articles', () => {
    expect(getAccessibleFollowingText(false, 0)).toBeUndefined()
  })
  it('handles a non-followed project with one recent article (which should not occur)', () => {
    expect(getAccessibleFollowingText(false, 1)).toBeUndefined()
  })
  it('handles a non-followed project with multiple recent articles (which should not occur)', () => {
    expect(getAccessibleFollowingText(false, 2)).toBeUndefined()
  })
})
