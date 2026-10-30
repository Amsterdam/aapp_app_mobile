import type {VisitingHour, ExceptionDate} from '@/types/openingTimes'

export const day = {
  monday: '2022-08-29',
  wednesday: '2022-08-31',
  thursday: '2022-09-01',
  friday: '2022-09-02',
  saturday: '2022-09-03',
  sunday: '2022-09-04',
  beforeKingsDay: '2022-04-26',
  kingsDay: '2022-04-27',
  sinterklaas: '2022-12-05',
  beforeChristmas: '2022-12-23',
  christmasDay: '2022-12-26',
  // Daylight saving time
  dstStart: '2022-03-27',
  dstEnd: '2022-10-30',
} as const

export const visitingHours: VisitingHour[] = [
  {
    dayOfWeek: 1,
    opening: {hours: 9, minutes: 0},
    closing: {hours: 17, minutes: 0},
  },
  {
    dayOfWeek: 2,
    opening: {hours: 9, minutes: 0},
    closing: {hours: 17, minutes: 0},
  },
  {
    dayOfWeek: 3,
    opening: {hours: 9, minutes: 0},
    closing: {hours: 17, minutes: 0},
  },
  {
    dayOfWeek: 4,
    opening: {hours: 9, minutes: 0},
    closing: {hours: 20, minutes: 0},
  },
  {
    dayOfWeek: 5,
    opening: {hours: 9, minutes: 0},
    closing: {hours: 17, minutes: 0},
  },
]

export const exceptionDates: ExceptionDate[] = [
  {
    date: '2022-04-27',
    description: '',
  },
  {
    date: '2022-12-26',
    description: '',
  },
  {
    date: '2022-12-05',
    opening: {hours: 9, minutes: 0},
    closing: {hours: 16, minutes: 0},
    description: '',
  },
]
