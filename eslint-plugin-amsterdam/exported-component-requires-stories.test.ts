import os from 'node:os'
import path from 'node:path'
import {rule} from './exported-component-requires-stories.mts'
import {ruleTester} from './utils/ruleTester'

const missingStoriesFilename = path.join(
  os.tmpdir(),
  'eslint-plugin-amsterdam-missing-stories',
  'Component.tsx',
)
const existingStoriesFilename = path.resolve(
  __dirname,
  '../src/components/ui/buttons/Button.tsx',
)

ruleTester.run('exported-component-requires-stories', rule, {
  valid: [
    {
      code: 'export const Button = () => <View />',
      filename: existingStoriesFilename,
    },
    {
      code: 'export type Props = {id: string}; export const formatValue = () => null',
      filename: missingStoriesFilename,
    },
    {
      code: 'export const Empty = () => null',
      filename: missingStoriesFilename,
    },
    {
      code: 'export const Button = () => { const renderButton = () => <View />; return null }',
      filename: missingStoriesFilename,
    },
    {
      code: 'const Button = () => <View />',
      filename: missingStoriesFilename,
    },
    {
      code: 'export const Button = () => null',
      filename: missingStoriesFilename.replace(/\.tsx$/, '.ts'),
    },
    {
      code: 'export const Primary = () => <Button />',
      filename: missingStoriesFilename.replace(/\.tsx$/, '.stories.tsx'),
    },
    {
      code: 'export function Button() { return <View /> }',
      filename: missingStoriesFilename,
    },
    {
      code: 'export const button = () => <View />',
      filename: missingStoriesFilename,
    },
  ],
  invalid: [
    {
      code: 'export const Button = () => <View />',
      filename: missingStoriesFilename,
      errors: [
        {
          messageId: 'missingStoriesFile',
          data: {
            name: 'Button',
            storyFile: 'Component.stories.tsx',
          },
        },
      ],
    },
    {
      code: 'export const Button = (isActive: boolean) => isActive ? <View /> : null',
      filename: missingStoriesFilename,
      errors: [
        {
          messageId: 'missingStoriesFile',
          data: {
            name: 'Button',
            storyFile: 'Component.stories.tsx',
          },
        },
      ],
    },
  ],
})
