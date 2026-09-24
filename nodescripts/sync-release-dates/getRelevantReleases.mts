import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {RELEASE_VERSION_PATTERN} from './constants.mts'
import {groupMinorReleases} from './groupMinorReleases.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'
import type {Release} from './types.mts'

export const getRelevantReleases = (
  releases: Release[],
  currentReleaseVersionString: string,
  maxSupportedVersions: number,
): Release[][] => {
  const currentReleaseVersion = parseReleaseVersion(currentReleaseVersionString)

  const validReleases = releases.filter(release =>
    RELEASE_VERSION_PATTERN.test(release.version),
  )

  const currentRelease = validReleases.find(release => {
    const releaseVersion = parseReleaseVersion(release.version)

    return compareReleaseVersions(releaseVersion, currentReleaseVersion) === 0
  })

  if (!currentRelease) {
    throw new Error(
      'Cannot find the current release based on the provided store release number',
    )
  }

  const pastReleases = validReleases.filter(release => {
    const releaseVersion = parseReleaseVersion(release.version)

    return compareReleaseVersions(releaseVersion, currentReleaseVersion) < 0 // Return only older versions than currentReleaseVersion
  })

  return groupMinorReleases([currentRelease, ...pastReleases]).slice(
    0,
    maxSupportedVersions + 1,
  ) // + 1 to unpublish
}
