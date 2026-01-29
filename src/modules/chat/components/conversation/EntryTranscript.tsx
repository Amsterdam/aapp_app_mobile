import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {useChatContext} from '@/modules/chat/providers/chat.context'

type Props = {
  message: ConversationEntry
}

export const EntryTranscript = ({message}: Props) => {
  const {downloadedTranscriptIds} = useChatContext()

  return downloadedTranscriptIds.includes(message.entryId) ? (
    <ChatSystemEntry
      icon={{name: 'download'}}
      testID="ChatEntryTranscriptEntry"
      text={'Chat gedownload'}
      timestamp={message.timestamp}
    />
  ) : null
}
