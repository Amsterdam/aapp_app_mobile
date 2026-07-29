import {rule} from './no-type-import-for-function-component.mts'
import {ruleTester} from './utils/ruleTester'

ruleTester.run('no-type-import-for-function-component', rule, {
  valid: [
    {
      code: "import type {ColumnProps} from '@/components/ui/layout/Column'",
    },
    {
      code: "import {Column} from '@/components/ui/layout/Column'",
    },
    {
      code: "import {type ColumnProps, Column} from '@/components/ui/layout/Column'",
    },
    {
      code: `import type {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
type MarkerIcon = ComponentProps<typeof CustomMarkerIcon>['icon']`,
    },
    {
      code: `import type {Column as LayoutColumn} from '@/components/ui/layout/Column'
const label = 'Column'`,
    },
  ],
  invalid: [
    {
      code: `import type {Column} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      output: `import {Column} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
    {
      code: `import {type Column, type ColumnProps} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      output: `import {Column, type ColumnProps} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
    {
      code: `import type {Column as LayoutColumn} from '@/components/ui/layout/Column'
export const Test = () => <LayoutColumn />`,
      output: `import {Column as LayoutColumn} from '@/components/ui/layout/Column'
export const Test = () => <LayoutColumn />`,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'LayoutColumn'},
        },
      ],
    },
    {
      code: `import type DefaultColumn from '@/components/ui/layout/Column'
export const Test = () => <DefaultColumn />`,
      output: `import DefaultColumn from '@/components/ui/layout/Column'
export const Test = () => <DefaultColumn />`,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'DefaultColumn'},
        },
      ],
    },
    {
      code: `import type {Column, ColumnProps} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      output: `import {Column, type ColumnProps} from '@/components/ui/layout/Column'
export const Test = () => <Column />`,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
  ],
})
