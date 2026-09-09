import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'
import {BaseAddress, Address} from '@/modules/address/types'

type StreetSearchResultsProps = {
  onPressResult: (item: Address | BaseAddress) => void
}

export const StreetSearchResults = ({
  onPressResult,
}: StreetSearchResultsProps) => {
  const {
    data: list,
    isError,
    isFetching,
    refetch,
  } = useGetAddressFormList('street')

  if (isFetching) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
          testID="AddressStreetSearchResultsLoadingIcon"
        />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box insetVertical="md">
        <SomethingWentWrong
          retryFn={refetch}
          testID="AddressStreetSearchResultsSomethingWentWrong"
          text="Door een technische storing kunnen er geen adressen worden gevonden. Probeer het later nog eens."
          title=""
        />
      </Box>
    )
  }

  if (!list || list.length === 0) {
    return (
      <Box insetVertical="md">
        <EmptyMessage
          testID="AddressStreetSearchNoResultsMessage"
          text="Straatnaam niet gevonden. Controleer uw spelling of probeer een adres
        in de buurt."
        />
      </Box>
    )
  }

  return (
    <AddressSearchSuggestions
      addresses={list}
      onPressResult={onPressResult}
    />
  )
}
