import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Icon} from '@/components/ui/media/Icon'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {Address, AddressList, BaseAddress} from '@/modules/address/types'

type NumberSearchResultProps = {
  bagList?: AddressList
  isError: boolean
  isLoading: boolean
  onPressResult: (item: BaseAddress | Address) => void
  refetch: () => void
}

export const NumberSearchResult = ({
  bagList,
  isError,
  isLoading,
  refetch,
  onPressResult,
}: NumberSearchResultProps) => {
  if (isLoading) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
          testID="AddressNumberSearchResultLoadingIcon"
        />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box insetVertical="lg">
        <SomethingWentWrong
          retryFn={refetch}
          testID="AddressNumberSearchResultSomethingWentWrong"
          text="Door een technische storing kunnen er geen adressen worden gevonden. Probeer het later nog eens."
          title=""
        />
      </Box>
    )
  }

  if (!bagList || bagList.length === 0) {
    return (
      <Box insetVertical="md">
        <EmptyMessage
          testID="AddressNumberSearchNoResultsMessage"
          text="Huisnummer niet gevonden. Controleer het huisnummer. Of probeer een ander nummer."
        />
      </Box>
    )
  }

  return (
    <AddressSearchSuggestions
      addresses={bagList}
      onPressResult={onPressResult}
      showNumbersOnly
    />
  )
}
