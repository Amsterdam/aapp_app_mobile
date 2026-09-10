import type {EnvironmentSubDomain} from './types.mts'

export const MAX_SUPPORTED_VERSIONS = 3
export const RELEASE_VERSION_PATTERN = /^\d+\.\d+\.\d+$/

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const WEEK = 7 * DAY

export const ENVIRONMENTS: EnvironmentSubDomain[] = [
  'ontw',
  'test',
  'acc',
  'prod',
]
