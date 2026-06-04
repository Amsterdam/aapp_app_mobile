import {Tabs} from '@/components/ui/Tabs' // Updated import
import {Column} from '@/components/ui/layout/Column'
import {ParkingStartSessionDatePicker} from '@/modules/parking/components/form/bottomsheet/ParkingStartSessionDatePicker'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  dateTime: Dayjs | null
  maxDateTime?: Dayjs
  minDateTime?: Dayjs | null
  setDateTime: (time: Dayjs) => void
}

export const ParkingSessionDateTime = ({
  dateTime,
  setDateTime,
  maxDateTime,
  minDateTime,
}: Props) => {
  if (!dateTime) {
    return null
  }

  return (
    <Column grow={1}>
      <Tabs testID="ParkingSessionDateTimeTabs">
        <Tabs.Tab
          label={formatTimeToDisplay(dateTime, {
            hoursLabelShort: true,
            includeHoursLabel: true,
          })}>
          <ParkingStartSessionDatePicker
            date={dateTime}
            maxDate={maxDateTime}
            minDate={minDateTime ?? dateTime}
            mode="time"
            onChange={newDateTime => {
              setDateTime(dayjs(newDateTime))
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab label={formatDateToDisplay(dateTime, false)}>
          <ParkingStartSessionDatePicker
            date={dateTime}
            maxDate={maxDateTime
              ?.set('hours', dateTime.hour())
              .set('minute', dateTime.minute())
              .set('second', dateTime.second())}
            minDate={minDateTime ?? dateTime}
            mode="date"
            onChange={newDateTime => {
              setDateTime(dayjs(newDateTime))
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </Column>
  )
}
