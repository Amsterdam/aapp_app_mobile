import {RuleTester} from '@typescript-eslint/rule-tester'

export const ruleTester = new RuleTester({
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
