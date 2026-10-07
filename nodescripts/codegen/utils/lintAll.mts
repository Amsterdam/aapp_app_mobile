import type {CodeGenConfig} from '../types.mts'
import {run} from './run.mts'

export const lintAll = (config: CodeGenConfig) => {
  run('npx', ['oxlint', '--fix', ...config.map(({output}) => output)])
}
