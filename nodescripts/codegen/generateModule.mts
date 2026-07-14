import path from 'node:path'
import {
  camelCase,
  constantCase,
  kebabCase,
  pascalCase,
  snakeCase,
} from 'change-case'
import {print} from './utils/print.mts'
import {retrieveModuleInfo} from './utils/retrieveModuleInfo.mts'
import {runCodeGen} from './utils/runCodeGen.mts'
import {scaffoldModule} from './utils/scaffoldModule.mts'

const MODULE_TEMPLATE_PATH = 'nodescripts/codegen/templates/module'
const MODULE_DIRECTORY = path.resolve(process.cwd(), 'src/modules')
const TEMPLATE_DIRECTORY = path.resolve(process.cwd(), MODULE_TEMPLATE_PATH)

export type Source = 'aapp' | 'mams'

export type CasingVariants = {
  moduleDescription: string
  moduleName: string
  moduleNameCamelCase: string
  moduleNameKebabCase: string
  moduleNamePascalCase: string
  moduleNameSnakeCase: string
  moduleSlug: string
  moduleSlugCamelCase: string
  moduleSlugConstantCase: string
  moduleSlugKebabCase: string
  moduleSlugPascalCase: string
  moduleSlugSnakeCase: string
}
const addCasingVariants = (data: {
  moduleDescription: string
  moduleName: string
  moduleSlug: string
}): CasingVariants => ({
  ...data,
  moduleNameCamelCase: camelCase(data.moduleName),
  moduleNamePascalCase: pascalCase(data.moduleName),
  moduleNameKebabCase: kebabCase(data.moduleName),
  moduleNameSnakeCase: snakeCase(data.moduleName),
  moduleSlugCamelCase: camelCase(data.moduleSlug),
  moduleSlugPascalCase: pascalCase(data.moduleSlug),
  moduleSlugKebabCase: kebabCase(data.moduleSlug),
  moduleSlugSnakeCase: snakeCase(data.moduleSlug),
  moduleSlugConstantCase: constantCase(data.moduleSlug),
})

const generateModule = async () => {
  const {moduleName, moduleSlug, moduleDescription} = await retrieveModuleInfo()

  const data = addCasingVariants({moduleName, moduleSlug, moduleDescription})

  await scaffoldModule(
    TEMPLATE_DIRECTORY,
    path.join(MODULE_DIRECTORY, moduleSlug),
    data,
  )

  print(
    `Module "${moduleName}" generated successfully at ${path.join(MODULE_DIRECTORY, moduleSlug)}`,
    'green',
  )
}

await generateModule()
  .then(runCodeGen)
  .catch(error => {
    print(`Error generating module: ${error}`, 'red')
  })
