import {RELEASE_VERSION_PATTERN} from './constants.mts'
import type {ParsedReleaseVersion} from './types.mts'

export const parseReleaseVersion = (version: string): ParsedReleaseVersion => {
  const isVersionValid = RELEASE_VERSION_PATTERN.test(version)

  if (!isVersionValid) {
    throw new Error(`Invalid release version: ${version}`)
  }

  const [major, minor, patch] = version.split('.').map(Number)

  return {
    major,
    minor,
    patch,
  }
}
