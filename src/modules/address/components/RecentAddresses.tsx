import type {Address} from '@/modules/address/exports/types'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/exports/utils/getAddressLineWithCityIfNotAmsterdam'
import {useRecentAddresses} from '@/modules/address/slice'

type Props = {
  onPress: (address: Address) => void
}

export const RecentAddresses = ({onPress}: Props) => {
  const recentAddresses = useRecentAddresses()

  if (!recentAddresses.length) {
    return null
  }

  return (
    <Column gutter="sm">
      <Title
        color="secondary"
        level="h5"
        text="Recente adressen"
      />
      <Column>
        {recentAddresses.map(address => (
          <SuggestionButton
            address={address}
            icon={{name: 'time-back'}}
            key={address.bagId}
            label={getAddressLineWithCityIfNotAmsterdam(address)}
            onPress={onPress}
            testID="RecentAddressesSuggestionButton"
          />
        ))}
      </Column>
    </Column>
  )
}
