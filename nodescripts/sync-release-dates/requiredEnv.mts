import {env} from 'node:process'
import type {STORE_RELEASE_VERSION_ENV_IDS} from './constants.mts'

type EnvironmentVariables =
  | 'DRY_RUN'
  | (typeof STORE_RELEASE_VERSION_ENV_IDS)[number]
  | `INTERNAL_API_KEY_${string}`

export const requiredEnv = (
  name: EnvironmentVariables,
  pattern?: RegExp,
): string => {
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

export const requiredEnvs = (
  names: EnvironmentVariables[],
  pattern?: RegExp | RegExp[],
): string[] =>
  names.map((name, index) =>
    requiredEnv(name, Array.isArray(pattern) ? pattern[index] : pattern),
  )
