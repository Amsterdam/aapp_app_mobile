import {
  ConversationEntrySenderRole,
  ParticipantChangedOperationType,
  ConversationEntryParticipantChanged,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatSystemEntry} from '@/modules/chat/components/ChatSystemEntry'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'

type Props = {
  isLastOfGroup: boolean
  message: ConversationEntryParticipantChanged
}

const hasDisplayname = (displayName: string | undefined) =>
  !!displayName && displayName !== 'User'

export const EntryParticipantChanged = ({message, isLastOfGroup}: Props) => {
  const joiningAgents = message.operations.find(
    operation =>
      operation.type === ParticipantChangedOperationType.add &&
      operation.participant.role === ConversationEntrySenderRole.agent,
  )

  const leavingAgents = message.operations.find(
    operation =>
      operation.type === ParticipantChangedOperationType.remove &&
      operation.participant.role === ConversationEntrySenderRole.agent,
  )

  if (!joiningAgents && !leavingAgents) {
    return null
  }

  const displayName = joiningAgents
    ? joiningAgents.participant.displayName
    : leavingAgents?.participant.displayName

  return (
    <>
      <ChatSystemEntry
        icon={{isFilled: true, name: 'person'}}
        testID={`ChatSystemMessage${message.format}Entry`}
        text={
          joiningAgents
            ? `U chat nu met ${hasDisplayname(displayName) ? displayName : 'een medewerker'}`
            : `${hasDisplayname(displayName) ? displayName : 'Medewerker'} heeft het gesprek verlaten`
        }
        timestamp={message.timestamp}
      />
      <EntryGutter isLastOfGroup={isLastOfGroup} />
    </>
  )
}
