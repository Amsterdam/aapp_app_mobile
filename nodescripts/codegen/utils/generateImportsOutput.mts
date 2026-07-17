import fs from 'node:fs'
import path from 'node:path'
import {buildImport} from './buildImport.mts'
import {generateOutputData} from './generateOutputData.mts'
import {getAvailableImports} from './getAvailableImports.mts'
import {getRootDirectories} from './getRootDirectories.mts'
import {toImportPath} from './toImportPath.mts'
import type {EntriesWithImports, ImportsCodeGenConfigItem} from '../types.mts'

export const generateImportsOutput = ({
  inputDir,
  match,
  output,
  imports,
}: ImportsCodeGenConfigItem) => {
  const base = path.resolve(inputDir)
  const outputPath = path.resolve(output)
  const outputDir = path.dirname(outputPath)
  const entries = getRootDirectories(inputDir).filter(directory =>
    fs.existsSync(path.join(base, directory.name, match)),
  )

  const entriesWithImports: EntriesWithImports = entries
    .map(directory => ({
      dir: directory,
      availableImports: getAvailableImports(base, directory, match, imports),
    }))
    .filter(entry => entry.availableImports.length > 0)

  const importsEntries = entriesWithImports.map(
    ({dir, availableImports}, i) => {
      const absTarget = path.join(base, dir.name, match)
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
  fs.writeFileSync(outputPath, outputData)
}
