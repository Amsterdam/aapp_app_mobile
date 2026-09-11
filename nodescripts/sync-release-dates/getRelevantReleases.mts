import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {MAX_SUPPORTED_VERSIONS, RELEASE_VERSION_PATTERN} from './constants.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'
import type {Release} from './types.mts'

export const getRelevantReleases = (
  releases: Release[],
  currentReleaseVersionString: string,
): Release[] => {
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

  const recentPastReleases = validReleases
    .filter(release => {
      const releaseVersion = parseReleaseVersion(release.version)

      return compareReleaseVersions(releaseVersion, currentReleaseVersion) < 0 // Return only older versions than currentReleaseVersion
    })
    .sort((leftRelease, rightRelease) => {
      const lVersion = parseReleaseVersion(leftRelease.version)
      const rVersion = parseReleaseVersion(rightRelease.version)

      return compareReleaseVersions(rVersion, lVersion)
    })
    .slice(0, MAX_SUPPORTED_VERSIONS)

  return [currentRelease, ...recentPastReleases]
}
