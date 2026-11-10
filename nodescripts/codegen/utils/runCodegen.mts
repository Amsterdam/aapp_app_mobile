import {config} from '../../../codegen.config.mts'
import {formatAll} from './formatAll.mts'
import {generate} from './generate.mts'
import {lintAll} from './lintAll.mts'

export const runCodeGen = () => {
  console.log('Running code generation...')
  const adjustedFiles = config.flatMap(generate)

  lintAll(adjustedFiles)
  formatAll(adjustedFiles)
  console.log('Finished code generation.')
}
