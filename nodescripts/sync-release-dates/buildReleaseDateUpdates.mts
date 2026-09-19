import {WEEK} from './constants.mts'
import type {Release, ReleaseUpdate} from './types.mts'

export const buildReleaseDateUpdates = (
  releases: Release[][],
  currentReleaseVersion: Release['version'],
  maxSupportedVersions: number,
) => {
  const updateRecord: Record<Release['version'], ReleaseUpdate> = {}

  releases.forEach((releaseGroup, index) => {
    const nowRounded = Number((Date.now() / 1000).toFixed(0)) * 1000

    const deprecateEntry = index === maxSupportedVersions - 1
    const unpublishEntry = index === maxSupportedVersions

    if (deprecateEntry) {
      // We deprecate the second to last release in the list
      releaseGroup.forEach(release => {
        updateRecord[release.version] = {
          deprecated: new Date(nowRounded + WEEK),
        }
      })

      return
    }

    if (unpublishEntry) {
      // We phase out the oldest release in the list
      releaseGroup.forEach(release => {
        updateRecord[release.version] = {unpublished: new Date(nowRounded)}
      })

      return
    }

    releaseGroup.forEach(release => {
      // We publish the current release
      if (release.version === currentReleaseVersion) {
        updateRecord[release.version] = {published: new Date(nowRounded)}
      }
    })
  })

  return updateRecord
}
