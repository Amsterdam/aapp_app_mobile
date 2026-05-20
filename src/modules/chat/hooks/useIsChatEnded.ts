import {useState, useEffect} from 'react'
import {SessionStatus} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

/**
 * Function to check if the chat is ended or not
 * How it works:
 * It checks whether we are waiting for an agent and if the sessionStatus is "Ended".
 */
const isChatEnded = (
  isWaitingForAgent: boolean,
  agentEnteredChat: boolean,
  agentInChat: boolean,
  sessionStatus?: SessionStatus,
): boolean =>
  sessionStatus === SessionStatus.ended &&
  (!isWaitingForAgent || (agentEnteredChat && !agentInChat))

export const useIsChatEnded = (
  isWaitingForAgent: boolean,
  agentInChat: boolean,
  sessionStatus?: SessionStatus,
): boolean => {
  const [agentEnteredChat, setAgentEnteredChat] = useState(agentInChat)

  useEffect(() => {
    if (agentInChat) {
      setAgentEnteredChat(true)
    }
  }, [agentInChat])

  return isChatEnded(
    isWaitingForAgent,
    agentEnteredChat,
    agentInChat,
    sessionStatus,
  )
}
