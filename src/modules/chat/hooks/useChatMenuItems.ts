import {useMemo} from 'react'
import {endConversation} from 'react-native-salesforce-messaging-in-app/src'
import {SessionStatus} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useMenu} from '@/store/slices/menu'

export const useChatMenuItems = () => {
  const {close} = useChat()
  const {close: closeMenu} = useMenu()
  const {addDownloadedTranscriptId, ready, sessionStatus} = useChatContext()
  const trackException = useTrackException()
  const {isLoading, isError, openRedirect} = useOpenRedirect()

  return useMemo(() => {
    const menuItems: PopupMenuItem[] = []

    menuItems.push({
      color: 'link',
      label: 'Chat downloaden',
      onPress: () => {
        closeMenu()
        void downloadChat().then(
          entryId => entryId && addDownloadedTranscriptId(entryId),
        )
      },
      testID: 'ChatMenuPressableDownloadChatMenuItem',
    })

    if (!isLoading && !isError) {
      menuItems.push({
        color: 'link',
        label: 'Privacy',
        onPress: () => {
          closeMenu()
          openRedirect(RedirectKey.chatPrivacy)
        },
        testID: 'ChatMenuPressableChatPrivacyMenuItem',
      })
    }

    if (
      sessionStatus === SessionStatus.active ||
      sessionStatus === SessionStatus.waiting ||
      sessionStatus === SessionStatus.error
    ) {
      menuItems.push({
        color: 'warning',
        label: 'Chat stoppen',
        onPress: () => {
          closeMenu()

          if (ready) {
            void endConversation().catch(error =>
              trackException(
                ExceptionLogKey.chatSendMessage,
                'useChatMenuItems.ts',
                {
                  error,
                },
              ),
            )
          } else {
            close()
          }
        },
        testID: 'ChatMenuPressableStopChatMenuItem',
      })
    }

    return menuItems
  }, [
    sessionStatus,
    addDownloadedTranscriptId,
    close,
    closeMenu,
    isError,
    isLoading,
    openRedirect,
    ready,
    trackException,
  ])
}
