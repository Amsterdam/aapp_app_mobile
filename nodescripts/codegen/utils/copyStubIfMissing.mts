import {copyFileSync, constants} from 'node:fs'

export const copyStubIfMissing = (stub: string, outputPath: string) => {
  try {
    copyFileSync(stub, outputPath, constants.COPYFILE_EXCL)
  } catch (error) {
    if (
      !(error instanceof Error && 'code' in error && error.code === 'EEXIST')
    ) {
      throw error
    }
  }
}
