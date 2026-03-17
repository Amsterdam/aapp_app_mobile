import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const StreetSearchField = () => (
  <SearchFieldControlled<AddressSearchFields, 'street'>
    accessibilityLabel="Zoek naar straatnaam of postcode"
    autoCapitalize="none"
    autoCorrect={false}
    autoFocus
    multiline={false}
    name="street"
    placeholder="Vul uw straatnaam of postcode in"
    testID="AddressStreetInputSearchField"
  />
)
