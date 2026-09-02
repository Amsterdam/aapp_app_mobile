import * as core from '@actions/core'
import {loadConfig} from './utils/config.mts'
import {main} from './utils/main.mts'

try {
  const config = await loadConfig()

  await main(config)
} catch (e: unknown) {
  core.setFailed((e as Error).message)
}
