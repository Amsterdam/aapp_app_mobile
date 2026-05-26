import {useEffect, useMemo} from 'react'
import {markAsRead} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useChat} from '@/modules/chat/slice'
import {devError} from '@/processes/development'

export const useMarkAsRead = (messages: ConversationEntry[]) => {
  const {isMaximized} = useChat()

  const lastExternalMessage = useMemo(
    () =>
      messages
        .filter(
          message =>
            message.sender.role !== ConversationEntrySenderRole.user &&
            message.format !== ConversationEntryFormat.readAcknowledgement &&
            message.format !== ConversationEntryFormat.transcript,
        )
        ?.at(-1),
    [messages],
  )

  useEffect(() => {
    if (isMaximized && !!lastExternalMessage) {
      void markAsRead(lastExternalMessage).catch(devError)
    }
  }, [lastExternalMessage, isMaximized])
}
