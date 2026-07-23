import {RuleTester} from '@typescript-eslint/rule-tester'
import {rule} from './no-type-import-for-function-component.mts'

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
})

const filename =
  '/Users/rik/workspace/aapp_app_mobile/src/modules/boat-charging/components/BoatChargingHistorySessionDetails.tsx'

ruleTester.run('no-type-import-for-function-component', rule, {
  valid: [
    {
      code: "import type {ColumnProps} from '@/components/ui/layout/Column'",
      filename,
    },
    {
      code: "import {Column} from '@/components/ui/layout/Column'",
      filename,
    },
    {
      code: "import {type ColumnProps, Column} from '@/components/ui/layout/Column'",
      filename,
    },
    {
      code: "import type {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'\ntype MarkerIcon = ComponentProps<typeof CustomMarkerIcon>['icon']",
      filename,
    },
    {
      code: "import type {Column as LayoutColumn} from '@/components/ui/layout/Column'\nconst label = 'Column'",
      filename,
    },
  ],
  invalid: [
    {
      code: "import type {Column} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      output:
        "import {Column} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      filename,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
    {
      code: "import {type Column, type ColumnProps} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      output:
        "import {Column, type ColumnProps} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      filename,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
    {
      code: "import type {Column as LayoutColumn} from '@/components/ui/layout/Column'\nexport const Test = () => <LayoutColumn />",
      output:
        "import {Column as LayoutColumn} from '@/components/ui/layout/Column'\nexport const Test = () => <LayoutColumn />",
      filename,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'LayoutColumn'},
        },
      ],
    },
    {
      code: "import type DefaultColumn from '@/components/ui/layout/Column'\nexport const Test = () => <DefaultColumn />",
      output:
        "import DefaultColumn from '@/components/ui/layout/Column'\nexport const Test = () => <DefaultColumn />",
      filename,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'DefaultColumn'},
        },
      ],
    },
    {
      code: "import type {Column, ColumnProps} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      output:
        "import {Column, type ColumnProps} from '@/components/ui/layout/Column'\nexport const Test = () => <Column />",
      filename,
      errors: [
        {
          messageId: 'noTypeImportForFunctionComponent',
          data: {name: 'Column'},
        },
      ],
    },
  ],
})
