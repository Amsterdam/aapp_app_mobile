import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'

type Props = {
  socketNumber?: BoatChargingSession['socket_number']
}

export const BoatChargingSessionSocket = ({socketNumber}: Props) => {
  if (!socketNumber) {
    return null
  }

  return (
    <Column>
      <Title
        level="h5"
        testID="BoatChargingSessionSocketTitle"
        text="Stopcontact"
      />
      <Phrase>{socketNumber}</Phrase>
    </Column>
  )
}
