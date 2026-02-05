import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {
  ParkingSessionStatus,
  type ParkingLicensePlate,
} from '@/modules/parking/types'

export const ParkingChooseLicensePlateButton = () => {
  const permit = useCurrentParkingPermit()

  const {
    parkingSessions: activeParkingSessions,
    isLoading,
    isError,
  } = useGetParkingSessions(ParkingSessionStatus.active, {
    skip: !permit?.no_endtime,
  })

  return (
    <SelectButtonControlled<
      {licensePlate?: ParkingLicensePlate},
      'licensePlate'
    >
      accessibilityLabel={licensePlate =>
        licensePlate
          ? `Kenteken ${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
          : 'Kies kenteken'
      }
      bottomSheetVariant={ParkingSessionBottomSheetVariant.licensePlate}
      disabled={isLoading || isError}
      icon={isLoading && permit?.no_endtime ? {name: 'spinner'} : {name: 'car'}}
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
