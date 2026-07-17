import fs from 'node:fs'
import path from 'node:path'

export const getRootDirectories = (inputDir: string) =>
  fs
    .readdirSync(path.resolve(inputDir), {withFileTypes: true})
    .filter(directory => directory.isDirectory())
