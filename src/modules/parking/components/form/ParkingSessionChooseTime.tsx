import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionChooseTime = () => {
  const {payment_zones, no_endtime} = useCurrentParkingPermit()

  if (no_endtime) {
    return null
  }

  const hasPaymentZoneId = payment_zones[0]?.id

  return (
    <>
      <ParkingChooseStartTimeButton />
      <ParkingChooseEndTimeButton />
      {!!hasPaymentZoneId && <ParkingChoosePaymentZone />}
    </>
  )
}
