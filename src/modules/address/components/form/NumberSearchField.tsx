import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {NumberSearchBackPressButton} from '@/modules/address/components/form/NumberSearchBackPressButton'

export const NumberSearchField = () => (
  <Column>
    <Row align="start">
      <NumberSearchBackPressButton />
    </Row>
    <SearchFieldControlled<AddressSearchFields, 'number'>
      accessibilityLabel="Zoek naar huisnummer"
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus
      keyboardType="numbers-and-punctuation"
      multiline={false}
      name="number"
      placeholder="Vul uw huisnummer in"
      testID="AddressNumberInputSearchField"
    />
  </Column>
)
