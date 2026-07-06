import {Notice} from '@/components/ui/feedback/Notice'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {isBeforeNow} from '@/utils/datetime/isBeforeNow'

export const ParkingPermitNotYetActiveNotice = () => {
  const {started_at} = useCurrentParkingPermit()

  if (!started_at || isBeforeNow(started_at)) {
    return null
  }

  const startedAtDateAndTime = formatDateTimeToDisplay(
    started_at,
    false,
  ).toLowerCase()

  return (
    <Notice
      text={`U kunt met deze vergunning parkeren vanaf ${startedAtDateAndTime}. Kies daarom een starttijd vanaf dit tijdstip.`}
      variant="warning"
    />
  )
}
