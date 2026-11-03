import {run} from './run.mts'

export const formatAll = (adjustedFiles: string[]) => {
  run('npx', ['oxfmt', ...adjustedFiles])
}
