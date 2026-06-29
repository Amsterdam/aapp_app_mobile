import {useEffect} from 'react'
import {alerts} from '@/modules/parking/alerts'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {getPermitStartDateString} from '@/modules/parking/utils/getPermitStartDateString'
import {useAlert} from '@/store/slices/alert'

export const ParkingSessionChooseTime = () => {
  const {payment_zones, no_endtime, isPermitStartedAtInFuture, started_at} =
    useCurrentParkingPermit()
  const {setAlert} = useAlert()

  const hasPaymentZoneId = payment_zones[0]?.id

  useEffect(() => {
    if (isPermitStartedAtInFuture) {
      setAlert({
        ...alerts.inactivePermitInfo,
        text: getPermitStartDateString(started_at),
      })
    }
  }, [setAlert, isPermitStartedAtInFuture, started_at])

  if (no_endtime) {
    return null
  }

  return (
    <>
      <ParkingChooseStartTimeButton />
      <ParkingChooseEndTimeButton />
      {!!hasPaymentZoneId && <ParkingChoosePaymentZone />}
    </>
  )
}
