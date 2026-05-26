import {useMemo, useRef} from 'react'
import {useController} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Track} from '@/components/ui/layout/Track'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'
import {roundDownToMinutes} from '@/utils/datetime/roundDownToMinutes'

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
  const startTimeRef = useRef(startTime)
  const {userHasEditedStart} = useParkingSession()

  const justNow = useMemo(() => roundDownToMinutes(startTimeRef.current), [])

  return (
    <Track align="around">
      <RadioGroup
        onChange={value => {
          let newStartTime = startTimeRef.current

          newStartTime = newStartTime
            .set('date', startTimeRef.current.date())
            .set('month', startTimeRef.current.month())
            .set('year', startTimeRef.current.year())

          if (value !== 'Today') {
            newStartTime = newStartTime.add(1, 'day')
          }

          onChangeStartTime(newStartTime)

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
      <DatePicker
        date={startTimeRef.current.toDate()}
        is24hourSource="locale"
        locale="nl-NL"
        minimumDate={justNow.toDate()}
        mode="time"
        onDateChange={newStartTime => {
          userHasEditedStart.current = true
          onChangeStartTime(dayjs(newStartTime))
        }}
        style={styles.centerSelf}
        theme="light"
      />
    </Track>
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
