import {rule} from './prefer-multiline-eslint-test-strings.mts'
import {ruleTester} from './utils/ruleTester'

const templateDelimiter = '`'
const newlineEscapeSequence = String.raw`\n`

ruleTester.run('prefer-multiline-eslint-test-strings', rule, {
  valid: [
    {
      code: `ruleTester.run('example', rule, {
  invalid: [
    {
      code: \
\`const value = 1;
const otherValue = 2;\`,
      output: \
\`const value = 2;
const otherValue = 3;\`,
    },
  ],
})`,
    },
    {
      code: `ruleTester.run('example', rule, {
  invalid: [
    {
      code: "const value = 1;",
    },
  ],
})`,
    },
    {
      code: String.raw`const example = {code: "const value = 1;\nconst otherValue = 2;"}`,
    },
  ],
  invalid: [
    {
      code: String.raw`ruleTester.run('example', rule, {
  invalid: [
    {
      code: "const value = 1;\nconst otherValue = 2;",
    },
  ],
})`,
      output: `ruleTester.run('example', rule, {
  invalid: [
    {
      code: \`const value = 1;
const otherValue = 2;\`,
    },
  ],
})`,
      errors: [{messageId: 'preferMultilineEslintTestString'}],
    },
    {
      code: `ruleTester.run('example', rule, {
  invalid: [
    {
      code: ${templateDelimiter}const value = 1;${newlineEscapeSequence}const otherValue = 2;${templateDelimiter},
    },
  ],
})`,
      output: `ruleTester.run('example', rule, {
  invalid: [
    {
      code: \`const value = 1;
const otherValue = 2;\`,
    },
  ],
})`,
      errors: [{messageId: 'preferMultilineEslintTestString'}],
    },
  ],
})
