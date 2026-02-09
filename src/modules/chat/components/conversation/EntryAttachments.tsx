import {
  type ConversationEntryAttachments,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {ChatMessageEntry} from '@/modules/chat/components/ChatMessageEntry'
import {ChatMessageImage} from '@/modules/chat/components/ChatMessageImage'
import {MessagePhrase} from '@/modules/chat/components/MessagePhrase'
import {saveFile} from '@/utils/saveFile'

type Props = {
  message: ConversationEntryAttachments
}

export const EntryAttachments = ({message}: Props) => {
  const isImage = message.attachments[0].mimeType.startsWith('image')
  const isAgent = message.sender.role === ConversationEntrySenderRole.agent

  const isUser = message.sender.role === ConversationEntrySenderRole.user

  return (
    <>
      {message.attachments.map(attachment =>
        isImage ? (
          <ChatMessageEntry
            isText={!!message.text}
            key={attachment.id}
            message={message}>
            <ChatMessageImage
              image={attachment}
              message={message}
            />
            {!!message.text && (
              <MessagePhrase
                accessibilityLabel={
                  isUser
                    ? `Uw bericht: ${message.text}`
                    : `${message.text} ontvangen van ${message.senderDisplayName}`
                }
                message={message}
                testID="ChatEntryText">
                {message.text}
              </MessagePhrase>
            )}
          </ChatMessageEntry>
        ) : (
          <ChatMessageEntry
            key={attachment.id}
            message={message}>
            <Row
              grow={1}
              gutter="sm">
              <Icon
                color={isAgent ? 'link' : 'inverse'}
                name="document"
                size="lg"
                testID="EntryAttachmentsIcon"
              />
              {isAgent ? (
                <InlineLink
                  accessibilityLabel={`Bijlage gedeeld door ${message.senderDisplayName}. Dubbeltik om bijlage te downloaden.`}
                  ellipsizeMode="middle"
                  emphasis="strong"
                  isInverse={isUser}
                  numberOfLines={1}
                  onPress={() => {
                    void saveFile({
                      downloadUri: attachment.url,
                      fileName: attachment.name,
                    })
                  }}
                  testID="ChatEntryAttachmentsInlineLink">
                  {attachment.name}
                </InlineLink>
              ) : (
                <Phrase
                  color="inverse"
                  testID="ChatEntryAttachmentFileNamePhrase"
                  textAlign="center">
                  {attachment.name}
                </Phrase>
              )}
            </Row>
            {!!message.text && (
              <MessagePhrase
                accessibilityLabel={
                  isUser
                    ? `Uw bericht: ${message.text}`
                    : `${message.text} ontvangen van ${message.senderDisplayName}`
                }
                message={message}
                testID="ChatEntryText">
                {message.text}
              </MessagePhrase>
            )}
          </ChatMessageEntry>
        ),
      )}
    </>
  )
}
