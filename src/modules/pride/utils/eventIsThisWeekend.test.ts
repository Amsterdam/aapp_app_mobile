import type {PrideEvent} from '@/modules/pride/types'
import {eventIsThisWeekend} from '@/modules/pride/utils/eventIsThisWeekend'

describe('eventIsThisWeekend', () => {
  const baseEvent: PrideEvent = {
    address: {} as PrideEvent['address'],
    date_end: null,
    date_start: '2026-07-10T10:00:00.000Z',
    description: 'Pride event description',
    id: 'event-1',
    time: null,
    title: 'Pride event',
    type: 'party',
    website: 'https://example.com',
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns true when an event takes place on Friday', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    expect(eventIsThisWeekend(baseEvent)).toBe(true)
  })

  it('returns true when an event takes place on Saturday', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    const event = {
      ...baseEvent,
      date_start: '2026-07-11T10:00:00.000Z',
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('returns true when an event takes place on Sunday', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    const event = {
      ...baseEvent,
      date_start: '2026-07-12T10:00:00.000Z',
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('returns true when a multi-day event overlaps with the weekend', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    const event = {
      ...baseEvent,
      date_start: '2026-07-09T10:00:00.000Z',
      date_end: '2026-07-11T22:00:00.000Z',
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })
  it('returns true when a multi-day event overlaps completely with the weekend', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    const event = {
      ...baseEvent,
      date_start: '2026-07-08T10:00:00.000Z',
      date_end: '2026-07-18T22:00:00.000Z',
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('returns false when an event does not take place during this weekend', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z')) // Monday

    const event = {
      ...baseEvent,
      date_start: '2026-07-13T10:00:00.000Z', // Next Monday
    }

    expect(eventIsThisWeekend(event)).toBe(false)
  })

  it('returns true on Sunday for an event that is on that same Sunday', () => {
    jest.setSystemTime(new Date('2026-07-12T12:00:00.000Z')) // Sunday

    const event = {
      ...baseEvent,
      date_start: '2026-07-12T10:00:00.000Z',
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('returns false when event.date_start is null', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    const event = {
      ...baseEvent,
      date_start: null,
    } as unknown as PrideEvent

    expect(eventIsThisWeekend(event)).toBe(false)
  })

  it('returns false when event.date_start is undefined', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    const event = {
      ...baseEvent,
      date_start: undefined,
    } as unknown as PrideEvent

    expect(eventIsThisWeekend(event)).toBe(false)
  })

  it('returns true when event.date_end is null and event.date_start is in this weekend', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    const event = {
      ...baseEvent,
      date_end: null,
    }

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('returns true when event.date_end is undefined and event.date_start is in this weekend', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    const event = {
      ...baseEvent,
      date_end: undefined,
    } as unknown as PrideEvent

    expect(eventIsThisWeekend(event)).toBe(true)
  })

  it('throws when event is null', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    expect(() => eventIsThisWeekend(null as unknown as PrideEvent)).toThrow()
  })

  it('throws when event is undefined', () => {
    jest.setSystemTime(new Date('2026-07-06T12:00:00.000Z'))

    expect(() =>
      eventIsThisWeekend(undefined as unknown as PrideEvent),
    ).toThrow()
  })
})
