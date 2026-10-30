import type {CodeGenConfigItem} from '../types.mts'
import {generateDirectoriesOutput} from './generateDirectoriesOutput.mts'
import {generateImportsOutput} from './generateImportsOutput.mts'

export const generate = (configItem: CodeGenConfigItem) => {
  if (configItem.type === 'directories') {
    generateDirectoriesOutput(configItem)

    return
  }

  generateImportsOutput(configItem)
}
