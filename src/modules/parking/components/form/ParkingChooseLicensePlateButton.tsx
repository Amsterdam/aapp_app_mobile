import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import type {SessionFieldValues} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  licensePlate?: SessionFieldValues['licensePlate']
}

export const ParkingChooseLicensePlateButton = (props: Props) => {
  const form = useFormContext<SessionFieldValues>()
  const permit = useCurrentParkingPermit()

  useEffect(() => {
    if (props.licensePlate) {
      form.setValue('licensePlate', props.licensePlate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    parkingSessions: activeParkingSessions,
    isLoading,
    isError,
  } = useGetParkingSessions(ParkingSessionStatus.active, {
    skip: !permit?.no_endtime,
  })

  return (
    <SelectButtonControlled<
      {licensePlate?: SessionFieldValues['licensePlate']},
      'licensePlate'
    >
      accessibilityLabel={licensePlate =>
        licensePlate
          ? `Kenteken ${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
          : 'Kies kenteken'
      }
      bottomSheetVariant={ParkingSessionBottomSheetVariant.licensePlate}
      disabled={isLoading || isError}
      icon={{
        size: 'lgx',
        name: isLoading && permit?.no_endtime ? 'spinner' : 'car',
      }}
      name="licensePlate"
      rules={{
        required: 'Kies een kenteken',
        validate: newVehicle => {
          if (activeParkingSessions?.length && permit?.no_endtime) {
            return (
              activeParkingSessions?.[0].vehicle_id !==
                newVehicle?.vehicle_id || 'Dit kenteken is al actief'
            )
          }
        },
      }}
      testID="ParkingChooseLicensePlateButton"
      text={licensePlate =>
        licensePlate
          ? `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
          : undefined
      }
      title={licensePlate => (licensePlate ? 'Kenteken' : 'Kies kenteken')}
    />
  )
}
