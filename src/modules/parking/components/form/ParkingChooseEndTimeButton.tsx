import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import type {ParkingSessionFormValues} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseEndTimeButton = () => {
  const currentPermit = useCurrentParkingPermit()

  const {no_endtime = false} = currentPermit

  const {watch} = useFormContext<ParkingSessionFormValues>()
  const startTime = watch('startTime')
  const {startTimeRef} = useParkingSession()

  if (no_endtime) {
    return null
  }

  return (
    <SelectButtonControlled<ParkingSessionFormValues, 'endTime'>
      bottomSheetVariant={ParkingSessionBottomSheetVariant.endTime}
      icon={{name: 'clock', size: 'lgx'}}
      name="endTime"
      rules={{
        required: 'Kies een eindtijd',
        validate: endTime =>
          endTime?.isAfter(startTime) || 'Eindtijd moet na starttijd zijn',
      }}
      testID="ParkingChooseEndTimeButton"
      text={endTime =>
        endTime
          ? formatDateTimeToDisplay(
              endTime,
              false,
              startTimeRef.current ? startTimeRef.current : undefined,
            )
          : undefined
      }
      title={endTime => (endTime ? 'Eindtijd' : 'Kies eindtijd')}
    />
  )
}
