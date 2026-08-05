import * as core from '@actions/core'
import {main} from './utils/main.mts'

try {
  await main()
} catch (e: unknown) {
  core.setFailed((e as Error).message)
}
