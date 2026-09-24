import type {ParsedReleaseVersion} from './types.mts'

const isParsedReleaseVersion = (
  version: unknown,
): version is ParsedReleaseVersion =>
  typeof version === 'object' && version !== null && 'major' in version

export const compareReleaseVersions = (
  leftVersion: ParsedReleaseVersion,
  rightVersion: ParsedReleaseVersion,
): number => {
  if (
    !isParsedReleaseVersion(leftVersion) ||
    !isParsedReleaseVersion(rightVersion)
  ) {
    return Number.NaN
  }

  if (leftVersion.major !== rightVersion.major) {
    return leftVersion.major - rightVersion.major
  }

  if (leftVersion.minor !== rightVersion.minor) {
    return leftVersion.minor - rightVersion.minor
  }

  return leftVersion.patch - rightVersion.patch
}
