import type {LiveblogItem} from '@/modules/news/types'
import {getLiveblogLastEntriesPerDay} from '@/modules/news/utils/getLiveblogLastEntriesPerDay'

const createLiveblogItem = (
  id: number,
  creationDatetime: string,
): LiveblogItem => ({
  body: `Body ${id}`,
  creation_datetime: creationDatetime,
  id,
  images: [],
  message_order: id,
  title: `Title ${id}`,
})

describe('getLiveblogLastEntriesPerDay', () => {
  it('returns an empty set when items is undefined', () => {
    expect(getLiveblogLastEntriesPerDay()).toEqual(new Set())
  })

  it('throws when items is null', () => {
    expect(() =>
      getLiveblogLastEntriesPerDay(null as unknown as LiveblogItem[]),
    ).toThrow()
  })

  it('returns an empty set for an empty array', () => {
    expect(getLiveblogLastEntriesPerDay([])).toEqual(new Set())
  })

  it('returns the single item when one entry is provided', () => {
    const liveblogItem = createLiveblogItem(1, '2026-06-09T12:00:00.000Z')

    expect(Array.from(getLiveblogLastEntriesPerDay([liveblogItem]))).toEqual([
      liveblogItem,
    ])
  })

  it('returns the latest entry for each day', () => {
    const morningEntry = createLiveblogItem(1, '2026-06-09T08:00:00.000Z')
    const eveningEntry = createLiveblogItem(2, '2026-06-09T20:00:00.000Z')
    const nextDayEntry = createLiveblogItem(3, '2026-06-10T09:30:00.000Z')
    const nextDayLaterEntry = createLiveblogItem(4, '2026-06-10T22:15:00.000Z')

    expect(
      Array.from(
        getLiveblogLastEntriesPerDay([
          morningEntry,
          eveningEntry,
          nextDayEntry,
          nextDayLaterEntry,
        ]),
      ),
    ).toEqual([eveningEntry, nextDayLaterEntry])
  })

  it('keeps the latest entry even when the input order is descending', () => {
    const latestEntry = createLiveblogItem(1, '2026-06-09T20:00:00.000Z')
    const earliestEntry = createLiveblogItem(2, '2026-06-09T08:00:00.000Z')

    expect(
      Array.from(getLiveblogLastEntriesPerDay([latestEntry, earliestEntry])),
    ).toEqual([latestEntry])
  })

  it('keeps the last seen entry when two entries share the same timestamp', () => {
    const firstEntry = createLiveblogItem(1, '2026-06-09T12:00:00.000Z')
    const secondEntry = createLiveblogItem(2, '2026-06-09T12:00:00.000Z')

    expect(
      Array.from(getLiveblogLastEntriesPerDay([firstEntry, secondEntry])),
    ).toEqual([secondEntry])
  })
})
