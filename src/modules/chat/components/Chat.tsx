import {useCallback, useRef} from 'react'
import {StyleSheet} from 'react-native'
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller'
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

const KEYBOARD_EXTRA_SPACE_CORRECTION = 30

export const Chat = () => {
  const {isOpen} = useChat()
  const trackException = useTrackException()
  const styles = createStyles()
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null)

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
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
            extraKeyboardSpace={-KEYBOARD_EXTRA_SPACE_CORRECTION}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
            ref={scrollRef}
            style={styles.scrollView}>
            <ChatAnimatedContentWrapper>
              <ChatHistory />
            </ChatAnimatedContentWrapper>
            <ChatInput onSubmit={onSubmit} />
          </KeyboardAwareScrollView>
        </ChatWaitToStart>
      </ChatAnimatedWrapper>
    </ChatProvider>
  ) : null
}

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
    },
    scrollView: {
      flex: 1,
    },
  })
