import {useMemo} from 'react'
import type {SecureCityPass, CityPassPass} from '@/modules/city-pass/types'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

const transformResponse = (cityPasses: SecureCityPass[]): CityPassPass[] =>
  cityPasses.map(cityPass => ({
    actief: cityPass.a,
    dateEndFormatted: cityPass.d,
    firstname: cityPass.f,
    infix: cityPass.i,
    lastname: cityPass.l,
    passNumberComplete: cityPass.p,
  }))

export const useGetSecureCityPasses = () => {
  const {item: secureCityPasses} = useGetSecureItem(SecureItemKey.cityPasses)

  return useMemo(
    () =>
      secureCityPasses?.length
        ? transformResponse(JSON.parse(secureCityPasses) as SecureCityPass[])
        : ([] as CityPassPass[]),
    [secureCityPasses],
  )
}
