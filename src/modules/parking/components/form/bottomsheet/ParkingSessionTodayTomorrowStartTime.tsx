import {useController} from 'react-hook-form'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Track} from '@/components/ui/layout/Track'
import {ParkingStartSessionDatePicker} from '@/modules/parking/components/form/bottomsheet/ParkingStartSessionDatePicker'
import {useChangeSessionStartDate} from '@/modules/parking/hooks/useChangeSessionStartDate'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'

type FieldValues = {endTime?: Dayjs; startTime: Dayjs}

export const ParkingSessionTodayTomorrowStartTime = () => {
  const {
    field: {value: startTime, onChange: onChangeStartTime},
  } = useController<FieldValues, 'startTime'>({
    name: 'startTime',
  })
  const {
    field: {value: endTime, onChange: onChangeEndTime},
  } = useController<FieldValues, 'endTime'>({
    name: 'endTime',
  })
  const {minDate, newStartTime, changeNewStartTime} = useChangeSessionStartDate(
    onChangeStartTime,
    startTime,
  )

  return (
    <Track align="around">
      <RadioGroup
        onChange={value => {
          if (!newStartTime) {
            return
          }

          let tempStartTime = newStartTime

          if (value === 'Today' && !isToday(tempStartTime)) {
            tempStartTime = tempStartTime.subtract(1, 'day')
          }

          if (value === 'Tomorrow' && isToday(tempStartTime)) {
            tempStartTime = tempStartTime.add(1, 'day')
          }

          changeNewStartTime(tempStartTime)

          if (endTime) {
            const newEndTime = endTime
              .set('date', newStartTime.date())
              .set('month', newStartTime.month())
              .set('year', newStartTime.year())

            onChangeEndTime(newEndTime)
          }
        }}
        options={[
          {label: 'Vandaag', value: 'Today'},
          {label: 'Morgen', value: 'Tomorrow'},
        ]}
        testID="ParkingSessionTodayTomorrowStartTimeRadioGroup"
        value={isToday(startTime) ? 'Today' : 'Tomorrow'}
      />
      {minDate && newStartTime ? (
        <ParkingStartSessionDatePicker
          date={newStartTime}
          minDate={minDate}
          mode="time"
          onChange={newTime => {
            changeNewStartTime(dayjs(newTime))
          }}
        />
      ) : null}
    </Track>
  )
}
