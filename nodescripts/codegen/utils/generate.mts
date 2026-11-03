import type {CodeGenConfigItem} from '../types.mts'
import {generateCopyOutput} from './generateCopyOutput.mts'
import {generateDirectoriesOutput} from './generateDirectoriesOutput.mts'
import {generateImportsOutput} from './generateImportsOutput.mts'

export const generate = (configItem: CodeGenConfigItem) => {
  if (configItem.type === 'directories') {
    return generateDirectoriesOutput(configItem)
  } else if (configItem.type === 'copy') {
    return generateCopyOutput(configItem)
  }

  return generateImportsOutput(configItem)
}
