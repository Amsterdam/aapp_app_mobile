import path from 'node:path'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {rule} from './no-relative-file-import.mts'

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

const filename = path.resolve(
  __dirname,
  '../src/modules/example/screens/ExampleScreen.tsx',
)

ruleTester.run('no-relative-file-import', rule, {
  valid: [
    {
      code: "import {Button} from '@/components/Button'",
      filename,
    },
    {
      code: "import {Button} from '@scope/package'",
      filename,
    },
  ],
  invalid: [
    {
      code: "import {Button} from '../../components/Button'",
      output: "import {Button} from '@/modules/components/Button'",
      filename,
      errors: [{messageId: 'noRelativeFileImport'}],
    },
    {
      code: "const Button = require('../../components/Button')",
      output: "const Button = require('@/modules/components/Button')",
      filename,
      errors: [{messageId: 'noRelativeFileImport'}],
    },
  ],
})
