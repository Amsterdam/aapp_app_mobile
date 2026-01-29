import type {Address} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {useRecentAddresses} from '@/modules/address/slice'

export const RecentAddresses = ({
  onPress,
}: {
  onPress: (address: Address) => void
}) => {
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
            label={address.addressLine1}
            onPress={onPress}
            testID="RecentAddressesSuggestionButton"
          />
        ))}
      </Column>
    </Column>
  )
}
