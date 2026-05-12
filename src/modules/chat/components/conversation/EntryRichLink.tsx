import {useCallback} from 'react'
import {
  ConversationEntryRichLink,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Phrase} from '@/components/ui/text/Phrase'
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
      <PressableBase /* TODO: replace this by InlineLink once https://github.com/facebook/react-native/issues/48387 is fixed. */
        onPressOut={onPress}
        testID="ChatMessageRichLinkTitleLink">
        <Phrase
          color={
            message.sender.role === ConversationEntrySenderRole.user
              ? 'inverse'
              : 'link'
          }
          emphasis="strong"
          testID="ChatMessageRichLinkTitle"
          underline>
          {title}
        </Phrase>
      </PressableBase>
      {!!domain && (
        <PressableBase
          onPressOut={onPress}
          testID="ChatMessageRichLinkUrlLink">
          <Phrase
            color={
              message.sender.role === ConversationEntrySenderRole.user
                ? 'inverse'
                : 'link'
            }
            testID="ChatMessageRichLinkUrlPhrase"
            underline>
            {domain}
          </Phrase>
        </PressableBase>
      )}
    </ChatMessageEntry>
  )
}
