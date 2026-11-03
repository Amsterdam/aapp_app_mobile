import {join} from 'node:path'
import type {CodeGenConfigItem} from '../types.mts'
import {copyStubIfMissing} from './copyStubIfMissing.mts'
import {findMatchingDirectories} from './findMatchingDirectories.mts'

export const generateCopyOutput = ({
  inputDir,
  output,
  match,
  stub,
}: Extract<CodeGenConfigItem, {type: 'copy'}>) =>
  findMatchingDirectories(inputDir, match).map(matchingDirectory => {
    copyStubIfMissing(stub, join(matchingDirectory, output))

    return join(matchingDirectory, output)
  })
