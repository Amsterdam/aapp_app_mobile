import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import type {SessionFieldValues} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

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
      Pick<SessionFieldValues, 'licensePlate'>,
      'licensePlate'
    >
      accessibilityLabel={licensePlate =>
        licensePlate
          ? `Kenteken ${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
          : 'Kies kenteken'
      }
      bottomSheetVariant={ParkingSessionBottomSheetVariant.licensePlate}
      defaultValue={
        activeParkingSessions?.[0].vehicle_id
          ? {vehicle_id: activeParkingSessions[0].vehicle_id}
          : undefined
      }
      disabled={isLoading || isError}
      icon={{
        size: 'lgx',
        name: isLoading ? 'spinner' : 'car',
      }}
      name="licensePlate"
      rules={{
        required: 'Kies een kenteken',
        validate: newVehicle => {
          if (activeParkingSessions?.length) {
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
