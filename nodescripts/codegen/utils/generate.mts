import type {CodeGenConfigItem} from '../types.mts'
import {generateCopyOutput} from './generateCopyOutput.mts'
import {generateDirectoriesOutput} from './generateDirectoriesOutput.mts'
import {generateImportsOutput} from './generateImportsOutput.mts'

export const generate = (configItem: CodeGenConfigItem) => {
  if (configItem.type === 'directories') {
    generateDirectoriesOutput(configItem)

    return
  } else if (configItem.type === 'copy') {
    generateCopyOutput(configItem)

    return
  }

  generateImportsOutput(configItem)
}
