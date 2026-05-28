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
  const {minDate, newStartTime, setNewStartTime} = useChangeSessionStartDate(
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

          setNewStartTime(prev =>
            prev
              ?.set('date', startTime.date())
              ?.set('month', startTime.month())
              ?.set('year', startTime.year()),
          )

          if (value === 'Today') {
            setNewStartTime(prev => prev?.subtract(1, 'day'))
          } else {
            setNewStartTime(prev => prev?.add(1, 'day'))
          }

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
            setNewStartTime(dayjs(newTime))
          }}
        />
      ) : null}
    </Track>
  )
}
