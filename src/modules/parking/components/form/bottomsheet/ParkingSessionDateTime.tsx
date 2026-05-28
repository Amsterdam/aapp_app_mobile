import {Tabs} from '@/components/ui/Tabs' // Updated import
import {Column} from '@/components/ui/layout/Column'
import {ParkingStartSessionDatePicker} from '@/modules/parking/components/form/bottomsheet/ParkingStartSessionDatePicker'
import {useChangeSessionStartDate} from '@/modules/parking/hooks/useChangeSessionStartDate'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  dateTime: Dayjs
  maxDateTime?: Dayjs
  setDateTime: (time: Dayjs) => void
}

export const ParkingSessionDateTime = ({
  dateTime,
  setDateTime,
  maxDateTime,
}: Props) => {
  const {minDate, newStartTime, changeNewStartTime} = useChangeSessionStartDate(
    setDateTime,
    dateTime,
  )

  return (
    <Column grow={1}>
      <Tabs testID="ParkingSessionDateTimeTabs">
        <Tabs.Tab
          label={formatTimeToDisplay(dateTime, {
            hoursLabelShort: true,
            includeHoursLabel: true,
          })}>
          {minDate && newStartTime ? (
            <ParkingStartSessionDatePicker
              date={newStartTime}
              maxDate={maxDateTime}
              minDate={minDate}
              mode="time"
              onChange={newDateTime => {
                changeNewStartTime(dayjs(newDateTime))
              }}
            />
          ) : null}
        </Tabs.Tab>
        <Tabs.Tab label={formatDateToDisplay(dateTime, false)}>
          {minDate && newStartTime ? (
            <ParkingStartSessionDatePicker
              date={newStartTime}
              maxDate={maxDateTime}
              minDate={minDate}
              mode="date"
              onChange={newDateTime => {
                changeNewStartTime(dayjs(newDateTime))
              }}
            />
          ) : null}
        </Tabs.Tab>
      </Tabs>
    </Column>
  )
}
