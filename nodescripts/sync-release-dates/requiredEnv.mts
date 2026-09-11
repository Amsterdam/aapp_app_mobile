import {env} from 'node:process'

export const requiredEnv = (name: string, pattern?: RegExp): string => {
  // oxlint-disable-next-line typescript/no-unsafe-assignment
  const value = env[name]

  if (!value || typeof value !== 'string') {
    throw new Error(`Missing environment variable: ${name}`)
  }

  if (pattern && !pattern?.test(value)) {
    throw new Error(`${name} is not a valid value`)
  }

  return value
}
