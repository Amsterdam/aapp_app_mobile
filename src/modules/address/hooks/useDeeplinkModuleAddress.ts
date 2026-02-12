import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {useGetAddressSuggestionsQuery} from '@/modules/address/service'
import {
  addRecentAddress,
  setModuleCustomAddress,
  useMyAddress,
} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export const useDeeplinkModuleAddress = (
  params?: {
    adres?: string
  },
  moduleSlug: ModuleSlug = ModuleSlug.address,
) => {
  const dispatch = useDispatch()

  const {address} = useSelectedAddress(moduleSlug)
  const myAddress = useMyAddress()
  const setLocationType = useSetLocationType(moduleSlug)

  const {data: addressFromDeeplink} = useGetAddressSuggestionsQuery(
    params?.adres ? {address: params.adres} : skipToken,
    {
      selectFromResult: result => ({
        data: result?.data?.[0]?.type === 'adres' ? result.data[0] : null,
      }),
    },
  )

  useEffect(() => {
    if (addressFromDeeplink && addressFromDeeplink?.bagId !== address?.bagId) {
      if (addressFromDeeplink.bagId === myAddress?.bagId) {
        setLocationType('address')

        return
      }

      dispatch(addRecentAddress(addressFromDeeplink))

      dispatch(
        setModuleCustomAddress({
          moduleSlug,
          address: addressFromDeeplink,
        }),
      )
      setLocationType('custom')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressFromDeeplink])
}
