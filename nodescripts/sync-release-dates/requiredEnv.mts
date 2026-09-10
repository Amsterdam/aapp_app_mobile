import {env} from 'node:process'

export const requiredEnv = (name: string): string => {
  // oxlint-disable-next-line typescript/no-unsafe-assignment
  const value = env[name]

  if (!value || typeof value !== 'string') {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}
