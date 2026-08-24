import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {Address, BaseAddress} from '@/modules/address/types'
import {NumberSearchResults} from '@/modules/address/components/form/NumberSearchResults'
import {StreetSearchResults} from '@/modules/address/components/form/StreetSearchResults'

type Props = {
  onPressResult: (address: Address) => void
}

export const AddressSearchResults = ({onPressResult}: Props) => {
  const {setValue, watch} = useFormContext<AddressSearchFields>()

  const selectAddress = (selectedAddress: Address | BaseAddress) => {
    if (selectedAddress.type !== 'adres') {
      return handleIncompleteAddress(selectedAddress)
    }

    onPressResult(selectedAddress)
  }

  const handleIncompleteAddress = (item: Address | BaseAddress) => {
    setValue('city', item.city)
    setValue('street', item.street)
  }

  const requestNumber = !!watch('city')

  return (
    <>
      {requestNumber ? (
        <NumberSearchResults onPressResult={selectAddress} />
      ) : (
        <StreetSearchResults onPressResult={selectAddress} />
      )}
    </>
  )
}
