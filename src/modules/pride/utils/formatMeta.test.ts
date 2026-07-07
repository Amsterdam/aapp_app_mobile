import type {PrideEvent} from '@/modules/pride/types'
import {formatMeta} from '@/modules/pride/utils/formatMeta'

describe('formatMeta', () => {
  const baseEvent: PrideEvent = {
    address: {} as PrideEvent['address'],
    date_end: null,
    date_start: '2026-08-01',
    description: 'Pride event description',
    id: 'event-1',
    time: '12:00 - 13:00',
    title: 'Pride event',
    type: 'party',
    website: 'https://example.com',
  }

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns date and time for a valid single-day event', () => {
    expect(formatMeta(baseEvent)).toBe('1 augustus 2026, 12:00 - 13:00')
  })

  it('returns a date range and time when date_end differs from date_start', () => {
    const event = {
      ...baseEvent,
      date_end: '2026-08-02',
    }

    expect(formatMeta(event)).toBe(
      '1 augustus 2026 - 2 augustus 2026, 12:00 - 13:00',
    )
  })

  it('does not append date_end when it equals date_start', () => {
    const event = {
      ...baseEvent,
      date_end: baseEvent.date_start,
    }

    expect(formatMeta(event)).toBe('1 augustus 2026, 12:00 - 13:00')
  })

  it('returns only the date when time is null', () => {
    const event = {
      ...baseEvent,
      time: null,
    }

    expect(formatMeta(event)).toBe('1 augustus 2026')
  })

  it('returns only the date when time is undefined', () => {
    const event = {
      ...baseEvent,
      time: undefined,
    } as unknown as PrideEvent

    expect(formatMeta(event)).toBe('1 augustus 2026')
  })

  it('returns date and time when date_end is null', () => {
    const event = {
      ...baseEvent,
      date_end: null,
    }

    expect(formatMeta(event)).toBe('1 augustus 2026, 12:00 - 13:00')
  })

  it('returns date and time when date_end is undefined', () => {
    const event = {
      ...baseEvent,
      date_end: undefined,
    } as unknown as PrideEvent

    expect(formatMeta(event)).toBe('1 augustus 2026, 12:00 - 13:00')
  })

  it('returns only time when date_start is null', () => {
    const event = {
      ...baseEvent,
      date_start: null,
    } as unknown as PrideEvent

    expect(formatMeta(event)).toBe('12:00 - 13:00')
  })

  it('returns only time when date_start is undefined', () => {
    const event = {
      ...baseEvent,
      date_start: undefined,
    } as unknown as PrideEvent

    expect(formatMeta(event)).toBe('12:00 - 13:00')
  })

  it('returns undefined when date_start and time are both nullish', () => {
    const event = {
      ...baseEvent,
      date_end: undefined,
      date_start: null,
      time: null,
    } as unknown as PrideEvent

    expect(formatMeta(event)).toBeUndefined()
  })
})
