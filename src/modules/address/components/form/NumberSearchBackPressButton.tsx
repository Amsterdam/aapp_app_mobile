import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import {Button} from '@/components/ui/buttons/Button'

export const NumberSearchBackPressButton = () => {
  const {watch, setValue} = useFormContext<AddressSearchFields>()

  const street = watch('street')

  const handlePressBack = () => {
    setValue('city', undefined)
    setValue('number', '')
  }

  return (
    <Button
      accessibilityHint="klik om straatnaam te veranderen"
      accessibilityLabel={street}
      icon={{name: 'chevron-up', size: 'ml'}}
      label={street}
      onPress={handlePressBack}
      testID="AddressFormNumberSearchBackPressButton"
      variant="tertiary"
    />
  )
}
