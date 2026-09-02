import type {PackageConfig} from './config.mts'

export const isCopilotLogin = (
  login: string | null | undefined,
  config: Required<PackageConfig>,
): boolean => {
  if (!login) {
    return false
  }

  const normalized = login.toLowerCase()

  return (
    config.copilotLogins.includes(normalized) ||
    normalized.includes('copilot') ||
    normalized === 'copilot'
  )
}
