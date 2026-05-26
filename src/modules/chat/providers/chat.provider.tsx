import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {useCreateChat} from 'react-native-salesforce-messaging-in-app/src'
import {
  ConversationEntryFormat,
  RetrieveTranscriptResponse,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useCoreConfig} from '@/modules/chat/hooks/useCoreConfig'
import {useIsChatEnded} from '@/modules/chat/hooks/useIsChatEnded'
import {useMarkAsRead} from '@/modules/chat/hooks/useMarkAsRead'
import {useSubmitRemoteConfiguration} from '@/modules/chat/hooks/useSubmitRemoteConfiguration'
import {ChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {filterOutDeliveryAcknowledgements} from '@/modules/chat/utils/filterOutDeliveryAcknowledgements'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'

type Props = {
  children: ReactNode
}

export const ChatProvider = ({children}: Props) => {
  const {isMaximized, isMinimized} = useChat()
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [newMessagesCount, setNewMessagesCount] = useState(0)
  const [downloadedTranscriptIds, setDownloadedTranscriptIds] = useState<
    RetrieveTranscriptResponse['entryId'][]
  >([])
  const coreConfig = useCoreConfig()
  const {
    messages,
    isTyping,
    conversationId: newConversationId,
    ready,
    agentInChat,
    remoteConfiguration,
    connectionStatus,
    isWaitingForAgent,
    sessionStatus,
  } = useCreateChat({
    ...coreConfig,
    conversationId,
  })
  const isEnded = useIsChatEnded(isWaitingForAgent, agentInChat, sessionStatus)

  const addDownloadedTranscriptId = useCallback((transcriptId: string) => {
    setDownloadedTranscriptIds(ids => [...ids, transcriptId])
  }, [])

  useEffect(() => {
    if (isMinimized && isNewMessage(messages[messages.length - 1]?.format)) {
      setNewMessagesCount(count => count + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])

  useEffect(() => {
    if (isMaximized) {
      setNewMessagesCount(0)
    }
  }, [isMaximized])
  useEffect(() => {
    setConversationId(newConversationId ?? conversationId)
  }, [conversationId, newConversationId, setConversationId])

  useMarkAsRead(messages)

  useSubmitRemoteConfiguration(remoteConfiguration)

  const value = useMemo(() => {
    const filteredMessages = filterOutDeliveryAcknowledgements(messages)

    const preparedMessages =
      isTyping && !isEnded ? [...filteredMessages, isTyping] : filteredMessages

    return {
      addDownloadedTranscriptId,
      agentInChat,
      connectionStatus,
      downloadedTranscriptIds,
      isEnded,
      isWaitingForAgent,
      messages: preparedMessages,
      newMessagesCount,
      ready:
        ready &&
        (!!isTyping ||
          messages.some(
            message => message.format === ConversationEntryFormat.text,
          )),
      remoteConfiguration,
      sessionStatus,
    }
  }, [
    addDownloadedTranscriptId,
    agentInChat,
    connectionStatus,
    downloadedTranscriptIds,
    isEnded,
    isWaitingForAgent,
    isTyping,
    messages,
    newMessagesCount,
    ready,
    remoteConfiguration,
    sessionStatus,
  ])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
