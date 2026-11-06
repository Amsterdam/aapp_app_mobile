import {getSectionsSortedByDate} from '@/utils/sort/getSectionsSortedByDate'

describe('getSectionsSortedByDate', () => {
  const sortableItems = [
    {id: 'later', start_date_time: '2000-01-02T10:00:00'},
    {id: 'earlier-later', start_date_time: '2000-01-01T12:00:00'},
    {id: 'earlier-first', start_date_time: '2000-01-01T08:00:00'},
  ]

  it('returns an empty array when sortableItems is undefined', () => {
    expect(getSectionsSortedByDate(undefined, true)).toEqual([])
  })

  it('returns an empty array when sortableItems is null', () => {
    expect(
      getSectionsSortedByDate(null as unknown as typeof sortableItems, true),
    ).toEqual([])
  })

  it('groups items by date in ascending order', () => {
    const sections = getSectionsSortedByDate(sortableItems, true)

    expect(sections).toEqual([
      {
        title: '1 januari 2000',
        data: [sortableItems[2], sortableItems[1]],
      },
      {
        title: '2 januari 2000',
        data: [sortableItems[0]],
      },
    ])
  })

  it('groups items by date in descending order', () => {
    const sections = getSectionsSortedByDate(sortableItems, false)

    expect(sections).toEqual([
      {
        title: '2 januari 2000',
        data: [sortableItems[0]],
      },
      {
        title: '1 januari 2000',
        data: [sortableItems[1], sortableItems[2]],
      },
    ])
  })

  it.each([
    {sortAscending: undefined as unknown as boolean},
    {sortAscending: null as unknown as boolean},
  ])(
    'sorts descending when sortAscending is $sortAscending',
    ({sortAscending}) => {
      const sections = getSectionsSortedByDate(sortableItems, sortAscending)

      expect(sections.map(section => section.title)).toEqual([
        '2 januari 2000',
        '1 januari 2000',
      ])
    },
  )

  it('groups dummy items in the dummy section', () => {
    const dummyItems = [
      {id: 'later', start_date_time: '2000-01-02T10:00:00'},
      {id: 'earlier', start_date_time: '2000-01-01T08:00:00'},
      {id: 'dummy-first', start_date_time: '', dummy: true},
      {id: 'dummy-second', start_date_time: '', dummy: true},
    ]

    const sections = getSectionsSortedByDate(dummyItems, true)

    expect(sections).toEqual([
      {
        title: '1 januari 2000',
        data: [dummyItems[1]],
      },
      {
        title: '2 januari 2000',
        data: [dummyItems[0]],
      },
      {
        title: 'dummy',
        data: [dummyItems[2], dummyItems[3]],
      },
    ])
  })
})
