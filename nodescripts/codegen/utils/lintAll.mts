import {run} from './run.mts'

export const lintAll = (adjustedFiles: string[]) => {
  run('npx', ['oxlint', '--fix', ...adjustedFiles])
}
