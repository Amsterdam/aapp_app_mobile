import path from 'node:path'
import {rule} from './no-navigation-hooks-in-screens.mts'
import {ruleTester} from './utils/ruleTester'

const filename = path.resolve(
  path.dirname(__filename),
  '../src/modules/example/screens/ExampleScreen.screen.tsx',
)

ruleTester.run('no-navigation-hooks-in-screens', rule, {
  valid: [
    {
      code: `export const NonScreenComponent = () => {
 const navigation = useNavigation()
     }`,
      filename: filename.replace('.screen.tsx', '.tsx'),
    },
    {
      code: `export const ExampleScreen = ({route, navigation}: Props) => {
    }`,
      filename,
    },
    {
      code: `export const ExampleScreen = (props: Props) => {
    }`,
      filename,
    },
    {
      code: `export const ExampleScreen = () => {
    }`,
      filename,
    },
    {
      code: `const ExampleScreen = () => {
    }`,
      filename,
    },
    {
      code: `export function ExampleScreen() {
    }`,
      filename,
    },
  ],
  invalid: [
    {
      code: `export const ExampleScreen = () => {
const route = useRoute()
    }`,
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useRoute'},
        },
      ],
    },
    {
      code: `export const ExampleScreen = () => {
const navigation = useNavigation()
    }`,
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: `export const ExampleScreen = () => { 
return doSomething(useRoute()) 
    }`,
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useRoute'},
        },
      ],
    },
    {
      code: `export const ExampleScreen = () => { 
if (enabled) { 
  const navigation = useNavigation() 
} 
    }`,
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: `export function ExampleScreen() {
const navigation = useNavigation()
    }`,
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: "import {useRoute} from '@/hooks/navigation/useRoute'",
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useRoute'},
        },
      ],
    },
    {
      code: "import {useNavigation} from '@/hooks/navigation/useNavigation'",
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: "import {useNavigation as test} from '@/hooks/navigation/useNavigation'",
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: "import hook from '@/hooks/navigation/useNavigation'",
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useNavigation'},
        },
      ],
    },
    {
      code: "import hook from '@/hooks/navigation/useRoute'",
      filename,
      errors: [
        {
          messageId: 'noNavigationHooksInScreens',
          data: {hook: 'useRoute'},
        },
      ],
    },
  ],
})
