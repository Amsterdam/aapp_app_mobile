import {buildReleaseDateUpdates} from './buildReleaseDateUpdates.mts'
import {compareReleaseVersions} from './compareReleaseVersions.mts'
import {ENVIRONMENTS, RELEASE_VERSION_PATTERN} from './constants.mts'
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
  // const iosVersionReview = requiredEnv('IOS_VERSION_NUMBER_REVIEW')
  const androidVersionLive = requiredEnv('ANDROID_VERSION_NUMBER_LIVE')
  // const androidVersionReview = requiredEnv('ANDROID_VERSION_NUMBER_REVIEW')
  const dryRun = requiredEnv('DRY_RUN')

  const isIosVersionValid = RELEASE_VERSION_PATTERN.test(iosVersionLive)
  const isAndroidVersionValid = RELEASE_VERSION_PATTERN.test(androidVersionLive)

  if (!isIosVersionValid) {
    throw new Error('IOS_VERSION_NUMBER is not a valid release value')
  }

  if (!isAndroidVersionValid) {
    throw new Error('ANDROID_VERSION_NUMBER is not a valid release value')
  }

  const mostRecentReleaseVersion =
    compareReleaseVersions(
      parseReleaseVersion(iosVersionLive),
      parseReleaseVersion(androidVersionLive),
    ) === -1
      ? androidVersionLive
      : iosVersionLive

  const currentRelease = releases.find(
    release => release.version === mostRecentReleaseVersion,
  )

  if (currentRelease?.published) {
    // If release in admin dashboard already has a published date, no need to update dates further.
    console.log(
      `No update required for release ${mostRecentReleaseVersion} on ${environment} environment.`,
    )

    return
  }

  const relevantReleases = getRelevantReleases(
    releases,
    mostRecentReleaseVersion,
  )
  const releaseUpdates = buildReleaseDateUpdates(
    relevantReleases,
    mostRecentReleaseVersion,
  )

  if (dryRun?.toLowerCase() === 'true') {
    console.log(environment.toUpperCase(), releaseUpdates)

    return
  }

  await Promise.all(
    Object.entries(releaseUpdates).map(async ([version, update]) =>
      patchReleaseDates(version, update, environment),
    ),
  )
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
