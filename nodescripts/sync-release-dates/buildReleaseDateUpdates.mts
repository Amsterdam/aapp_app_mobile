import {MAX_SUPPORTED_VERSIONS, WEEK} from './constants.mts'
import type {Release, ReleaseUpdate} from './types.mts'

export const buildReleaseDateUpdates = (
  releases: Release[],
  currentReleaseVersion: Release['version'],
) =>
  releases.reduce<Record<Release['version'], ReleaseUpdate>>(
    (updateRecord, release, index) => {
      const nowRounded = Number((Date.now() / 1000).toFixed(0)) * 1000

      if (release.version === currentReleaseVersion) {
        // We publish the current release
        return {
          ...updateRecord,
          [release.version]: {published: new Date(nowRounded)},
        }
      }

      const deprecateEntry = index === MAX_SUPPORTED_VERSIONS - 1
      const unpublishEntry = index === MAX_SUPPORTED_VERSIONS

      if (deprecateEntry) {
        // We deprecate the second to last release in the list
        return {
          ...updateRecord,
          [release.version]: {deprecated: new Date(nowRounded + WEEK)},
        }
      }

      if (unpublishEntry) {
        // We phase out the oldest release in the list
        return {
          ...updateRecord,
          [release.version]: {unpublished: new Date(nowRounded)},
        }
      }

      return updateRecord
    },
    {},
  )
