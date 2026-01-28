import fs from 'node:fs'
import path from 'node:path'
import {buildImport} from './buildImport.mts'
import {generateOutputData} from './generateOutputData.mts'
import {getAvailableImports} from './getAvailableImports.mts'
import {toImportPath} from './toImportPath.mts'
import type {CodeGenConfigItem, EntriesWithImports} from '../types.mts'

export const generate = ({
  inputDir,
  match,
  output,
  imports,
  type = 'directory',
}: CodeGenConfigItem) => {
  const base = path.resolve(inputDir)
  const outputPath = path.resolve(output)
  const outputDir = path.dirname(outputPath)
  const entries = fs
    .readdirSync(base, {withFileTypes: true})
    .filter(entry =>
      type === 'directory' ? entry.isDirectory() : entry.isFile(),
    )
    .filter(entry =>
      type === 'directory'
        ? fs.existsSync(path.join(base, entry.name, match))
        : (typeof match === 'string' ? new RegExp(match) : match).test(
            entry.name,
          ),
    )

  const entriesWithImports: EntriesWithImports = entries
    .map(directory => ({
      dir: directory,
      availableImports: getAvailableImports(
        base,
        directory,
        match,
        imports,
        type,
      ),
    }))
    .filter(entry => entry.availableImports.length > 0)

  const importsEntries = entriesWithImports.map(
    ({dir, availableImports}, i) => {
      const absTarget =
        type === 'directory'
          ? path.join(base, dir.name, match)
          : path.join(base, dir.name)
      const importPath = toImportPath(outputDir, absTarget)

      return buildImport(i, importPath, availableImports)
    },
  )

  const outputData = generateOutputData(
    entriesWithImports,
    imports,
    importsEntries,
  )

  fs.mkdirSync(outputDir, {recursive: true})
  fs.writeFileSync(output, outputData)
}
