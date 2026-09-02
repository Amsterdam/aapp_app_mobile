/* eslint-disable no-process-env */
import {execFileSync} from 'node:child_process'
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import path from 'node:path'
import {pathToFileURL} from 'node:url'
import {loadConfig} from './config.mts'

const originalArguments = [...process.argv]
const originalWorkingDirectory = process.cwd()
// oxlint-disable-next-line typescript/no-unsafe-assignment
const originalPrLabelConfig = process.env.PR_LABEL_CONFIG
const temporaryDirectories: string[] = []
const configModuleUrl = pathToFileURL(
  path.join(originalWorkingDirectory, 'nodescripts/pr-label/utils/config.mts'),
).href

const createTemporaryDirectory = (): string => {
  const temporaryDirectory = mkdtempSync(
    path.join(tmpdir(), 'pr-label-config-'),
  )

  temporaryDirectories.push(temporaryDirectory)

  return temporaryDirectory
}

const writeConfigFile = (
  temporaryDirectory: string,
  fileName: string,
  content: string,
): string => {
  const filePath = path.join(temporaryDirectory, fileName)

  writeFileSync(filePath, content)

  return filePath
}

const loadConfigFromDirectory = async ({
  argumentsOverride,
  prLabelConfig,
  workingDirectory,
}: {
  argumentsOverride?: string[]
  prLabelConfig?: string
  workingDirectory: string
}): Promise<Awaited<ReturnType<typeof loadConfig>>> => {
  process.chdir(workingDirectory)
  process.argv = argumentsOverride ?? [
    'node',
    'nodescripts/pr-label/pr-label.mts',
  ]

  if (prLabelConfig === undefined) {
    delete process.env.PR_LABEL_CONFIG
  } else {
    process.env.PR_LABEL_CONFIG = prLabelConfig
  }

  return loadConfig()
}

const loadConfigInNodeProcess = ({
  argumentsOverride,
  prLabelConfig,
  workingDirectory,
}: {
  argumentsOverride?: string[]
  prLabelConfig?: string
  workingDirectory: string
}): Awaited<ReturnType<typeof loadConfig>> => {
  const environment = {...process.env}

  if (prLabelConfig === undefined) {
    delete environment.PR_LABEL_CONFIG
  } else {
    environment.PR_LABEL_CONFIG = prLabelConfig
  }

  const stdout = execFileSync(
    // eslint-disable-next-line sonarjs/no-os-command-from-path
    'node',
    [
      '--input-type=module',
      '--eval',
      `import {loadConfig} from ${JSON.stringify(configModuleUrl)}; const config = await loadConfig(); process.stdout.write(JSON.stringify(config));`,
      ...(argumentsOverride ?? []),
    ],
    {
      cwd: workingDirectory,
      encoding: 'utf8',
      env: environment,
    },
  )

  return JSON.parse(stdout) as Awaited<ReturnType<typeof loadConfig>>
}

