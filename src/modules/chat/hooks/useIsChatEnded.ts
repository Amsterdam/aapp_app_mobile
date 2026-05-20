import {useState, useEffect} from 'react'
import {SessionStatus} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

/**
 * Function to check if the chat is ended or not
 * How it works:
 * It checks whether the last received message (excluding Transcript entries) is of format RoutingWorkResult
 * If that is the case, and the workType is 'closed' and we are not waiting for an agent, then the chat is ended
 *
 * If above condition is false, it will check whether an agent was in the chat and has since left and no agents remain.
 *
 * This function should preferably be replaced by a reliable isEnded value that is provided by Salesforce
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
