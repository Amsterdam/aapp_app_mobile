import {generateOutputData} from './generateOutputData.mts'
import type {EntriesWithImports, ImportConfig} from '../types.mts'
import type {Dirent} from 'node:fs'

describe('generateOutputData', () => {
  it('should generate output for spreadArray', () => {
    const entriesWithImports: EntriesWithImports = [
      //@ts-ignore
      {dir: {name: 'dir1'}, availableImports: []},
      //@ts-ignore
      {dir: {name: 'dir2'}, availableImports: []},
    ]
    const imports: ImportConfig[] = [
      {
        exportName: 'myExport',
        result: 'spreadArray',
        satisfies: '',
        resultImports: ['import x from "x";'],
        import: 'default',
      },
    ]
    const importsEntries = ['import y from "y";']
    const output = generateOutputData(
      entriesWithImports,
      imports,
      importsEntries,
    )

    expect(output.trim()).toBe(`import y from "y";
import x from "x";

export const myExport = [
  ...myExport0, 
  ...myExport1
];`)
  })

  it('should generate output for spreadObject', () => {
    const entriesWithImports: EntriesWithImports = [
      //@ts-ignore
      {dir: {name: 'a'}, availableImports: []},
      //@ts-ignore
      {dir: {name: 'b'}, availableImports: []},
    ]
    const imports: ImportConfig[] = [
      {
        exportName: 'objExport',
        result: 'spreadObject',
        satisfies: '',
        resultImports: [],
        import: 'default',
      },
    ]
    const importsEntries: string[] = []
    const output = generateOutputData(
      entriesWithImports,
      imports,
      importsEntries,
    )

    expect(output.trim()).toBe(`export const objExport = {
  ...objExport0, 
  ...objExport1
};`)
  })

  it('should generate output for function result', () => {
    const entriesWithImports: EntriesWithImports = [
      //@ts-ignore
      {dir: {name: 'foo'}, availableImports: []},
      //@ts-ignore
      {dir: {name: 'bar'}, availableImports: []},
    ]
    const imports: ImportConfig[] = [
      {
        exportName: 'funcExport',
        result: (dir: Dirent<string>, name: string) => `${dir.name}: ${name}`,
        satisfies: 'SomeType',
        resultImports: [],
        import: 'default',
      },
    ]
    const importsEntries: string[] = []
    const output = generateOutputData(
      entriesWithImports,
      imports,
      importsEntries,
    )

    expect(output.trim()).toBe(`export const funcExport = {
  foo: funcExport0,
  bar: funcExport1
} satisfies SomeType;`)
  })

  it('should generate output for default array', () => {
    const entriesWithImports: EntriesWithImports = [
      //@ts-ignore
      {dir: {name: 'x'}},
      //@ts-ignore
      {dir: {name: 'y'}},
    ]
    const imports: ImportConfig[] = [
      {
        exportName: 'arrExport',
        // result: 'default',
        satisfies: '',
        resultImports: [],
        import: 'default',
      },
    ]
    const importsEntries: string[] = []
    const output = generateOutputData(
      entriesWithImports,
      imports,
      importsEntries,
    )

    expect(output.trim()).toContain(`export const arrExport = [
  arrExport0,
  arrExport1
];`)
  })

  it('should handle empty imports and entries', () => {
    const entriesWithImports: EntriesWithImports = []
    const imports: ImportConfig[] = []
    const importsEntries: string[] = []
    const output = generateOutputData(
      entriesWithImports,
      imports,
      importsEntries,
    )

    expect(output.trim()).toBe('')
  })
})
