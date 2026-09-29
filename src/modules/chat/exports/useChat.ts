import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectChatIsOpen,
  selectChatVisibility,
  maximizeChat,
  selectChatHeaderHeight,
  selectChatConversationId,
  selectChatMinimizedHeight,
  openChat,
  closeChat,
  minimizeChat,
  setChatConversationId,
  setChatHeaderHeight,
  setHeightMinimized,
  toggleChatIsOpen,
  toggleChatVisibility,
} from '@/modules/chat/slice'
import {ChatVisibility} from '@/modules/chat/types'

export const useChat = () => {
  const isOpen = useSelector(selectChatIsOpen)
  const headerHeight = useSelector(selectChatHeaderHeight)
  const conversationId = useSelector(selectChatConversationId)
  const visibility = useSelector(selectChatVisibility)
  const isMaximized = visibility === ChatVisibility.maximized
  const isMinimized = visibility === ChatVisibility.minimized
  const minimizedHeight = useSelector(selectChatMinimizedHeight)
  const dispatch = useDispatch()

  const open = useCallback(() => dispatch(openChat()), [dispatch])
  const close = useCallback(() => dispatch(closeChat()), [dispatch])
  const maximize = useCallback(() => dispatch(maximizeChat()), [dispatch])
  const minimize = useCallback(() => dispatch(minimizeChat()), [dispatch])
  const setConversationId = useCallback(
    (newConversationId: string | undefined) =>
      dispatch(setChatConversationId(newConversationId)),
    [dispatch],
  )
  const setHeaderHeight = useCallback(
    (height: number) => dispatch(setChatHeaderHeight(height)),
    [dispatch],
  )

  const setMinimizedHeight = useCallback(
    (height: number) => dispatch(setHeightMinimized(height)),
    [dispatch],
  )
  const toggleIsOpen = useCallback(
    () => dispatch(toggleChatIsOpen()),
    [dispatch],
  )
  const toggleVisibility = useCallback(
    () => dispatch(toggleChatVisibility()),
    [dispatch],
  )

  return {
    close,
    conversationId,
    headerHeight,
    isMaximized,
    isMinimized,
    isOpen,
    open,
    maximize,
    minimize,
    minimizedHeight,
    setConversationId,
    setMinimizedHeight,
    setHeaderHeight,
    toggleIsOpen,
    toggleVisibility,
    visibility,
  }
}
