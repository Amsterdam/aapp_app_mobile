import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuOrientation} from '@/components/ui/menus/types'
import {useChat} from '@/modules/chat/exports/useChat'
import {useChatMenuItems} from '@/modules/chat/hooks/useChatMenuItems'

export const ChatMenu = () => {
  const {headerHeight} = useChat()
  const chatMenuItems = useChatMenuItems()
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <PopUpMenu
      menuItems={chatMenuItems}
      orientation={PopupMenuOrientation.left}
      topInset={headerHeight + safeAreaInsets.top}
    />
  )
}
