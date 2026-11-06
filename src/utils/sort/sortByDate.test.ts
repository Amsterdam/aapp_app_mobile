import {sortByDate} from '@/utils/sort/sortByDate'

describe('sortByDate', () => {
  const sortableItems = [
    {id: 'latest', start_date_time: '2000-01-02T10:00:00'},
    {id: 'earlier-later', start_date_time: '2000-01-01T12:00:00'},
    {id: 'earlier-first', start_date_time: '2000-01-01T08:00:00'},
  ]

  it('returns an empty array when sortableItems is undefined', () => {
    expect(sortByDate(undefined, true)).toEqual([])
  })

  it('returns an empty array when sortableItems is null', () => {
    expect(sortByDate(null as unknown as typeof sortableItems, true)).toEqual(
      [],
    )
  })

  it('sorts items by start date and time in ascending order without mutating the input', () => {
    const sortedItems = sortByDate(sortableItems, true)

    expect(sortedItems.map(item => item.id)).toEqual([
      'earlier-first',
      'earlier-later',
      'latest',
    ])
    expect(sortableItems.map(item => item.id)).toEqual([
      'latest',
      'earlier-later',
      'earlier-first',
    ])
  })

  it('sorts items by start date and time in descending order', () => {
    const sortedItems = sortByDate(sortableItems, false)

    expect(sortedItems.map(item => item.id)).toEqual([
      'latest',
      'earlier-later',
      'earlier-first',
    ])
  })

  it.each([
    {sortAscending: undefined as unknown as boolean},
    {sortAscending: null as unknown as boolean},
  ])(
    'sorts descending when sortAscending is $sortAscending',
    ({sortAscending}) => {
      const sortedItems = sortByDate(sortableItems, sortAscending)

      expect(sortedItems.map(item => item.id)).toEqual([
        'latest',
        'earlier-later',
        'earlier-first',
      ])
    },
  )

  it('keeps dummy items stable while sorting regular items', () => {
    const itemsWithDummies = [
      {id: 'later', start_date_time: '2000-01-02T10:00:00'},
      {id: 'earlier', start_date_time: '2000-01-01T08:00:00'},
      {id: 'dummy-first', start_date_time: '', dummy: true},
      {id: 'dummy-second', start_date_time: '', dummy: true},
    ]

    const sortedItems = sortByDate(itemsWithDummies, true)

    expect(sortedItems.map(item => item.id)).toEqual([
      'earlier',
      'later',
      'dummy-first',
      'dummy-second',
    ])
  })
})
