import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'

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
