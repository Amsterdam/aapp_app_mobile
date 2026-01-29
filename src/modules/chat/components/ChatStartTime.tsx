import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  firstMessage?: ConversationEntry
}

export const ChatStartTime = ({firstMessage}: Props) => (
  <ChatSystemEntry
    icon={{name: 'speech-balloon-ellipsis'}}
    testID="ChatStartingTimeEntry"
    text="Chat gestart"
    timestamp={firstMessage?.timestamp ?? dayjs().unix()}
  />
)
