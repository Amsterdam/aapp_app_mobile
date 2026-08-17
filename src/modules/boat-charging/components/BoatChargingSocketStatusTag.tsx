import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {Tag} from '@/components/ui/text/Tag'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

const SIZE = 60

const STATUS_MAP: Record<ChargingPointStatus, string> = {
  [ChargingPointStatus.OPERATIVE]: 'Vrij',
  [ChargingPointStatus.OCCUPIED]: 'Bezet',
  [ChargingPointStatus.INOPERATIVE]: 'Storing',
  [ChargingPointStatus.OFFLINE]: 'Storing',
  [ChargingPointStatus.UNKNOWN]: 'Storing',
}

export const BoatChargingSocketStatusTag = ({
  status,
}: {
  status: ChargingPointStatus
}) => (
  <Tag
    paddingVertical="no"
    testID="BoatChargingSocketStatusTag"
    variant={
      status === ChargingPointStatus.OPERATIVE ? 'positive' : 'secondary'
    }>
    <Size width={SIZE}>
      <Phrase
        allowFontScaling={false}
        color="inverse"
        textAlign="center">
        {STATUS_MAP[status]}
      </Phrase>
    </Size>
  </Tag>
)
