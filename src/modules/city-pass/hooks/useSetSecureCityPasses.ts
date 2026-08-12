import {useCallback} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {CityPassResponse, SecureCityPass} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

const transformResponse = (data: CityPassResponse) =>
  data.reduce((acc: SecureCityPass[], item) => {
    const newItem = {
      a: item.actief,
      d: item.dateEndFormatted,
      f: item.owner.firstname,
      ...(item.owner.infix && {i: item.owner.infix}),
      l: item.owner.lastname,
      p: item.passNumberComplete,
    }

    return [...acc, newItem]
  }, [])

export const useSetSecureCityPasses = () => {
  const setSecureItem = useSetSecureItem()

  return useCallback(
    (data?: CityPassResponse) => {
      if (data) {
        void setSecureItem(
          SecureItemKey.cityPasses,
          JSON.stringify(transformResponse(data)),
        )
      }
    },
    [setSecureItem],
  )
}
