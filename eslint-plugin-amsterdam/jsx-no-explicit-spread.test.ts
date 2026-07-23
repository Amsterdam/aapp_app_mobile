import {RuleTester} from '@typescript-eslint/rule-tester'
import {rule} from './jsx-no-explicit-spread.mts'

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

const errors = [{messageId: 'noSpreading'}] as const

ruleTester.run('jsx-no-explicit-spread', rule, {
  valid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
    },
  ],
  invalid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row {...{gutter, flex}}> </Row>
};`,
      output: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
      errors,
    },
  ],
})
