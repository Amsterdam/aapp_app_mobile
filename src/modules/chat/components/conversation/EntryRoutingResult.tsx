import {
  ConversationEntryFormat,
  ConversationEntryRoutingResult,
  ConversationEntryRoutingType,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {getWaitingTimePhrase} from '@/modules/chat/utils/getWaitingTimePhrase'

type Props = {
  isLastOfGroup: boolean
  message: ConversationEntryRoutingResult
}

export const EntryRoutingResult = ({message, isLastOfGroup}: Props) => {
  const {isEWTAvailable, estimatedWaitTime, routingType} = message
  const {isWaitingForAgent, messages} = useChatContext()

  const messagesAfterCurrent = messages.slice(messages.indexOf(message) + 1)
  const hasTextMessageAfterCurrentMessage =
    messagesAfterCurrent.filter(m => m.format === ConversationEntryFormat.text)
      .length > 0

  if (
    routingType !== ConversationEntryRoutingType.transfer ||
    !isWaitingForAgent ||
    hasTextMessageAfterCurrentMessage
  ) {
    return null
  }

  return (
    <>
      <Column
        gutter="sm"
        halign="center">
        <LoadingDots
          dotActiveSize={15}
          dotInactiveSize={12}
        />
        <Phrase
          emphasis="strong"
          testID="ChatEntryRoutingResultPhrase">
          Een medewerker neemt het gesprek over.
        </Phrase>
        {!!isEWTAvailable && (
          <Phrase testID="ChatEntryRoutingResultEstimatedWaitingTimePhrase">
            Geschatte wachttijd: {getWaitingTimePhrase(estimatedWaitTime)}
          </Phrase>
        )}
      </Column>
      <EntryGutter isLastOfGroup={isLastOfGroup} />
    </>
  )
}
