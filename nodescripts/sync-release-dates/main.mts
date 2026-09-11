import {buildReleaseDateUpdates} from './buildReleaseDateUpdates.mts'
import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {ENVIRONMENTS, RELEASE_VERSION_PATTERN} from './constants.mts'
import {getHighestReleaseVersion} from './getHighestReleaseVersion.mts'
import {getRelevantReleases} from './getRelevantReleases.mts'
import {parseReleaseVersion} from './parseReleaseVersion.mts'
import {fetchReleases, patchReleaseDates} from './requests.mts'
import {requiredEnv} from './requiredEnv.mts'
import type {EnvironmentSubDomain, Release} from './types.mts'

const syncReleaseDates = async ({
  releases,
  environment = 'ontw',
}: {
  environment: EnvironmentSubDomain
  releases: Release[]
}) => {
  const iosVersionLive = requiredEnv('IOS_VERSION_NUMBER_LIVE')
  const iosVersionReview = requiredEnv('IOS_VERSION_NUMBER_REVIEW')
  const androidVersionLive = requiredEnv('ANDROID_VERSION_NUMBER_LIVE')
  const androidVersionReview = requiredEnv('ANDROID_VERSION_NUMBER_REVIEW')
  const dryRun = requiredEnv('DRY_RUN')

  const isIosVersionValid = RELEASE_VERSION_PATTERN.test(iosVersionLive)
  const isAndroidVersionValid = RELEASE_VERSION_PATTERN.test(androidVersionLive)

  if (!isIosVersionValid) {
    throw new Error('IOS_VERSION_NUMBER is not a valid release value')
  }

  if (!isAndroidVersionValid) {
    throw new Error('ANDROID_VERSION_NUMBER is not a valid release value')
  }

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

  const relevantReleases = getRelevantReleases(releases, highestReleaseVersion)

  const releaseUpdates = buildReleaseDateUpdates(
    relevantReleases,
    highestReleaseVersion,
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

  if (isIosReviewHigherThanLive || isAndroidReviewHigherThanLive) {
    // If release version currently in review in either app- or play store is higher than respective live versions,
    // or one of the stores holds the higher release version and the other not yet,
    // we only unpublish the currently deprecated past release.

    const [version, update] =
      Object.entries(releaseUpdates).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, {unpublished}]) => !!unpublished,
      ) || []

    if (version && update && dryRun?.toLowerCase() !== 'true') {
      await patchReleaseDates(version, update, environment)
    } else {
      console.log(environment.toUpperCase(), releaseUpdates)
      console.log(
        `Only update unpublish date of currently deprecated release ${version}`,
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

void (() =>
  Promise.all(
    ENVIRONMENTS.map(environment =>
      fetchReleases(environment)
        .then(syncReleaseDates)
        .catch(err => {
          console.error(err, environment)
          throw new Error(String(err))
        }),
    ),
  ))()
