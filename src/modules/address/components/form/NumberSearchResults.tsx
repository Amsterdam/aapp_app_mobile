import {NumberSearchAnimation} from '@/modules/address/components/form/NumberSearchAnimation'
import {NumberSearchResult} from '@/modules/address/components/form/NumberSearchResult'
import type {Address, BaseAddress} from '@/modules/address/exports/types'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'

type Props = {
  onPressResult: (item: Address | BaseAddress) => void
}

export const NumberSearchResults = ({onPressResult}: Props) => {
  const {
    data: list,
    isError,
    isFetching,
    refetch,
  } = useGetAddressFormList('number')

  return (
    <NumberSearchAnimation>
      <NumberSearchResult
        bagList={list}
        isError={isError}
        isLoading={isFetching}
        onPressResult={onPressResult}
        refetch={refetch}
      />
    </NumberSearchAnimation>
  )
}
