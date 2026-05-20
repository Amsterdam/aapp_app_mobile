import {createContext, useContext} from 'react'
import {
  RetrieveTranscriptResponse,
  ConnectionState,
  ConversationEntry,
  RemoteConfiguration,
  SessionStatus,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

type ChatContextType = {
  addDownloadedTranscriptId: (
    entryId: RetrieveTranscriptResponse['entryId'],
  ) => void
  agentInChat: boolean
  connectionStatus: ConnectionState | null
  downloadedTranscriptIds: RetrieveTranscriptResponse['entryId'][]
  isEnded: boolean
  isWaitingForAgent: boolean
  messages: ConversationEntry[]
  newMessagesCount: number
  ready: boolean
  remoteConfiguration: RemoteConfiguration | undefined
  sessionStatus: SessionStatus
}

const initialValue: ChatContextType = {
  addDownloadedTranscriptId: () => null,
  agentInChat: false,
  downloadedTranscriptIds: [],
  connectionStatus: null,
  isEnded: false,
  isWaitingForAgent: false,
  messages: [],
  newMessagesCount: 0,
  ready: false,
  remoteConfiguration: undefined,
  sessionStatus: SessionStatus.unknown,
}

export const ChatContext = createContext<ChatContextType>(initialValue)

export const useChatContext = () => useContext(ChatContext)
