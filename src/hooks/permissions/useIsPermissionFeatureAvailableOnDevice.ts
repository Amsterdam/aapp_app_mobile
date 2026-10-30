import {useState, useEffect} from 'react'
import {check, Permission} from 'react-native-permissions'
import {isAndroidVersionBelow12} from '@/utils/isAndroidVersionBelow12'

export const useIsPermissionFeatureAvailableOnDevice = (
  permission: Permission,
) => {
  const [isAvailable, setIsAvailable] = useState<boolean>()

  useEffect(() => {
    if (isAndroidVersionBelow12) {
      setIsAvailable(true)

      return
    }

    void check(permission).then(result => {
      setIsAvailable(result !== 'unavailable')
    })
  }, [permission])

  return isAvailable
}
