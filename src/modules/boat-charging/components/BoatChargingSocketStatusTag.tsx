import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {Tag} from '@/components/ui/text/Tag'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

const STATUS_MAP: Record<ChargingPointStatus, string> = {
  [ChargingPointStatus.OPERATIVE]: 'Vrij',
  [ChargingPointStatus.OCCUPIED]: 'Bezet',
  [ChargingPointStatus.INOPERATIVE]: 'Storing',
  [ChargingPointStatus.OFFLINE]: 'Offline',
  [ChargingPointStatus.UNKNOWN]: 'Onbekend',
}

const WIDTH = {default: 60, wide: 90}

export const BoatChargingSocketStatusTag = ({
  status,
  width = 'default',
}: {
  status: ChargingPointStatus
  width?: keyof typeof WIDTH
}) => (
  <Tag
    paddingVertical="no"
    testID="BoatChargingSocketStatusTag"
    variant={
      status === ChargingPointStatus.OPERATIVE ? 'positive' : 'secondary'
    }>
    <Size width={WIDTH[width]}>
      <Phrase
        allowFontScaling={false}
        color="inverse"
        textAlign="center">
        {STATUS_MAP[status]}
      </Phrase>
    </Size>
  </Tag>
)
