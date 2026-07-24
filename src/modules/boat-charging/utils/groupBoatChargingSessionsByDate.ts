import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export type Section = {
  data: BoatChargingSession[]
  title: string
}

export const groupBoatChargingSessionsByDate = (
  sessions: BoatChargingSession[] | undefined,
): Section[] =>
  [...(sessions ?? [])]
    .sort((a, b) =>
      a.start_date_time === b.start_date_time
        ? 0
        : dayjs(a.start_date_time ?? a.created_date_time).isBefore(
              dayjs(b.start_date_time ?? b.created_date_time),
            )
          ? 1
          : -1,
    )
    .reduce<Section[]>((result, session) => {
      const date = formatDateToDisplay(
        session.start_date_time ?? session.created_date_time,
        false,
        false,
      )
      const section = result.find(s => s.title === date)

      if (section) {
        section.data.push(session)
      } else {
        result.push({title: date, data: [session]})
      }

      return result
    }, [])
