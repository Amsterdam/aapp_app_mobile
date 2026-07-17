import fs from 'node:fs'

export type CodeGenConfig = CodeGenConfigItem[]

export type ImportsCodeGenConfigItem = {
  imports: ImportConfig[]
  inputDir: string
  match: string
  output: string
  type?: 'imports'
}

export type DirectoriesCodeGenConfigItem = {
  excludeDirectories?: string[]
  inputDir: string
  output: string
  result: (directories: fs.Dirent<string>[]) => string
  type: 'directories'
}

export type CodeGenConfigItem =
  | ImportsCodeGenConfigItem
  | DirectoriesCodeGenConfigItem

export type ImportConfig = {
  exportName?: string
  /**
   * 'import' can be:
   * - 'default' for default import
   * - 'namespace' for namespace import
   * - string for named import
   */
  import: 'default' | 'namespace' | (string & {})
  optional?: boolean
  /**
   * 'result' can be:
   * - 'array' return items as an array
   * - 'spreadArray' return items spread into an array
   * - 'spreadObject' return items spread into an object
   * - 'typeUnion' return a union type
   * - 'typeIntersection' return an intersection type
   * - `(path, name) => string` custom function to handle the imports
   * @default 'array'
   */
  result?:
    | 'spreadArray'
    | 'spreadObject'
    | 'array'
    | 'typeUnion'
    | 'typeIntersection'
    | ((path: fs.Dirent<string>, name: string) => string)
  resultImports?: string[]
  satisfies?: string
}

export type EntriesWithImports = {
  availableImports: ImportConfig[]
  dir: fs.Dirent<string>
}[]
