import type {EntriesWithImports, ImportConfig} from '../types.mts'
import type {Dirent} from 'node:fs'

const generateOutputDataSpreadArray = (
  exportName: string | undefined,
  list: string[],
  satisfiesString: string,
) => `

export const ${exportName} = [
  ${list.map(item => `...${item}`).join(', \n  ')}
]${satisfiesString};`

const generateOutputDataSpreadObject = (
  exportName: string | undefined,
  list: string[],
  satisfiesString: string,
) => `

export const ${exportName} = {
  ${list.map(item => `...${item}`).join(', \n  ')}
}${satisfiesString};`

const generateOutputDataSpreadObjectFunction = (
  exportName: string | undefined,
  dirImportMapping: (dirName: Dirent<string>, varName: string) => string,
  entriesWithImports: EntriesWithImports,
  satisfiesString: string,
) => `

export const ${exportName} = {
  ${entriesWithImports.map(({dir}, i) => dirImportMapping(dir, `${exportName}${i}`)).join(',\n  ')}
}${satisfiesString};`

const generateOutputDataArray = (
  exportName: string | undefined,
  list: string[],
  satisfiesString: string,
) => `

export const ${exportName} = [
  ${list.join(',\n  ')}
]${satisfiesString};
`

export const generateOutputData = (
  entriesWithImports: EntriesWithImports,
  imports: ImportConfig[],
  importsEntries: string[],
) => `${importsEntries.join('\n')}
${imports.flatMap(({resultImports}) => resultImports ?? []).join('\n')}${imports
  .map(({exportName, result, satisfies}) => {
    const satisfiesString = satisfies ? ` satisfies ${satisfies}` : ''
    // Only include items that are present in entriesWithImports
    const list = entriesWithImports.map((_, i) => `${exportName}${i}`)

    if (result === 'spreadArray') {
      return generateOutputDataSpreadArray(exportName, list, satisfiesString)
    } else if (result === 'spreadObject') {
      return generateOutputDataSpreadObject(exportName, list, satisfiesString)
    } else if (typeof result === 'function') {
      return generateOutputDataSpreadObjectFunction(
        exportName,
        result,
        entriesWithImports,
        satisfiesString,
      )
    } else {
      return generateOutputDataArray(exportName, list, satisfiesString)
    }
  })
  .join('\n')}`
