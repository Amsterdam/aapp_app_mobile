import {ParkingActivateLicensePlateButton} from '@/modules/parking/components/form/ParkingActivateLicensePlateButton'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionSubmitButton = () => {
  const {no_endtime} = useCurrentParkingPermit()

  if (no_endtime) {
    return <ParkingActivateLicensePlateButton />
  }

  return <ParkingStartSessionButton />
}
