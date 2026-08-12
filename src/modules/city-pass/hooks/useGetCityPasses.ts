// eslint-disable-next-line no-restricted-imports
import {useNetInfo} from '@react-native-community/netinfo'
import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {CityPass, CityPassPass} from '@/modules/city-pass/types'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {useSetSecureCityPasses} from '@/modules/city-pass/hooks/useSetSecureCityPasses'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'

/**
 * Either returns the city passes that are stored locally in Secure Storage, or retrieved remotely from the query.
 * Only returns locally stored passes when user is offline, to allow for offline usage.
 */
export const useGetCityPasses = () => {
  const secureCityPasses = useGetSecureCityPasses()
  const setSecureCityPasses = useSetSecureCityPasses()

  const {isConnected, isInternetReachable} = useNetInfo()
  const isOffline = !isConnected || !isInternetReachable

  const {data, isLoading, isError} = useGetCityPassesQuery(
    isOffline ? skipToken : undefined,
  )

  const cityPasses = useMemo<(CityPassPass & Partial<CityPass>)[]>(() => {
    if (data) {
      return data.map(pass => ({
        ...pass,
        firstname: pass.owner.firstname,
        infix: pass.owner.infix,
        lastname: pass.owner.lastname,
      }))
    }

    return secureCityPasses ?? []
  }, [data, secureCityPasses])

  if (data && !isLoading && !isError) {
    setSecureCityPasses(data)
  }

  return {
    cityPasses,
    isLoading,
    isError,
  }
}
