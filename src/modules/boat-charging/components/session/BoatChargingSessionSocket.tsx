import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'

type Props = {
  socketNumber?: BoatChargingSession['socket_number']
  stationId?: BoatChargingSession['station_id']
}

export const BoatChargingSessionSocket = ({socketNumber, stationId}: Props) => {
  if (!socketNumber || !stationId) {
    return null
  }

  const socketNumberString = `${stationId}-${socketNumber}`

  return (
    <Column>
      <Title
        level="h5"
        testID="BoatChargingSessionSocketTitle"
        text="Stopcontact"
      />
      <Phrase>{socketNumberString}</Phrase>
    </Column>
  )
}
