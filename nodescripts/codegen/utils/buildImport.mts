import {sortImportNames} from './sortImportNames.mts'
import type {ImportConfig} from '../types.mts'

export const buildImport = (
  index: number,
  importPath: string,
  importConfig: ImportConfig[],
) => {
  const sortedImports = importConfig.sort(sortImportNames)

  let defaultImport = ''
  let namespaceImport = ''
  const namedImports: string[] = []

  sortedImports.forEach(({import: importType, exportName}) => {
    const varName = `${exportName}${index}`

    if (importType === 'default') {
      defaultImport = varName
    } else if (importType === 'namespace') {
      namespaceImport = `* as ${varName}`
    } else {
      namedImports.push(`${importType} as ${varName}`)
    }
  })

  const importParts: string[] = []

  if (defaultImport) {
    importParts.push(defaultImport)
  }

  if (namespaceImport) {
    importParts.push(namespaceImport)
  }

  const named = namedImports.length ? `{ ${namedImports.join(', ')} }` : ''

  if (named) {
    importParts.push(named)
  }

  if (importParts.length === 0) {
    return ''
  }

  return `import ${importParts.join(', ')} from '${importPath}';`
}
