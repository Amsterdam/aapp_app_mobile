---
agent: 'agent'
description: 'Create a new custom ESLint rule and matching tests in eslint-plugin-amsterdam.'
---

Create a complete, minimal ESLint rule in eslint-plugin-amsterdam from the user's plain-language rule description.

First, identify one concrete, testable behavior. If the request is ambiguous, ask only the minimum needed to proceed:

- what should be valid
- what should be invalid
- whether autofix is required
- whether any exceptions should be allowed

Then implement the rule using these repository conventions:

- add one `.mts` rule file and one matching `.test.ts` file in eslint-plugin-amsterdam
- use `eslint-plugin-amsterdam/utils/createRule.mts`
- use `eslint-plugin-amsterdam/utils/ruleTester.ts`
- follow the naming, structure, and `messageId` style of nearby rules
- derive the filename from the rule name in kebab-case
- export the rule as `rule`
- define explicit `messages` with stable `messageId` values
- keep the AST logic simple
- add an options schema only if configurability is explicitly required
- do not add an autofix unless it is clearly safe and deterministic
- never abbreviate variable names
- keep diffs minimal

Before editing, inspect one nearby existing rule and matching test to copy local conventions. After the first substantive edit, run the narrowest relevant validation for the new rule before widening scope.

Expected result:

- the new rule implementation
- matching focused tests for valid and invalid cases
- autofix coverage when applicable
- a short summary of what the rule enforces, whether it autofixes, what validation ran, and any assumptions
