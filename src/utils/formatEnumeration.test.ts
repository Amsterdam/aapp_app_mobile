import {formatEnumeration} from '@/utils/formatEnumeration'

describe('formatEnumeration', () => {
  it('3 items', () => {
    expect(formatEnumeration('Maandag, woensdag, vrijdag')).toEqual(
      'Maandag, woensdag en vrijdag',
    )
    expect(formatEnumeration('maandag, woensdag, vrijdag')).toEqual(
      'maandag, woensdag en vrijdag',
    )
  })
  it('2 items', () => {
    expect(formatEnumeration('Maandag, vrijdag')).toEqual('Maandag en vrijdag')
  })
  it('1 item', () => {
    expect(formatEnumeration('Maandag')).toEqual('Maandag')
  })
  it('passed null', () => {
    expect(formatEnumeration(null)).toBeNull()
  })
  it('passed empty string', () => {
    expect(formatEnumeration('')).toBeNull()
  })
  it('passed empty array', () => {
    expect(formatEnumeration([])).toBeNull()
  })
  it('passed array with 3 items', () => {
    expect(formatEnumeration(['Maandag', 'woensdag', 'vrijdag'])).toEqual(
      'Maandag, woensdag en vrijdag',
    )
    expect(formatEnumeration(['maandag', 'woensdag', 'vrijdag'])).toEqual(
      'maandag, woensdag en vrijdag',
    )
  })
  it('passed array with 2 items', () => {
    expect(formatEnumeration(['Maandag', 'vrijdag'])).toEqual(
      'Maandag en vrijdag',
    )
  })
  it('passed array with 1 item', () => {
    expect(formatEnumeration(['Maandag'])).toEqual('Maandag')
  })
})