describe('loadConfig', () => {
  afterEach(() => {
    process.argv = [...originalArguments]
    process.chdir(originalWorkingDirectory)

    if (originalPrLabelConfig === undefined) {
      delete process.env.PR_LABEL_CONFIG
    } else {
      // oxlint-disable-next-line typescript/no-unsafe-assignment
      process.env.PR_LABEL_CONFIG = originalPrLabelConfig
    }

    for (const temporaryDirectory of temporaryDirectories.splice(0)) {
      rmSync(temporaryDirectory, {force: true, recursive: true})
    }
  })

  it('prefers the CLI config path over environment and discovered files', async () => {
    const temporaryDirectory = createTemporaryDirectory()

    writeConfigFile(
      temporaryDirectory,
      'pr-label.config.json',
      JSON.stringify({copilotReadyLabel: 'discovered'}),
    )
    writeConfigFile(
      temporaryDirectory,
      'environment.json',
      JSON.stringify({copilotReadyLabel: 'environment'}),
    )
    writeConfigFile(
      temporaryDirectory,
      'cli.json',
      JSON.stringify({copilotReadyLabel: 'cli'}),
    )

    const config = await loadConfigFromDirectory({
      workingDirectory: temporaryDirectory,
      prLabelConfig: 'environment.json',
      argumentsOverride: [
        'node',
        'nodescripts/pr-label/pr-label.mts',
        '--config',
        'cli.json',
      ],
    })

    expect(config.copilotReadyLabel).toBe('cli')
  })

  it('prefers the environment config path over discovered files when no CLI flag is set', async () => {
    const temporaryDirectory = createTemporaryDirectory()

    writeConfigFile(
      temporaryDirectory,
      'pr-label.config.json',
      JSON.stringify({copilotReadyLabel: 'discovered'}),
    )
    writeConfigFile(
      temporaryDirectory,
      'environment.json',
      JSON.stringify({copilotReadyLabel: 'environment'}),
    )

    const config = await loadConfigFromDirectory({
      workingDirectory: temporaryDirectory,
      prLabelConfig: 'environment.json',
    })

    expect(config.copilotReadyLabel).toBe('environment')
  })

  it('uses the first discovered candidate path when no CLI flag or environment variable is set', async () => {
    const temporaryDirectory = createTemporaryDirectory()

    writeConfigFile(
      temporaryDirectory,
      '.pr-labelrc.json',
      JSON.stringify({copilotReadyLabel: 'secondary candidate'}),
    )
    writeConfigFile(
      temporaryDirectory,
      'pr-label.config.json',
      JSON.stringify({copilotReadyLabel: 'primary candidate'}),
    )

    const config = await loadConfigFromDirectory({
      workingDirectory: temporaryDirectory,
    })

    expect(config.copilotReadyLabel).toBe('primary candidate')
  })

  it('parses JSON config files and merges them with defaults', async () => {
    const temporaryDirectory = createTemporaryDirectory()

    writeConfigFile(
      temporaryDirectory,
      'pr-label.config.json',
      JSON.stringify({
        codeReviewedEnabled: false,
        reviewerUsernames: ['reviewer-one'],
      }),
    )

    const config = await loadConfigFromDirectory({
      workingDirectory: temporaryDirectory,
    })

    expect(config.codeReviewedEnabled).toBe(false)
    expect(config.reviewerUsernames).toEqual(['reviewer-one'])
    expect(config.copilotReadyEnabled).toBe(true)
    expect(config.codeReviewedLabel).toBe('Code reviewed')
    expect(config.labels['^android/']).toEqual({
      color: '#036d66',
      description: 'Android related',
      name: 'android',
    })
  })

  it.each([
    {
      description: 'default export',
      fileContents:
        "export default {codeReviewedLabel: 'Default export label'}\n",
      expectedLabel: 'Default export label',
      fileName: 'config-default.mjs',
    },
    {
      description: 'named config export',
      fileContents:
        "export const config = {codeReviewedLabel: 'Named export label'}\n",
      expectedLabel: 'Named export label',
      fileName: 'config-named.mjs',
    },
  ])(
    'loads module configs from a $description',
    ({expectedLabel, fileContents, fileName}) => {
      const temporaryDirectory = createTemporaryDirectory()

      writeConfigFile(temporaryDirectory, fileName, fileContents)

      const config = loadConfigInNodeProcess({
        workingDirectory: temporaryDirectory,
        prLabelConfig: fileName,
      })

      expect(config.codeReviewedLabel).toBe(expectedLabel)
      expect(config.copilotReadyLabel).toBe('Copilot ready')
    },
  )

  it('returns the default config when no config file is present', async () => {
    const temporaryDirectory = createTemporaryDirectory()

    const config = await loadConfigFromDirectory({
      workingDirectory: temporaryDirectory,
    })

    expect(config).toMatchObject({
      codeReviewedColor: '#05b103',
      codeReviewedEnabled: true,
      codeReviewedLabel: 'Code reviewed',
      copilotReadyColor: '#05b103',
      copilotReadyEnabled: true,
      copilotReadyLabel: 'Copilot ready',
      prDescriptionCopilotSectionAfter: '## Test instructions',
      prDescriptionCopilotSectionBefore: '# Changes',
      prDescriptionUpdateEnabled: true,
      reviewerUsernames: [],
    })
    expect(config.copilotLogins).toEqual(['github-copilot[bot]'])
    expect(config.labels['^ios/(?!Podfile.lock$)']).toEqual({
      color: '#036d66',
      description: 'iOS related',
      name: 'ios',
    })
  })
})
