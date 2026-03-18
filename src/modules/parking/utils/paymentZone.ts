import type {Dayjs} from 'dayjs'
import {PaymentZone, PaymentZoneDay} from '@/modules/parking/types'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatWeekdayNumberToDisplay} from '@/utils/datetime/formatWeekdayNumberToDisplay'
import {
  type WeekdayNumber,
  weekDayNumbers,
  weekdayToNumber,
} from '@/utils/datetime/weekdayToNumber'

export const getPaymentZone = (
  paymentZones: PaymentZone[],
  paymentZoneId: string,
) => paymentZones.find(zone => zone.id === paymentZoneId)

export const getPaymentZoneDay = (
  paymentZone: PaymentZone,
  dayOfWeek: WeekdayNumber,
) =>
  paymentZone?.days.find(day => weekdayToNumber(day.day_of_week) === dayOfWeek)

export const getPaymentZoneDayTimeSpan = (
  paymentZoneDay?: PaymentZoneDay,
  wordTill: boolean = false,
) =>
  paymentZoneDay
    ? `${formatTimeToDisplay(paymentZoneDay.start_time)} ${wordTill ? 'tot' : '-'} ${formatTimeToDisplay(paymentZoneDay.end_time, {includeHoursLabel: true, replaceMidnightBy24: true})}`
    : undefined

export const areAllPaymentZonesEqualOnDayOfWeek = (
  paymentZones: PaymentZone[],
  startTimeDayOfWeek: WeekdayNumber,
) =>
  paymentZones.length === 1 ||
  paymentZones.every(
    zone =>
      getPaymentZoneDayTimeSpan(getPaymentZoneDay(zone, startTimeDayOfWeek)) ===
      getPaymentZoneDayTimeSpan(
        paymentZones[0] &&
          getPaymentZoneDay(paymentZones[0], startTimeDayOfWeek),
      ),
  )

export const areAllPaymentZonesEqual = (paymentZones: PaymentZone[]) =>
  weekDayNumbers.every(dayOfWeek =>
    areAllPaymentZonesEqualOnDayOfWeek(paymentZones, dayOfWeek),
  )

export const getParkingMachineDetailsLabel = (
  parkingMachineDetails: PaymentZone | undefined,
  startTime: Dayjs,
) => {
  const startTimeDayOfWeek = startTime.day()

  const startTimePaymentZoneDay = parkingMachineDetails
    ? getPaymentZoneDay(parkingMachineDetails, startTimeDayOfWeek)
    : undefined

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  if (timeString) {
    if (parkingMachineDetails?.hourly_rate) {
      return `${timeString}, ${parkingMachineDetails.hourly_rate} per uur`
    }

    return timeString
  }

  if (parkingMachineDetails?.hourly_rate) {
    return `${parkingMachineDetails.hourly_rate} per uur`
  }

  return ''
}

export const getParkingMachinePaymentTimes = (
  parkingMachineDetails: PaymentZone | undefined,
): Record<string, string> => {
  if (!parkingMachineDetails) {
    return {}
  }

  const daysPerPaymentTimes = weekDayNumbers.reduce(
    (acc, day) => {
      const timeSpan =
        getPaymentZoneDayTimeSpan(
          getPaymentZoneDay(parkingMachineDetails, day),
          true,
        ) ?? ''

      acc[timeSpan] = [...(acc[timeSpan] || []), day]

      return acc
    },
    {} as Record<string, WeekdayNumber[]>,
  )

  const paymentTimes = Object.entries(daysPerPaymentTimes).reduce(
    (acc, [timeSpan, days]) => ({
      ...acc,
      [formatWeekdayNumberToDisplay(days)]: timeSpan,
    }),
    {} as Record<string, string>,
  )

  return paymentTimes
}

export const sortPaymentTimes = (
  [_, timeSpanA]: [unknown, string],
  [__, timeSpanB]: [unknown, string],
) => {
  if (timeSpanA && !timeSpanB) {
    return -1
  }

  if (!timeSpanA && timeSpanB) {
    return 1
  }

  return 0
}
