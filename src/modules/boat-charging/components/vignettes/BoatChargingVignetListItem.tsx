import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {Vignet} from '@/modules/boat-charging/types'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Props = {
  vignet: Vignet
}

export const BoatChargingVignetListItem = ({
  vignet: {boat_name, vignette_number, expiration_date, id},
}: Props) => {
  const {navigate} = useNavigation()

  return (
    // TODO: Change this to ObjectButton once new component has been set up (https://gemeente-amsterdam.atlassian.net/browse/AM-1013?atlOrigin=eyJpIjoiNmJjZDhhNjlmZWE5NDE5ZDg5NWE2MTNkZGE5M2ExMzUiLCJwIjoiaiJ9)
    <TopTaskButton
      accessibilityLabel={[
        `Vignet ${vignette_number}`,
        boat_name,
        `Geldig tot ${formatDateToDisplay(expiration_date)}`,
      ]
        .filter(Boolean)
        .join(', ')}
      icon={{name: 'boat'}}
      iconRight={{
        name: 'chevron-right',
        size: 'lg',
        color: 'secondary',
      }}
      insetHorizontal="no"
      onPress={() => navigate(BoatChargingRouteName.vignet, {vignetId: id})}
      testID="VignetListItemTopTaskButton"
      text={boat_name}
      textAdditional={`Geldig tot ${formatDateToDisplay(expiration_date)}`}
      title={vignette_number}
    />
  )
}
