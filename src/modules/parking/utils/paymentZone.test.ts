import {PaymentZone, PaymentZoneDay} from '@/modules/parking/types'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
  areAllPaymentZonesEqualOnDayOfWeek,
  areAllPaymentZonesEqual,
} from '@/modules/parking/utils/paymentZone'

describe('paymentZone utils', () => {
  const paymentZoneDay: PaymentZoneDay = {
    day_of_week: 'maandag',
    start_time: '08:00',
    end_time: '18:00',
  }
  const paymentZone: PaymentZone = {
    id: 'zone1',
    days: [paymentZoneDay],
    city: 'TestCity',
    description: 'Test zone',
  }
  const paymentZone2: PaymentZone = {
    id: 'zone2',
    days: [{...paymentZoneDay, day_of_week: 'dinsdag'}],
    city: 'TestCity',
    description: 'Test zone 2',
  }

  it('getPaymentZoneDay returns the correct day', () => {
    expect(getPaymentZoneDay(paymentZone, 1)).toEqual(paymentZoneDay)
    expect(getPaymentZoneDay(paymentZone2, 2)).toEqual({
      ...paymentZoneDay,
      day_of_week: 'dinsdag',
    })
    expect(getPaymentZoneDay(paymentZone, 2)).toBeUndefined()
  })

  it('getPaymentZoneDayTimeSpan returns formatted time span', () => {
    expect(getPaymentZoneDayTimeSpan(paymentZoneDay)).toBe('08.00 - 18.00 uur')
    expect(getPaymentZoneDayTimeSpan(undefined)).toBeUndefined()
  })

  it('areAllPaymentZonesEqualOnDayOfWeek returns true if all equal', () => {
    const zones = [
      {
        id: '1',
        days: [
          {day_of_week: 'maandag', start_time: '08:00', end_time: '18:00'},
        ],
        city: 'TestCity',
        description: 'desc',
      },
      {
        id: '2',
        days: [
          {day_of_week: 'maandag', start_time: '08:00', end_time: '18:00'},
        ],
        city: 'TestCity',
        description: 'desc',
      },
    ]

    expect(areAllPaymentZonesEqualOnDayOfWeek(zones, 1)).toBe(true)
  })

  it('areAllPaymentZonesEqualOnDayOfWeek returns false if not all equal', () => {
    const zones = [
      {
        id: '1',
        days: [
          {day_of_week: 'maandag', start_time: '08:00', end_time: '18:00'},
        ],
        city: 'TestCity',
        description: 'desc',
      },
      {
        id: '2',
        days: [
          {day_of_week: 'maandag', start_time: '09:00', end_time: '18:00'},
        ],
        city: 'TestCity',
        description: 'desc',
      },
    ]

    expect(areAllPaymentZonesEqualOnDayOfWeek(zones, 1)).toBe(false)
  })

  it('areAllPaymentZonesEqual returns true if all days are equal', () => {
    const allDays = [
      'zondag',
      'maandag',
      'dinsdag',
      'woensdag',
      'donderdag',
      'vrijdag',
      'zaterdag',
    ]
    const days = allDays.map(day => ({
      day_of_week: day,
      start_time: '08:00',
      end_time: '18:00',
    }))
    const zones = [
      {
        id: '1',
        days,
        city: 'TestCity',
        description: 'desc',
      },
      {
        id: '2',
        days: days.map(d => ({...d})),
        city: 'TestCity',
        description: 'desc',
      },
    ]

    expect(areAllPaymentZonesEqual(zones)).toBe(true)
  })

  it('areAllPaymentZonesEqual returns false if any day is not equal', () => {
    const allDays2 = [
      'zondag',
      'maandag',
      'dinsdag',
      'woensdag',
      'donderdag',
      'vrijdag',
      'zaterdag',
    ]
    const days1 = allDays2.map(day => ({
      day_of_week: day,
      start_time: '08:00',
      end_time: '18:00',
    }))
    const days2 = allDays2.map(day => ({
      day_of_week: day,
      start_time: day === 'maandag' ? '09:00' : '08:00',
      end_time: '18:00',
    }))
    const zones = [
      {
        id: '1',
        days: days1,
        city: 'TestCity',
        description: 'desc',
      },
      {
        id: '2',
        days: days2,
        city: 'TestCity',
        description: 'desc',
      },
    ]

    expect(areAllPaymentZonesEqual(zones)).toBe(false)
  })
})
