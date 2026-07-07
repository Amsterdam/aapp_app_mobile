import type {PrideEvent} from '@/modules/pride/types'
import {eventIsOnDay} from '@/modules/pride/utils/eventIsOnDay'
import {dayjs} from '@/utils/datetime/dayjs'

describe('eventIsOnDay', () => {
  const baseEvent: PrideEvent = {
    address: {} as PrideEvent['address'],
    date_end: null,
    date_start: '2026-08-01T10:00:00.000Z',
    description: 'Pride event description',
    id: 'event-1',
    time: null,
    title: 'Pride event',
    type: 'party',
    website: 'https://example.com',
  }

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns true when the day falls on a single-day event with a null end date', () => {
    expect(eventIsOnDay(dayjs('2026-08-01T12:00:00.000Z'), baseEvent)).toBe(
      true,
    )
  })

  it('returns true when the day falls within a multi-day event range', () => {
    const event = {
      ...baseEvent,
      date_end: '2026-08-03T18:00:00.000Z',
    }

    expect(eventIsOnDay(dayjs('2026-08-02T12:00:00.000Z'), event)).toBe(true)
  })

  it('returns false when the day is before the event starts', () => {
    expect(eventIsOnDay(dayjs('2026-07-31T12:00:00.000Z'), baseEvent)).toBe(
      false,
    )
  })

  it('returns false when the day is after the event ends', () => {
    const event = {
      ...baseEvent,
      date_end: '2026-08-03T18:00:00.000Z',
    }

    expect(eventIsOnDay(dayjs('2026-08-04T12:00:00.000Z'), event)).toBe(false)
  })

  it('returns false when the day is exactly at the start-of-day boundary', () => {
    expect(eventIsOnDay(dayjs('2026-08-01T00:00:00.000Z'), baseEvent)).toBe(
      false,
    )
  })

  it('returns false when day is null', () => {
    expect(eventIsOnDay(null as unknown as never, baseEvent)).toBe(false)
  })

  it('uses the current date when day is undefined', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-08-01T12:00:00.000Z'))

    expect(eventIsOnDay(undefined as unknown as never, baseEvent)).toBe(true)
  })

  it('returns false when event.date_start is null', () => {
    const event = {
      ...baseEvent,
      date_start: null,
    } as unknown as PrideEvent

    expect(eventIsOnDay(dayjs('2026-08-01T12:00:00.000Z'), event)).toBe(false)
  })

  it('returns false when event.date_start is undefined', () => {
    const event = {
      ...baseEvent,
      date_start: undefined,
    } as unknown as PrideEvent

    expect(eventIsOnDay(dayjs('2026-08-01T12:00:00.000Z'), event)).toBe(false)
  })

  it('falls back to event.date_start when event.date_end is undefined', () => {
    const event = {
      ...baseEvent,
      date_end: undefined,
    } as unknown as PrideEvent

    expect(eventIsOnDay(dayjs('2026-08-01T12:00:00.000Z'), event)).toBe(true)
  })

  it('throws when event is null', () => {
    expect(() =>
      eventIsOnDay(
        dayjs('2026-08-01T12:00:00.000Z'),
        null as unknown as PrideEvent,
      ),
    ).toThrow()
  })

  it('throws when event is undefined', () => {
    expect(() =>
      eventIsOnDay(
        dayjs('2026-08-01T12:00:00.000Z'),
        undefined as unknown as PrideEvent,
      ),
    ).toThrow()
  })
})
