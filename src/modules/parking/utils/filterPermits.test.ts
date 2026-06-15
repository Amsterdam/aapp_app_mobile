import type {ParkingPermit} from '@/modules/parking/types'
import {filterPermits} from '@/modules/parking/utils/filterPermits'

describe('filterPermits', () => {
  const basePermit = {
    discount: 0,
    forced_license_plate_list: false,
    max_session_length_in_days: 1,
    money_balance_applicable: false,
    no_endtime: false,
    parking_machine_favorite: undefined,
    parking_rate: {currency: 'EUR', value: 0},
    parking_rate_original: {currency: 'EUR', value: 0},
    payment_zones: [],
    permit_name: '',
    permit_type: 'GA-parkeervergunning voor bewoners (passagiers)',
    permit_zone: {name: '', permit_zone_id: '', show_permit_zone_url: false},
    report_code: '',
    time_balance: 0,
    time_balance_applicable: false,
    time_valid_until: '',
    visitor_account_allowed: false,
    cancelled_at: null,
    ended_at: null,
    started_at: '2025-12-31T23:59:59+02:00',
  } as ParkingPermit

  it('filters permits with known keywords', () => {
    const permits: ParkingPermit[] = [
      {
        ...basePermit,
        permit_name: 'GA-parkeervergunning voor bewoners (passagiers)',
      },
      {...basePermit, permit_name: 'mantelzorgvergunning'},
      {...basePermit, permit_name: 'Bezoekersparkeervergunning'},
      {...basePermit, permit_name: 'Kraskaartparkeervergunning'},
      {...basePermit, permit_name: 'Bedrijfsvergunning'},
      {...basePermit, permit_name: 'met wisselend kenteken'},
      {...basePermit, permit_name: 'Onbekende vergunning'},
      {
        ...basePermit,
        permit_name: 'GA-parkeervergunning voor bewoners (bestuurders)',
      },
    ]
    const filtered = filterPermits(permits)

    expect(filtered).toHaveLength(6)
    expect(filtered.map(p => p.permit_name)).not.toContain(
      'Onbekende vergunning',
    )
    expect(filtered.map(p => p.permit_name)).not.toContain(
      'GA-parkeervergunning voor bewoners (bestuurders)',
    )
  })

  it('returns empty array if no permits match', () => {
    const permits: ParkingPermit[] = [
      {...basePermit, permit_name: 'Onbekende vergunning'},
      {...basePermit, permit_name: 'Nog een onbekende'},
    ]
    const filtered = filterPermits(permits)

    expect(filtered).toHaveLength(0)
  })

  it('is case-insensitive', () => {
    const permits: ParkingPermit[] = [
      {
        ...basePermit,
        permit_name: 'GA-PARKEERVERGUNNING voor bewoners (passagiers)',
      },
      {...basePermit, permit_name: 'Mantelzorgvergunning'},
    ]
    const filtered = filterPermits(permits)

    expect(filtered).toHaveLength(2)
  })

  it('returns empty array for empty input', () => {
    expect(filterPermits([])).toEqual([])
  })
})
