import fs from 'node:fs'
import path from 'node:path'
import type {ImportConfig} from '../types.mts'
import type {Dirent} from 'node:fs'

/**
 * checks and returns which imports are available in the given directory
 */
export const getAvailableImports = (
  base: string,
  directory: Dirent<string>,
  match: string,
  imports: ImportConfig[],
) => {
  const absTarget = path.join(base, directory.name, match)

  return imports.filter(imp => {
    if (!imp.optional) {
      return true
    }

    if (imp.import === 'namespace') {
      // For default/namespace, just check if file exists
      return fs.existsSync(absTarget)
    }

    // For named exports, check if the file contains the export
    if (!fs.existsSync(absTarget)) {
      return false
    }

    const fileContent = fs.readFileSync(absTarget, 'utf8')
    // Simple regex to check for export (not perfect, but works for most cases)
    const re = new RegExp(
      imp.import === 'default'
        ? String.raw`export\s+default\s+`
        : String.raw`export\s+(const|let|var|function|class|type|interface|enum)\s+${imp.import}\b`,
    )

    return re.test(fileContent)
  })
}
