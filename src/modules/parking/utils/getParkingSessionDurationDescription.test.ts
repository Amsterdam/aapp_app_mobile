import {
  ParkingSessionStatus,
  type ParkingSession,
  type VisitorParkingSession,
} from '@/modules/parking/types'
import {getParkingSessionDurationDescription} from '@/modules/parking/utils/getParkingSessionDurationDescription'

const MOCK_PARKING_SESSION: ParkingSession = {
  vehicle_id: 'ABC123',
  visitor_name: 'John Doe',
  created_date_time: '2026-06-16T12:12:00+01:00',
  end_date_time: '2026-06-16T14:46:00+01:00',
  no_endtime: false,
  is_cancelled: false,
  is_paid: false,
  parking_cost: {
    currency: '',
    value: 0,
  },
  ps_right_id: 0,
  remaining_time: 0,
  report_code: '',
  start_date_time: '2026-06-16T12:12:00+01:00',
  status: ParkingSessionStatus.planned,
}

const MOCK_VISITOR_PARKING_SESSION: VisitorParkingSession = {
  vehicle_id: 'ABC123',
  visitor_name: 'John Doe',
  end_date_time: '2026-06-26T12:13:00+01:00',
  no_endtime: false,
  ps_right_id: 0,
  remaining_time: 0,
  report_code: '',
  start_date_time: '2026-06-26T12:12:00+01:00',
  status: ParkingSessionStatus.planned,
}

const SAME_DAY_CASES = [
  {date: '2026-06-16', label: 'Van', fullDate: '16 juni'},
  {date: '2026-06-17', label: 'Morgen', fullDate: '17 juni'},
  {date: '2026-06-15', label: 'Gisteren', fullDate: '15 juni'},
  {date: '2026-06-06', label: '6 juni', fullDate: '6 juni'},
  {date: '2026-06-26', label: '26 juni', fullDate: '26 juni'},
  {date: '2025-06-16', label: '16 juni 2025', fullDate: '16 juni 2025'},
  {date: '2027-06-16', label: '16 juni 2027', fullDate: '16 juni 2027'},
]

describe.each([
  {sessionType: 'permit holder', parkingSession: MOCK_PARKING_SESSION},
  {sessionType: 'visitor', parkingSession: MOCK_VISITOR_PARKING_SESSION},
])(
  'getParkingSessionDurationDescription ($sessionType)',
  ({parkingSession}) => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2026-06-16T12:00:00'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    describe.each([
      ParkingSessionStatus.planned,
      ParkingSessionStatus.completed,
      ParkingSessionStatus.cancelled,
    ])('%s sessions', status => {
      it.each(SAME_DAY_CASES)(
        'shows a same-day range for $date',
        ({date, label}) => {
          expect(
            getParkingSessionDurationDescription(
              {
                ...parkingSession,
                status,
                start_date_time: `${date}T10:12:00`,
                end_date_time: `${date}T12:46:00`,
              },
              1,
              false,
            ),
          ).toBe(`${label} 10.12 tot 12.46 uur`)
        },
      )

      it.each([
        ['2026-06-15', '2026-06-16', '15 juni', 'vandaag'],
        ['2026-06-16', '2026-06-17', 'Vandaag', '17 juni'],
        ['2026-06-17', '2026-06-18', '17 juni', '18 juni'],
        ['2026-06-26', '2026-06-27', '26 juni', '27 juni'],
        ['2026-06-30', '2026-07-01', '30 juni', '1 juli'],
        ['2025-12-31', '2026-01-01', '31 december 2025', '1 januari'],
        ['2026-12-31', '2027-01-01', '31 december', '1 januari 2027'],
      ])(
        'shows both dates for an overnight range from %s to %s',
        (startDate, endDate, startLabel, endLabel) => {
          expect(
            getParkingSessionDurationDescription(
              {
                ...parkingSession,
                status,
                start_date_time: `${startDate}T22:12:00`,
                end_date_time: `${endDate}T02:46:00`,
              },
              1,
              false,
            ),
          ).toBe(`${startLabel}, 22.12 uur tot ${endLabel}, 02.46 uur`)
        },
      )

      describe.each([
        {maxDuration: 1, noEndTime: true},
        {maxDuration: 2, noEndTime: false},
        {maxDuration: Infinity, noEndTime: false},
        {maxDuration: Infinity, noEndTime: true},
      ])(
        'start-only permits ($maxDuration, $noEndTime)',
        ({maxDuration, noEndTime}) => {
          it.each(SAME_DAY_CASES)(
            'shows only the start date and time for $date',
            ({date, fullDate}) => {
              expect(
                getParkingSessionDurationDescription(
                  {
                    ...parkingSession,
                    status,
                    no_endtime: noEndTime,
                    start_date_time: `${date}T10:12:00`,
                    end_date_time: noEndTime ? '' : `${date}T12:46:00`,
                  },
                  maxDuration,
                  noEndTime,
                ),
              ).toBe(`${fullDate}, 10.12 uur`)
            },
          )
        },
      )
    })

    describe.each([1, 2, Infinity])(
      'active sessions (maximum %s days)',
      maxDuration => {
        it.each(SAME_DAY_CASES)(
          'shows the end time, with its own date unless today, for $date',
          ({date, fullDate}) => {
            const datePrefix = date === '2026-06-16' ? '' : `${fullDate}, `

            expect(
              getParkingSessionDurationDescription(
                {
                  ...parkingSession,
                  status: ParkingSessionStatus.active,
                  start_date_time: '2026-06-15T10:12:00',
                  end_date_time: `${date}T12:46:00`,
                },
                maxDuration,
                false,
              ),
            ).toBe(`Tot ${datePrefix}12.46 uur`)
          },
        )

        it.each(SAME_DAY_CASES)(
          'shows the start time without reading an absent end time for $date',
          ({date, fullDate}) => {
            const datePrefix = date === '2026-06-16' ? '' : `${fullDate}, `

            expect(
              getParkingSessionDurationDescription(
                {
                  ...parkingSession,
                  status: ParkingSessionStatus.active,
                  no_endtime: true,
                  start_date_time: `${date}T10:12:00`,
                  end_date_time: '',
                },
                maxDuration,
                true,
              ),
            ).toBe(`Actief sinds ${datePrefix}10.12 uur`)
          },
        )
      },
    )

    it.each(SAME_DAY_CASES)(
      'supports equal start and end times on $date',
      ({date, label}) => {
        expect(
          getParkingSessionDurationDescription(
            {
              ...parkingSession,
              start_date_time: `${date}T00:00:00`,
              end_date_time: `${date}T00:00:00`,
            },
            1,
            false,
          ),
        ).toBe(`${label} 00.00 tot 00.00 uur`)
      },
    )
  },
)
