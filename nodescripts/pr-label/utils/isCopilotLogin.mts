import {COPILOT_LOGINS} from '../constants.mts'

export const isCopilotLogin = (login: string | null | undefined): boolean => {
  if (!login) {
    return false
  }

  const normalized = login.toLowerCase()

  return (
    COPILOT_LOGINS.has(normalized) ||
    normalized.includes('copilot') ||
    normalized === 'copilot'
  )
}
