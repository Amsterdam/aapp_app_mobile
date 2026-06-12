import {ParkingPermit, PermitType} from '@/modules/parking/types'

export const permitMock: ParkingPermit = {
  discount: 0,
  forced_license_plate_list: false,
  max_session_length_in_days: 0,
  money_balance_applicable: true,
  no_endtime: false,
  cancelled_at: null,
  ended_at: null,
  started_at: '2025-12-31T23:59:59+01:00',
  parking_rate: {
    currency: 'EUR',
    value: 0.56,
  },
  parking_rate_original: {
    currency: 'EUR',
    value: 1.5,
  },
  payment_zones: [
    {
      city: 'Amsterdam',
      days: [
        {
          day_of_week: 'Maandag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Dinsdag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Woensdag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Donderdag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Vrijdag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Zaterdag',
          end_time: '17:00',
          start_time: '08:00',
        },
        {
          day_of_week: 'Vrijpark',
          end_time: '17:00',
          start_time: '08:00',
        },
      ],
      description: '8-17 uur',
      id: '',
    },
  ],
  permit_name: '',
  permit_type: PermitType.bezoekersvergunning,
  permit_zone: {
    name: 'Nieuw-West 9e',
    permit_zone_id: 'Nieuw-West 9e',
    show_permit_zone_url: false,
  },
  report_code: '123456789',
  time_balance: 56000000,
  time_balance_applicable: true,
  time_valid_until: '31 december 2025',
  visitor_account: {
    seconds_remaining: 0,
    pin: '',
    report_code: '',
  },
  visitor_account_allowed: true,
}
