import {
  ConversationEntryRoutingWorkType,
  ConversationEntryRoutingWorkResult,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {useChatContext} from '@/modules/chat/providers/chat.context'

type Props = {
  isLast: boolean
  isLastOfGroup: boolean
  message: ConversationEntryRoutingWorkResult
}

export const EntryRoutingWorkResult = ({message, isLastOfGroup}: Props) => {
  const {messages, isEnded} = useChatContext()

  const messagesAfterCurrent = messages.slice(messages.indexOf(message) + 1)
  const isNotLastRoutingWorkResultEntry =
    messagesAfterCurrent.filter(
      m => m.format === ConversationEntryFormat.routingWorkResult,
    ).length > 0

  if (
    message.workType !== ConversationEntryRoutingWorkType.closed ||
    !isEnded ||
    isNotLastRoutingWorkResultEntry
  ) {
    return null
  }

  return (
    <>
      <ChatSystemEntry
        icon="speech-balloon-ellipsis"
        testID="ChatEntryRoutingWorkResultEntry"
        text="Chat gestopt"
        timestamp={message.timestamp}
      />
      <EntryGutter isLastOfGroup={isLastOfGroup} />
    </>
  )
}
