import type {CodeGenConfig} from '../types.mts'
import {run} from './run.mts'

export const formatAll = (config: CodeGenConfig) => {
  run('npx', ['oxfmt', ...config.map(({output}) => output)])
}
