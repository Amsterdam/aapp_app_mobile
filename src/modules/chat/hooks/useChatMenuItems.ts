import {useMemo} from 'react'
import {endConversation} from 'react-native-salesforce-messaging-in-app/src'
import {SessionStatus} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useChat} from '@/modules/chat/exports/useChat'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const useChatMenuItems = () => {
  const {close} = useChat()
  const {addDownloadedTranscriptId, ready, sessionStatus} = useChatContext()
  const trackException = useTrackException()
  const {isLoading, isError, openRedirect} = useOpenRedirect()

  return useMemo(() => {
    const menuItems: PopupMenuItem[] = []

    menuItems.push({
      label: 'Chat downloaden',
      onPress: () => {
        void downloadChat().then(
          entryId => entryId && addDownloadedTranscriptId(entryId),
        )
      },
      testID: 'ChatMenuPressableDownloadChatMenuItem',
    })

    if (!isLoading && !isError) {
      menuItems.push({
        label: 'Privacy',
        onPress: () => {
          openRedirect(RedirectKey.chatPrivacy)
        },
        testID: 'ChatMenuPressableChatPrivacyMenuItem',
      })
    }

    if (sessionStatus !== SessionStatus.ended) {
      menuItems.push({
        color: 'destructive',
        label: 'Chat stoppen',
        onPress: () => {
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
    isError,
    isLoading,
    openRedirect,
    ready,
    trackException,
  ])
}
