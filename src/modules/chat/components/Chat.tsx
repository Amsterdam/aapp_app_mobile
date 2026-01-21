import {useCallback} from 'react'
import {KeyboardStickyView} from 'react-native-keyboard-controller'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ChatAnimatedContentWrapper} from '@/modules/chat/components/ChatAnimatedContentWrapper'
import {ChatAnimatedWrapper} from '@/modules/chat/components/ChatAnimatedWrapper'
import {ChatHeader} from '@/modules/chat/components/ChatHeader'
import {ChatHistory} from '@/modules/chat/components/ChatHistory'
import {ChatInput} from '@/modules/chat/components/ChatInput'
import {ChatWaitToStart} from '@/modules/chat/components/ChatWaitToStart'
import {ChatProvider} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const Chat = () => {
  const {isOpen} = useChat()
  const trackException = useTrackException()
  const {bottom} = useSafeAreaInsets()

  const onSubmit = useCallback(
    (message: string) => {
      void sendMessage(message).catch(error =>
        trackException(ExceptionLogKey.chatSendMessage, 'Chat.tsx', {
          error,
        }),
      )
    },
    [trackException],
  )

  return isOpen ? (
    <ChatProvider>
      <ChatAnimatedWrapper>
        <ChatHeader />
        <ChatWaitToStart>
          <ChatAnimatedContentWrapper>
            <ChatHistory />
          </ChatAnimatedContentWrapper>
          <KeyboardStickyView offset={{opened: bottom}}>
            <ChatInput onSubmit={onSubmit} />
          </KeyboardStickyView>
        </ChatWaitToStart>
      </ChatAnimatedWrapper>
    </ChatProvider>
  ) : null
}
