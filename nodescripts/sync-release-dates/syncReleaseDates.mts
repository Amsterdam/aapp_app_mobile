import {buildReleaseDateUpdates} from './buildReleaseDateUpdates.mts'
import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {MAX_SUPPORTED_VERSIONS, RELEASE_VERSION_PATTERN} from './constants.mts'
import {getHighestReleaseVersion} from './getHighestReleaseVersion.mts'
import {getRelevantReleases} from './getRelevantReleases.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'
import {patchReleaseDates} from './requests.mts'
import {requiredEnv} from './requiredEnv.mts'
import type {EnvironmentSubDomain, Release} from './types.mts'

export const syncReleaseDates = async ({
  releases,
  environment = 'ontw',
}: {
  environment?: EnvironmentSubDomain
  releases: Release[]
}) => {
  const iosVersionLive = requiredEnv(
    'IOS_VERSION_NUMBER_LIVE',
    RELEASE_VERSION_PATTERN,
  )
  const iosVersionReview = requiredEnv(
    'IOS_VERSION_NUMBER_REVIEW',
    RELEASE_VERSION_PATTERN,
  )
  const androidVersionLive = requiredEnv(
    'ANDROID_VERSION_NUMBER_LIVE',
    RELEASE_VERSION_PATTERN,
  )
  const androidVersionReview = requiredEnv(
    'ANDROID_VERSION_NUMBER_REVIEW',
    RELEASE_VERSION_PATTERN,
  )
  const dryRun = requiredEnv('DRY_RUN')

  const highestIosVersion = getHighestReleaseVersion([
    iosVersionLive,
    iosVersionReview,
  ])
  const highestAndroidVersion = getHighestReleaseVersion([
    androidVersionLive,
    androidVersionReview,
  ])

  const highestReleaseVersion =
    compareReleaseVersions(
      parseReleaseVersion(highestIosVersion),
      parseReleaseVersion(highestAndroidVersion),
    ) === -1
      ? highestAndroidVersion
      : highestIosVersion

  const currentRelease = releases.find(
    release => release.version === highestReleaseVersion,
  )

  if (currentRelease?.published) {
    // If current release (which is highestReleaseVersion) in admin dashboard already has a published date, no need to update dates further.
    console.log(
      `No update required for release ${highestReleaseVersion} on ${environment} environment.`,
    )

    return
  }

  const relevantReleases = getRelevantReleases(
    releases,
    highestReleaseVersion,
    MAX_SUPPORTED_VERSIONS,
  )

  const releaseUpdates = buildReleaseDateUpdates(
    relevantReleases,
    highestReleaseVersion,
    MAX_SUPPORTED_VERSIONS,
  )

  const isIosReviewHigherThanLive =
    compareReleaseVersions(
      parseReleaseVersion(iosVersionLive),
      parseReleaseVersion(iosVersionReview),
    ) === -1

  const isAndroidReviewHigherThanLive =
    compareReleaseVersions(
      parseReleaseVersion(androidVersionLive),
      parseReleaseVersion(androidVersionReview),
    ) === -1

  const areLiveStoreVersionsDifferent =
    compareReleaseVersions(
      parseReleaseVersion(iosVersionLive),
      parseReleaseVersion(androidVersionLive),
    ) !== 0

  if (
    isIosReviewHigherThanLive ||
    isAndroidReviewHigherThanLive ||
    areLiveStoreVersionsDifferent
  ) {
    // If release version currently in review in either app- or play store is higher than respective live versions,
    // or one of the stores published the higher release version and the other not yet,
    // we only unpublish the currently deprecated past release.

    const unpublishUpdates = Object.entries(releaseUpdates).filter(
      ([, {unpublished}]) => Boolean(unpublished),
    )

    if (unpublishUpdates.length > 0 && dryRun?.toLowerCase() !== 'true') {
      await Promise.all(
        unpublishUpdates.map(([version, update]) =>
          patchReleaseDates(version, update, environment),
        ),
      )
    } else {
      console.log(environment.toUpperCase(), releaseUpdates)
      console.log(
        `Only update unpublish dates for currently deprecated releases: ${unpublishUpdates.map(([version]) => version).join(', ')}`,
      )
    }

    return
  }

  if (dryRun?.toLowerCase() === 'true') {
    console.log(environment.toUpperCase(), releaseUpdates)
  } else {
    await Promise.all(
      Object.entries(releaseUpdates).map(async ([version, update]) =>
        patchReleaseDates(version, update, environment),
      ),
    )
  }
}
