import {readdirSync} from 'node:fs'
import {join} from 'node:path'

export const findMatchingDirectories = (
  directory: string,
  filename: string,
): string[] => {
  const matchingDirectories: string[] = []

  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      matchingDirectories.push(
        ...findMatchingDirectories(join(directory, entry.name), filename),
      )
    }

    if (entry.isFile() && entry.name === filename) {
      matchingDirectories.push(directory)
    }
  }

  return matchingDirectories
}
