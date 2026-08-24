import fs from 'node:fs'
import {createRequire} from 'node:module'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const ruleFiles = fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file !== 'index.mts' && !file.includes('.test.') && file.endsWith('.mts'),
  )

const rules = Object.fromEntries(
  ruleFiles.map(file => [
    path.basename(file, '.mts'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    require('./' + file).rule,
  ]),
)

const meta = {name: 'amsterdam'}

// TODO: remove this export when this plugin is no longer with eslint, but only with oxlint (https://gemeente-amsterdam.atlassian.net/browse/AM-1161)
export {rules, meta}

// eslint-disable-next-line import-x/no-default-export
export default {rules, meta}
