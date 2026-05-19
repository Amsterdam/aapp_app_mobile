import {useEffect} from 'react'
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

  const externalMessages = messages.filter(
    message =>
      message.sender.role !== ConversationEntrySenderRole.user &&
      message.format !== ConversationEntryFormat.readAcknowledgement,
  )

  useEffect(() => {
    if (isMaximized && externalMessages.length > 0) {
      void markAsRead(externalMessages[externalMessages.length - 1]).catch(
        devError,
      )
    }
  }, [externalMessages, externalMessages.length, isMaximized])
}
