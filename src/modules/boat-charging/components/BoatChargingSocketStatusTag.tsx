import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {Tag} from '@/components/ui/text/Tag'
import {mapStatusToLabel} from '@/modules/boat-charging/constants/mapStatusToLabel'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

const SIZE = 60

type Props = {
  status: ChargingPointStatus
}
export const BoatChargingSocketStatusTag = ({status}: Props) => (
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
        {mapStatusToLabel[status]}
      </Phrase>
    </Size>
  </Tag>
)
