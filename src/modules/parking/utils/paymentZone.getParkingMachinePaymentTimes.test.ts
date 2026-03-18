import {PaymentZone} from '@/modules/parking/types'
import {getParkingMachinePaymentTimes} from '@/modules/parking/utils/paymentZone'

describe('getParkingMachinePaymentTimes', () => {
  it('returns empty array if no zone provided', () => {
    expect(getParkingMachinePaymentTimes(undefined)).toEqual([])
  })

  it('groups weekdays that share the same payment time span', () => {
    const zone: PaymentZone = {
      id: 'zone1',
      city: 'TestCity',
      description: 'Test zone',
      days: [
        {day_of_week: 'maandag', start_time: '08:00', end_time: '18:00'},
        {day_of_week: 'dinsdag', start_time: '08:00', end_time: '18:00'},
        {day_of_week: 'woensdag', start_time: '08:00', end_time: '18:00'},
        {day_of_week: 'donderdag', start_time: '08:00', end_time: '18:00'},
        {day_of_week: 'vrijdag', start_time: '08:00', end_time: '18:00'},
        {day_of_week: 'zaterdag', start_time: '10:00', end_time: '16:00'},
        {day_of_week: 'zondag', start_time: '10:00', end_time: '16:00'},
      ],
    }

    expect(getParkingMachinePaymentTimes(zone)).toEqual({
      'maandag tot en met vrijdag': '08.00 tot 18.00 uur',
      'zaterdag en zondag': '10.00 tot 16.00 uur',
    })
  })

  it('formats non-consecutive day groups correctly', () => {
    const zone: PaymentZone = {
      id: 'zone2',
      city: 'TestCity',
      description: 'Test zone',
      days: [
        {day_of_week: 'vrijdag', start_time: '09:00', end_time: '17:00'},
        {day_of_week: 'maandag', start_time: '09:00', end_time: '17:00'},
        {day_of_week: 'woensdag', start_time: '09:00', end_time: '17:00'},
        {day_of_week: 'dinsdag', start_time: '08:00', end_time: '18:00'},
      ],
    }

    expect(getParkingMachinePaymentTimes(zone)).toEqual({
      'maandag, woensdag en vrijdag': '09.00 tot 17.00 uur',
      dinsdag: '08.00 tot 18.00 uur',
      'zondag, donderdag en zaterdag': '',
    })
  })

  it('formats vrijpark correctly', () => {
    const zone: PaymentZone = {
      id: 'zone2',
      city: 'TestCity',
      description: 'Test zone',
      days: [
        {day_of_week: 'vrijdag', start_time: '09:00', end_time: '17:00'},
        {day_of_week: 'vrijpark', start_time: '00:00', end_time: '24:00'},
        {day_of_week: 'woensdag', start_time: '09:00', end_time: '17:00'},
        {day_of_week: 'dinsdag', start_time: '08:00', end_time: '18:00'},
      ],
    }

    expect(getParkingMachinePaymentTimes(zone)).toEqual({
      'woensdag en vrijdag': '09.00 tot 17.00 uur',
      dinsdag: '08.00 tot 18.00 uur',
      'zondag, maandag, donderdag en zaterdag': '',
    })
  })
})
