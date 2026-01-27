// We add our custom d.ts files here, because tsc-files ignores the `includes` in tsconfig.json by design and hence will not find the custom definitions
const definitions = ['src/custom.d.ts']

module.exports = {
  '*.(js|jsx|ts|tsx|json)': 'npx eslint --cache --fix',
  '*.(js|jsx|ts|tsx|json|md|yml|yaml|css)': 'npx prettier --check',
  '*.(ts|tsx)': `npx tsc-files --noEmit ${definitions.join(' ')}`,
}
