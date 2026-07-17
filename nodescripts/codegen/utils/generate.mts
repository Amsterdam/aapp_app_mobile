import {generateDirectoriesOutput} from './generateDirectoriesOutput.mts'
import {generateImportsOutput} from './generateImportsOutput.mts'
import type {CodeGenConfigItem} from '../types.mts'

export const generate = (configItem: CodeGenConfigItem) => {
  if (configItem.type === 'directories') {
    generateDirectoriesOutput(configItem)

    return
  }

  generateImportsOutput(configItem)
}
