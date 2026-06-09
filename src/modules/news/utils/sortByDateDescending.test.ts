import {sortByDateDescending} from '@/modules/news/utils/sortByDateDescending'

describe('sortByDateDescending', () => {
  it('should sort an array from most recent element to last', () => {
    const date1 = '2026-06-09T12:00:00.000Z'
    const date2 = '2026-06-09T12:01:00.000Z'
    const date3 = '2026-06-09T11:59:00.000Z'
    const date4 = '2026-06-09T12:02:00.000Z'
    const date5 = '2026-06-09T11:30:00.000Z'

    const array = [
      {date: date1},
      {date: date2},
      {date: date3},
      {date: date4},
      {date: date5},
    ]

    const sorted = sortByDateDescending(array, 'date')

    expect(sorted).toEqual([
      {date: date4},
      {date: date2},
      {date: date1},
      {date: date3},
      {date: date5},
    ])
  })
})
