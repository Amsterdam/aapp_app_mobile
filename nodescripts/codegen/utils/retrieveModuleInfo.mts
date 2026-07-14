import fs from 'node:fs/promises'
import path from 'node:path'
import {stdin, stdout} from 'node:process'
import readline from 'node:readline/promises'
import {print} from './print.mts'
import {requireAnswer} from './requireAnswer.mts'
import type {Source} from '../generateModule.mts'

const rl = readline.createInterface({input: stdin, output: stdout})

const MODULE_DIRECTORY = path.resolve(process.cwd(), 'src/modules')

export const retrieveModuleInfo = async (): Promise<{
  moduleDescription: string
  moduleName: string
  moduleSlug: string
  source: Source
}> => {
  const source = await requireAnswer(
    'Is this module for "aapp" or "mams"? ',
    rl,
  )

  if (source !== 'aapp' && source !== 'mams') {
    print(
      `Invalid source provided. Please specify either "aapp" or "mams".`,
      'red',
    )
    process.exit(1)
  }

  const moduleName = await requireAnswer(
    'What is the (public facing) name of the module? ',
    rl,
  )
  const moduleSlug = await requireAnswer(
    `What is the slug of the module? ${source === 'mams' ? 'mams-' : ''}`,
    rl,
  )

  const moduleDescription = await rl.question(
    'What is the description of the module? ',
  )

  console.table({
    moduleName,
    version: '1.0.0',
    source,
    moduleSlug,
    moduleDescription,
  })

  const answer = await rl.question(
    "Is this correct? Type 'q' to restart, or any other key to continue: ",
  )

  if (answer.trim().toLowerCase() === 'q') {
    print('Restarting module generation...', 'yellow')

    return retrieveModuleInfo()
  }

  const directoryAlreadyExists = await fs
    .readdir(path.join(MODULE_DIRECTORY, moduleSlug))
    .catch(() => false)

  if (directoryAlreadyExists) {
    print(
      `Module with slug "${moduleSlug}" already exists. Please choose a different slug.`,
      'red',
    )

    return retrieveModuleInfo()
  }

  rl.close()

  return {
    source,
    moduleName,
    moduleSlug: source === 'mams' ? `mams-${moduleSlug}` : moduleSlug,
    moduleDescription,
  }
}
