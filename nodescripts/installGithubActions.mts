import {exec as execCb} from 'node:child_process'
import {renameSync} from 'node:fs'
import {promisify} from 'node:util'

const exec = promisify(execCb)

type PackageLock = {
  dependencies: Dependencies
  name: string
  version: string
}

type Dependencies = {
  [key: string]: {
    overridden: boolean
    resolved: string
    version?: string
  }
}

const npmLsOutput = JSON.parse(
  (await exec('npm ls --json --package-lock-only')).stdout,
) as PackageLock

const actionDependencies = Object.entries(npmLsOutput.dependencies ?? {})
  .filter(
    ([name, dependencyDetails]) =>
      name.startsWith('@actions/') &&
      typeof dependencyDetails === 'object' &&
      typeof dependencyDetails?.version === 'string' &&
      dependencyDetails.version.length > 0,
  )
  .map(([name, dependencyDetails]) => `${name}@${dependencyDetails.version}`)

if (actionDependencies.length > 0) {
  console.log(
    `Installing GitHub Actions dependencies: ${actionDependencies.join(', ')}`,
  )
  renameSync('package.json', 'package.json.temp')
  await exec(
    `npm install --no-save --no-package-lock --ignore-scripts --install-strategy=shallow ${actionDependencies.join(' ')}`,
  )
  renameSync('package.json.temp', 'package.json')
}
