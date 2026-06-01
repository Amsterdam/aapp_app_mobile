import {useController} from 'react-hook-form'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Track} from '@/components/ui/layout/Track'
import {ParkingStartSessionDatePicker} from '@/modules/parking/components/form/bottomsheet/ParkingStartSessionDatePicker'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
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
  const {startTimeRef, userHasEditedStart} = useParkingSession()

  return (
    <Track align="around">
      <RadioGroup
        onChange={value => {
          if (!startTime) {
            return
          }

          let tempStartTime = startTime

          if (value === 'Today' && !isToday(tempStartTime)) {
            tempStartTime = tempStartTime.subtract(1, 'day')
          }

          if (value === 'Tomorrow' && isToday(tempStartTime)) {
            tempStartTime = tempStartTime.add(1, 'day')
          }

          userHasEditedStart.current = true
          onChangeStartTime(tempStartTime)

          if (endTime) {
            const newEndTime = endTime
              .set('date', tempStartTime.date())
              .set('month', tempStartTime.month())
              .set('year', tempStartTime.year())

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
      {startTimeRef.current && startTime ? (
        <ParkingStartSessionDatePicker
          date={startTime}
          minDate={startTimeRef.current}
          mode="time"
          onChange={newTime => {
            userHasEditedStart.current = true
            onChangeStartTime(dayjs(newTime))
          }}
        />
      ) : null}
    </Track>
  )
}
