import {ParkingActivateLicensePlateButton} from '@/modules/parking/components/form/ParkingActivateLicensePlateButton'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionSubmitButton = () => {
  const {isPermitStartedAtInFuture, no_endtime} = useCurrentParkingPermit()

  if (isPermitStartedAtInFuture) {
    return null
  }

  if (no_endtime) {
    return <ParkingActivateLicensePlateButton />
  }

  return <ParkingStartSessionButton />
}
