import {CityOffice} from '@/modules/contact/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {getUpcomingExceptionDescriptions} from '@/utils/openingTimes/getUpcomingExceptionDescriptions'

describe('getUpcomingExceptionDescriptions', () => {
  const today = dayjs().startOf('day')
  const in3Days = today.add(3, 'day').format('YYYY-MM-DD')
  const in8Days = today.add(8, 'day').format('YYYY-MM-DD')

  const exceptions: CityOffice['visitingHours']['exceptions'] = [
    {
      date: today.add(1, 'day').format('YYYY-MM-DD'),
      description: 'Morgen gesloten',
    },
    {date: in3Days, description: 'Overmorgen open tot 12:00'},
    {date: in8Days, description: 'Volgende week gesloten'},
    {
      date: today.subtract(1, 'day').format('YYYY-MM-DD'),
      description: 'Gisteren open',
    },
    {date: today.add(2, 'day').format('YYYY-MM-DD'), description: ''},
  ]

  it('returns only descriptions for the next 7 days, sorted by date', () => {
    const result = getUpcomingExceptionDescriptions(exceptions)

    expect(result).toEqual(['Morgen gesloten', '', 'Overmorgen open tot 12:00'])
  })

  it('returns an empty array if no exceptions in next 7 days', () => {
    const result = getUpcomingExceptionDescriptions([
      {date: in8Days, description: 'Volgende week gesloten'},
    ])

    expect(result).toEqual([])
  })

  it('returns an empty array if input is empty array', () => {
    expect(getUpcomingExceptionDescriptions([])).toEqual([])
  })
})
