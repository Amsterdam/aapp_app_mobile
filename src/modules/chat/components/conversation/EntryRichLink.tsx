import {useCallback} from 'react'
import {
  ConversationEntryRichLink,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {getDomainName} from '@/utils/getDomainName'

type Props = {
  message: ConversationEntryRichLink
}

export const EntryRichLink = ({message}: Props) => {
  const openUrl = useOpenUrl()
  const {title, url} = message
  const domain = getDomainName(url)

  const onPress = useCallback(() => {
    if (url) {
      openUrl(url, false)
    }
  }, [openUrl, url])

  return (
    <ChatMessageEntry message={message}>
      <PressableBase /* Added because of https://github.com/facebook/react-native/issues/48387. */
        onPressOut={onPress}
        testID="ChatMessageRichLinkTitleLink">
        <InlineLink
          isInverse={message.sender.role === ConversationEntrySenderRole.user}
          onPress={onPress}
          testID="ChatMessageRichLinkTitle"
          variant="external">
          {title}
        </InlineLink>
      </PressableBase>
      {!!domain && (
        <PressableBase
          onPressOut={onPress}
          testID="ChatMessageRichLinkUrlLink">
          <InlineLink
            isInverse={message.sender.role === ConversationEntrySenderRole.user}
            onPress={onPress}
            testID="ChatMessageRichLinkUrlPhrase"
            variant="external">
            {domain}
          </InlineLink>
        </PressableBase>
      )}
    </ChatMessageEntry>
  )
}
