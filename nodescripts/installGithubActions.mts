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

// get the dependencies from the package-lock.json file
const npmLsOutput = JSON.parse(
  (await exec('npm ls --json --package-lock-only')).stdout,
) as PackageLock

// filter the dependencies to only include those that start with @actions/ and have a version
const actionDependencies = Object.entries(npmLsOutput.dependencies ?? {})
  .filter(
    ([name, dependencyDetails]) =>
      name.startsWith('@actions/') &&
      typeof dependencyDetails === 'object' &&
      typeof dependencyDetails?.version === 'string' &&
      dependencyDetails.version.length > 0,
  )
  .map(([name, dependencyDetails]) => `${name}@${dependencyDetails.version}`)

// if there are any action dependencies, install them without saving to package.json or package-lock.json
if (actionDependencies.length > 0) {
  console.log(
    `Installing GitHub Actions dependencies: ${actionDependencies.join(', ')}`,
  )
  // rename package.json to package.json.temp to avoid npm from installing all dependencies from package.json
  renameSync('package.json', 'package.json.temp')
  await exec(
    `npm install --no-save --no-package-lock --ignore-scripts --install-strategy=shallow ${actionDependencies.join(' ')}`,
  )
  // restore package.json
  renameSync('package.json.temp', 'package.json')
}
