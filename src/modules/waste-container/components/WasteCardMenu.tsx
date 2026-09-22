import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {SecureItemKey} from '@/utils/secureStorage'

export const WasteCardMenu = () => {
  const navigation = useNavigation()
  const removeSecureItems = useRemoveSecureItems()

  const onPress = useCallback(() => {
    void removeSecureItems([SecureItemKey.wasteCardNumber]).then(() => {
      navigation.pop()
    })
  }, [navigation, removeSecureItems])

  const menuItems: PopupMenuItem[] = [
    {
      color: 'destructive',
      label: 'Verwijder afvalpas',
      onPress,
      testID: 'WasteCardMenuDeleteButton',
    },
  ]

  return (
    <PopUpMenu
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
