import path from 'node:path'
import {rule} from './no-cross-module-import.mts'
import {ruleTester} from './utils/ruleTester'

const moduleFileName = path.resolve(
  __dirname,
  '../src/modules/home/screens/HomeScreen.tsx',
)

const nonModuleFileName = path.resolve(__dirname, '../src/store/store.ts')

ruleTester.run('no-cross-module-import', rule, {
  valid: [
    {
      code: "import {Button} from '@/components/Button'",
      filename: moduleFileName,
    },
    {
      code: "import {Banner} from '@/modules/home/components/Banner'",
      filename: moduleFileName,
    },
    {
      code: "import {ModuleSlug} from '@/modules/generated/slugs.generated'",
      filename: moduleFileName,
    },
    {
      code: "import {BottomSheetSurvey} from '@/modules/survey/exports/BottomSheetSurvey'",
      filename: moduleFileName,
    },
    {
      code: "const BottomSheetSurvey = require('../../survey/exports/BottomSheetSurvey')",
      filename: moduleFileName,
    },
    {
      code: "import {accessCodeRoutes} from '@/modules/access-code/routes'",
      filename: moduleFileName,
    },
    {
      code: "const accessCodeRoutes = require('../../access-code/routes')",
      filename: moduleFileName,
    },
    {
      code: "import {AddressScreen} from '@/modules/address/screens/AddressScreen'",
      filename: nonModuleFileName,
    },
  ],
  invalid: [
    {
      code: "import {AddressScreen} from '@/modules/address/screens/AddressScreen'",
      filename: moduleFileName,
      errors: [{messageId: 'noCrossModuleImport'}],
    },
    {
      code: "const AddressScreen = require('../../address/screens/AddressScreen')",
      filename: moduleFileName,
      errors: [{messageId: 'noCrossModuleImport'}],
    },
  ],
})
