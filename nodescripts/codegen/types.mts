import fs from 'node:fs'

export type CodeGenConfig = CodeGenConfigItem[]

export type CodeGenConfigItem = {
  imports: ImportConfig[]
  inputDir: string
  match: string
  output: string
  type?: 'directory' | 'file'
}

export type ImportConfig = {
  exportName?: string
  /**
   * 'import' can be:
   * - 'default' for default import
   * - 'namespace' for namespace import
   * - string for named import
   */
  // eslint-disable-next-line sonarjs/no-useless-intersection, @typescript-eslint/ban-types
  import: 'default' | 'namespace' | 'none' | (string & {})
  optional?: boolean
  /**
   * 'result' can be:
   * - 'array' return items as an array
   * - 'spreadArray' return items spread into an array
   * - 'spreadObject' return items spread into an object
   * - `(path, name) => string` custom function to handle the imports
   * @default 'array'
   */
  result?:
    | 'spreadArray'
    | 'spreadObject'
    | 'array'
    | 'objectFunction'
    | 'enumFunction'
  resultFunction?: (path: fs.Dirent<string>, name: string) => string
  resultImports?: string[]
  satisfies?: string
}

export type EntriesWithImports = {
  availableImports: ImportConfig[]
  dir: fs.Dirent<string>
}[]
