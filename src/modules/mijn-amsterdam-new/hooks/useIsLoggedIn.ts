import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {selectIsLoggedIn} from '@/modules/mijn-amsterdam-new/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {item, isLoading} = useGetSecureItem(
    SecureItemKey.mijnAmsterdamAccessToken,
  )

  return {
    isLoggedIn: !!item && isLoggedIn,
    isLoading,
    profileName: undefined,
    refetch: () => null,
  }
}
