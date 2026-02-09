import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => {
  const {watch} = useFormContext<{endTime?: Dayjs; startTime: Dayjs}>()
  const endTime = watch('endTime')

  return (
    <SelectButtonControlled<{startTime: Dayjs}, 'startTime'>
      bottomSheetVariant={ParkingSessionBottomSheetVariant.startTime}
      icon={{name: 'clock', size: 'lgx'}}
      name="startTime"
      rules={{
        required: 'Kies een starttijd',
        validate: startTime => {
          if (startTime.isBefore(dayjs().subtract(1, 'minute'), 'minute')) {
            return 'Starttijd mag niet in het verleden liggen'
          }

          if (!endTime) {
            return true
          }

          return (
            startTime.isBefore(endTime) || 'Deze starttijd is niet toegestaan'
          )
        },
      }}
      testID="ParkingChooseStartTimeButton"
      text={startTime => formatDateTimeToDisplay(startTime, false)}
      title="Starttijd"
    />
  )
}
