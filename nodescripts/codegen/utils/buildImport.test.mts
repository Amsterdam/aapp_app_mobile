import type {ImportConfig} from '../types.mts'
import {buildImport} from './buildImport.mts'

describe('buildImport', () => {
  it('handles default import only', () => {
    const config: ImportConfig[] = [{import: 'default', exportName: 'Foo'}]

    expect(buildImport(1, 'foo', config)).toBe("import Foo1 from 'foo';")
  })

  it('handles namespace import only', () => {
    const config: ImportConfig[] = [{import: 'namespace', exportName: 'Bar'}]

    expect(buildImport(2, 'bar', config)).toBe("import * as Bar2 from 'bar';")
  })

  it('handles named import only', () => {
    const config: ImportConfig[] = [{import: 'baz', exportName: 'Baz'}]

    expect(buildImport(3, 'baz', config)).toBe(
      "import { baz as Baz3 } from 'baz';",
    )
  })

  it('handles default + named import', () => {
    const config: ImportConfig[] = [
      {import: 'default', exportName: 'Foo'},
      {import: 'bar', exportName: 'Bar'},
    ]

    expect(buildImport(4, 'foobar', config)).toBe(
      "import Foo4, { bar as Bar4 } from 'foobar';",
    )
  })

  it('handles default + namespace + named import', () => {
    const config: ImportConfig[] = [
      {import: 'default', exportName: 'Foo'},
      {import: 'namespace', exportName: 'Bar'},
      {import: 'baz', exportName: 'Baz'},
    ]

    expect(buildImport(5, 'all', config)).toBe(
      "import Foo5, * as Bar5, { baz as Baz5 } from 'all';",
    )
  })

  it('handles multiple named imports', () => {
    const config: ImportConfig[] = [
      {import: 'foo', exportName: 'Foo'},
      {import: 'bar', exportName: 'Bar'},
    ]

    expect(buildImport(6, 'multi', config)).toBe(
      "import { bar as Bar6, foo as Foo6 } from 'multi';",
    )
  })

  it('handles empty import config', () => {
    expect(buildImport(7, 'empty', [])).toBe('')
  })
})
