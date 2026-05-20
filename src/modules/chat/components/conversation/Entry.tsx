import {FC} from 'react'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {
  ConversationEntry,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {EntryAttachments} from '@/modules/chat/components/conversation/EntryAttachments'
import {EntryChoices} from '@/modules/chat/components/conversation/EntryChoices'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {EntryParticipantChanged} from '@/modules/chat/components/conversation/EntryParticipantChanged'
import {EntryRichLink} from '@/modules/chat/components/conversation/EntryRichLink'
import {EntryRoutingResult} from '@/modules/chat/components/conversation/EntryRoutingResult'
import {EntryRoutingWorkResult} from '@/modules/chat/components/conversation/EntryRoutingWorkResult'
import {EntrySelections} from '@/modules/chat/components/conversation/EntrySelections'
import {EntryText} from '@/modules/chat/components/conversation/EntryText'
import {EntryTranscript} from '@/modules/chat/components/conversation/EntryTranscript'
import {EntryTypingIndicator} from '@/modules/chat/components/conversation/EntryTypingIndicator'

type Props = {
  isLast: boolean
  isLastOfGroup: boolean
  message: ConversationEntry
}

const options: Record<
  ConversationEntryFormat,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: FC<{isLast: boolean; isLastOfGroup: boolean; message: any}>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LastComponent?: FC<{isLast: boolean; isLastOfGroup: boolean; message: any}>
    agentInfo?: boolean
  }
> = {
  [ConversationEntryFormat.selections]: {
    Component: EntrySelections,
    agentInfo: true,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.text]: {
    Component: EntryText,
    agentInfo: true,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.message]: {
    Component: EntryText,
    agentInfo: true,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.attachments]: {
    Component: EntryAttachments,
    agentInfo: false,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.carousel]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.deliveryAcknowledgement]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.imageMessage]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.inputs]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.listPicker]: {
    Component: EntryText,
    LastComponent: EntryChoices,
    agentInfo: true,
  },
  [ConversationEntryFormat.participantChanged]: {
    Component: EntryParticipantChanged,
    agentInfo: false,
  },
  [ConversationEntryFormat.quickReplies]: {
    Component: EntryText,
    LastComponent: EntryChoices,
    agentInfo: true,
  },
  [ConversationEntryFormat.readAcknowledgement]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.result]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.richLink]: {
    Component: EntryRichLink,
    agentInfo: true,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.routingResult]: {
    Component: EntryRoutingResult,
    agentInfo: false,
  },
  [ConversationEntryFormat.routingWorkResult]: {
    Component: EntryRoutingWorkResult,
    agentInfo: false,
  },
  [ConversationEntryFormat.typingIndicator]: {
    Component: EntryTypingIndicator,
    agentInfo: false,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.typingStartedIndicator]: {
    Component: EntryTypingIndicator,
    agentInfo: false,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.typingStoppedIndicator]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.unspecified]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.unknownEntry]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.webview]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.transcript]: {
    Component: EntryTranscript,
    LastComponent: EntryGutter,
  },
  [ConversationEntryFormat.sessionStatusChanged]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
}

export const Entry = ({message, isLast, isLastOfGroup}: Props) => {
  const result = options[message.format]

  if (!result) {
    return null
  }

  const {Component, agentInfo, LastComponent} = result

  if (!Component && !LastComponent && !agentInfo) {
    return null
  }

  return (
    <Animated.View entering={SlideInDown}>
      {!!Component && (
        <Component
          isLast={isLast}
          isLastOfGroup={isLastOfGroup}
          message={message}
        />
      )}
      {!!agentInfo && (
        <ChatAgentInfo
          isLast={isLast}
          isLastOfGroup={isLastOfGroup}
          message={message}
        />
      )}
      {!!LastComponent && (
        <LastComponent
          isLast={isLast}
          isLastOfGroup={isLastOfGroup}
          message={message}
        />
      )}
    </Animated.View>
  )
}
