import {Column} from '@/components/ui/layout/Column'
import {SuggestionButton} from '@/modules/address/components/SuggestionButton'
import {BaseAddress, Address, AddressList} from '@/modules/address/types'
import {getSuggestionLabel} from '@/modules/address/utils/getSuggestionLabel'
import {addressPronounce} from '@/utils/accessibility/addressPronounce'

type Props = {
  addresses?: AddressList
  onPressResult: (item: Address | BaseAddress) => void
  showNumbersOnly?: boolean
}

export const AddressSearchSuggestions = ({
  addresses = [],
  onPressResult,
  showNumbersOnly = false,
}: Props) => (
  <Column gutter="xs">
    {addresses.map(address => {
      const key =
        'bagId' in address && address.bagId
          ? address.bagId
          : [address.street, address.city].join('-')

      return (
        <SuggestionButton
          accessibilityLabel={addressPronounce(
            getSuggestionLabel(address, showNumbersOnly),
          )}
          address={address}
          key={key}
          label={getSuggestionLabel(address, showNumbersOnly)}
          logging-label="AddressSearchResultButton"
          onPress={onPressResult}
          testID={`AddressSearchResult${key}Button`}
        />
      )
    })}
  </Column>
)
