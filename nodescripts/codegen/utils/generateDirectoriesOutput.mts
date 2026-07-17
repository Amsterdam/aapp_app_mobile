import fs from 'node:fs'
import path from 'node:path'
import {getRootDirectories} from './getRootDirectories.mts'
import type {CodeGenConfigItem} from '../types.mts'

export const generateDirectoriesOutput = ({
  inputDir,
  output,
  excludeDirectories = [],
  result,
}: Extract<CodeGenConfigItem, {type: 'directories'}>) => {
  const directories = getRootDirectories(inputDir)
    .filter(directory => !excludeDirectories.includes(directory.name))
    .sort((left, right) => left.name.localeCompare(right.name))

  const outputPath = path.resolve(output)
  const outputDir = path.dirname(outputPath)

  fs.mkdirSync(outputDir, {recursive: true})
  fs.writeFileSync(outputPath, result(directories))
}
