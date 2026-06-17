'use strict'

const fs = require('node:fs')
const path = require('path')

const EXCEPTIONS = new Set(['generated', 'utils'])
const MODULES_DIRECTORY_PATH = 'src/modules'
const STACK_FILE_NAME = 'Stack.tsx'

let checked = false

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  name: 'module-stack-required',
  meta: {
    type: 'problem',
    docs: {
      description: 'Each module must contain Stack.tsx exporting ModuleStack',
    },
    schema: [],
    messages: {
      missingStack: 'Module "{{module}}" is missing a Stack.tsx file.',
      missingExport: 'Module "{{module}}" Stack.tsx must export ModuleStack.',
    },
  },
  defaultOptions: [],

  create: context => ({
    Program: node => {
      if (checked) {
        return
      }

      checked = true

      const root = context.cwd ?? process.cwd()
      const modulesDirectory = path.join(root, MODULES_DIRECTORY_PATH)

      const moduleDirectories = fs
        .readdirSync(modulesDirectory, {withFileTypes: true})
        .filter(entry => entry.isDirectory() && !EXCEPTIONS.has(entry.name))

      for (const module of moduleDirectories) {
        const stackFile = path.join(
          modulesDirectory,
          module.name,
          STACK_FILE_NAME,
        )

        if (!fs.existsSync(stackFile)) {
          context.report({
            node,
            messageId: 'missingStack',
            data: {
              module: module.name,
            },
          })

          continue
        }

        const content = fs.readFileSync(stackFile, 'utf8')

        const match = /export\s+const\s+ModuleStack\s*=/.test(content)

        if (!match) {
          context.report({
            node,
            messageId: 'missingExport',
            data: {
              module: module.name,
            },
          })
        }
      }
    },
  }),
}
