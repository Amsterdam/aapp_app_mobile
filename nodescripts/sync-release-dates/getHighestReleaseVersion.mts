import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'

export const getHighestReleaseVersion = (releaseVersions: Array<string>) => {
  const parsedVersions = releaseVersions.map(release =>
    parseReleaseVersion(release),
  )

  const sortedVersions = parsedVersions
    .slice(0)
    .sort((a, b) => compareReleaseVersions(b, a))

  const highestVersion = sortedVersions[0]

  return `${highestVersion.major}.${highestVersion.minor}.${highestVersion.patch}`
}
