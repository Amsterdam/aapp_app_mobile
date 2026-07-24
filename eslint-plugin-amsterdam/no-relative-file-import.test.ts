import path from 'node:path'
import {rule} from './no-relative-file-import.mts'
import {ruleTester} from './utils/ruleTester'

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
      code: "import {Button} from '../../otherModule/components/Button'",
      output: "import {Button} from '@/modules/otherModule/components/Button'",
      filename,
      errors: [{messageId: 'noRelativeFileImport'}],
    },
    {
      code: "const Button = require('../components/Button')",
      output: "const Button = require('@/modules/example/components/Button')",
      filename,
      errors: [{messageId: 'noRelativeFileImport'}],
    },
  ],
})
