import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

export const useGetSecureAccessCode = () => {
  const {item: accessCode, isLoading} = useGetSecureItem(
    SecureItemKey.accessCode,
  )

  return {accessCode, isLoading}
}
