/* eslint-disable no-process-env */
import {existsSync, readFileSync} from 'node:fs'
import path from 'node:path'
import type {Label} from './types'

export type PackageConfig = {
  /**
   * Hex color used when creating or updating the label that marks a pull request as code reviewed.
   * @type {string}
   * @default '#05b103'
   */
  codeReviewedColor?: string
  /**
   * Enables automatic creation and maintenance of the code reviewed label on pull requests.
   * @type {boolean}
   * @default true
   */
  codeReviewedEnabled?: boolean
  /**
   * Label name used to mark pull requests that have completed human code review.
   * @type {string}
   * @default 'Code reviewed'
   */
  codeReviewedLabel?: string
  /**
   * GitHub login names that should be treated as Copilot accounts when detecting Copilot-authored review activity.
   * @type {string[]}
   * @default ['github-copilot[bot]']
   */
  copilotLogins?: string[]
  /**
   * Hex color used when creating or updating the label that marks a pull request as ready for Copilot.
   * @type {string}
   * @default '#05b103'
   */
  copilotReadyColor?: string
  /**
   * Enables automatic creation and maintenance of the Copilot ready label on pull requests.
   * @type {boolean}
   * @default true
   */
  copilotReadyEnabled?: boolean
  /**
   * Label name used to mark pull requests that are ready for Copilot processing or review.
   * @type {string}
   * @default 'Copilot ready'
   */
  copilotReadyLabel?: string
  /**
   * Maps file path match patterns to label definitions so changed files can automatically add domain-specific pull request labels.
   * @type {Record<string, Label>}
   * @default built-in mapping for pipelines, dependencies, android, ios, and module paths
   */
  labels?: Record<string, Label>
  /**
   * Heading after the Copilot-managed pull request description section; content is inserted before this heading.
   * @type {string}
   * @default '## Test instructions'
   */
  prDescriptionCopilotSectionAfter?: string
  /**
   * Heading before the Copilot-managed pull request description section; content is inserted after this heading.
   * @type {string}
   * @default '# Changes'
   */
  prDescriptionCopilotSectionBefore?: string
  /**
   * Enables automatic updates to the pull request description text managed by this script.
   * @type {boolean}
   * @default true
   */
  prDescriptionUpdateEnabled?: boolean
  /**
   * GitHub usernames that should be treated as reviewers when determining review-related label updates.
   * @type {string[]}
   * @default []
   */
  reviewerUsernames?: string[]
}

const defaultConfig: Required<PackageConfig> = {
  copilotReadyLabel: 'Copilot ready',
  copilotReadyColor: '#05b103',
  copilotReadyEnabled: true,
  codeReviewedLabel: 'Code reviewed',
  codeReviewedColor: '#05b103',
  codeReviewedEnabled: true,
  prDescriptionUpdateEnabled: true,
  prDescriptionCopilotSectionBefore: '# Changes',
  prDescriptionCopilotSectionAfter: '## Test instructions',
  copilotLogins: ['github-copilot[bot]'],
  reviewerUsernames: [],
  labels: {
    '^(?:pipelines/|\\.github/(?:workflows|actions)/)': {
      name: 'pipelines',
      color: '#036d66',
      description: 'Pipeline related',
    },
    '^(?:package-lock\\.json|ios/Podfile\\.lock|Gemfile(?:\\.lock)?)$': {
      name: 'dependencies',
      color: '#634991',
      description: 'Dependency related',
    },
    '^android/': {
      name: 'android',
      color: '#036d66',
      description: 'Android related',
    },
    '^ios/(?!Podfile.lock$)': {
      name: 'ios',
      color: '#036d66',
      description: 'iOS related',
    },
    '^src/modules/([^/]+)//': {
      name: 'module:$1',
      color: '#0366d6',
      description: 'Module $1 related',
    },
  },
}

const candidatePaths = [
  'pr-label.config.json',
  '.pr-labelrc.json',
  'pr-label.config.mts',
  'pr-label.config.cts',
  'pr-label.config.ts',
  'pr-label.config.mjs',
  'pr-label.config.cjs',
  'pr-label.config.js',
]

const parseConfigPathArgument = (argv: string[]): string | undefined => {
  const configFlagIndex = argv.indexOf('--config')

  if (configFlagIndex === -1) {
    return undefined
  }

  return argv[configFlagIndex + 1]
}

const resolveConfigPath = (): string | undefined => {
  const explicitConfigPath = parseConfigPathArgument(process.argv)

  if (explicitConfigPath) {
    return path.resolve(process.cwd(), explicitConfigPath)
  }

  const envConfigPath = (process.env as {PR_LABEL_CONFIG?: string})
    .PR_LABEL_CONFIG

  if (envConfigPath) {
    return path.resolve(process.cwd(), envConfigPath)
  }

  for (const candidatePath of candidatePaths) {
    const absolutePath = path.join(process.cwd(), candidatePath)

    if (existsSync(absolutePath)) {
      return absolutePath
    }
  }

  return undefined
}

const getConfig = async (): Promise<PackageConfig> => {
  const configPath = resolveConfigPath()

  if (!configPath) {
    return {}
  }

  if (configPath.endsWith('.json')) {
    const fileContents = readFileSync(configPath, 'utf8')
    const parsedConfig = JSON.parse(fileContents) as PackageConfig

    return parsedConfig
  }

  const configModule = (await import(configPath)) as
    | {default: PackageConfig}
    | {config: PackageConfig}
    | PackageConfig

  return 'default' in configModule
    ? configModule.default
    : 'config' in configModule
      ? configModule.config
      : configModule
}

export const loadConfig = async (): Promise<Required<PackageConfig>> => {
  const config = await getConfig()

  return {
    ...defaultConfig,
    ...config,
  }
}
