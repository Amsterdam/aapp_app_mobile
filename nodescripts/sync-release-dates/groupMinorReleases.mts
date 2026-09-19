import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'
import type {Release} from './types.mts'

type GroupedMinorReleases = Record<string, Release[]>

export const groupMinorReleases = (releases: Release[]) =>
  deepSortReleaseGroups(
    Object.values(
      releases.reduce<GroupedMinorReleases>((groupedReleases, release) => {
        const {major, minor} = parseReleaseVersion(release.version)
        const minorReleaseKey = `${major}.${minor}`

        groupedReleases[minorReleaseKey] = [
          ...(groupedReleases[minorReleaseKey] ?? []),
          release,
        ]

        return groupedReleases
      }, {}),
    ),
  )

export const deepSortReleaseGroups = (releaseGroups: Release[][]) =>
  releaseGroups
    .map(releaseGroup =>
      releaseGroup
        .slice()
        .sort((releaseA, releaseB) =>
          compareReleaseVersions(
            parseReleaseVersion(releaseB.version),
            parseReleaseVersion(releaseA.version),
          ),
        ),
    )
    .sort((releaseGroupA, releaseGroupB) =>
      compareReleaseVersions(
        parseReleaseVersion(releaseGroupB[0].version),
        parseReleaseVersion(releaseGroupA[0].version),
      ),
    )
