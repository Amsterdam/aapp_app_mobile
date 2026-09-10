import {buildReleaseDateUpdates} from './buildReleaseDateUpdates.mts'
import {ENVIRONMENTS, RELEASE_VERSION_PATTERN} from './constants.mts'
import {getRelevantReleases} from './getRelevantReleases.mts'
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
  const iosVersion = requiredEnv('IOS_VERSION_NUMBER')
  const androidVersion = requiredEnv('ANDROID_VERSION_NUMBER')
  const dryRun = requiredEnv('DRY_RUN')

  const isIosVersionValid = RELEASE_VERSION_PATTERN.test(iosVersion)
  const isAndroidVersion = RELEASE_VERSION_PATTERN.test(androidVersion)

  if (!isIosVersionValid) {
    throw new Error('IOS_VERSION_NUMBER is not a valid release value')
  }

  if (!isAndroidVersion) {
    throw new Error('ANDROID_VERSION_NUMBER is not a valid release value')
  }

  if (iosVersion !== androidVersion) {
    // App store and Play store do not have the same (new) release, so no update of dates required.
    console.log(
      `No update required. IOS: ${iosVersion} and ANDROID ${androidVersion} not in sync (yet).`,
    )

    return
  }

  const currentRelease = releases.find(
    release => release.version === iosVersion,
  )

  if (currentRelease?.published) {
    // If release in admin dashboard already has a published date, no need to update dates further.
    console.log(
      `No update required for release ${iosVersion} on ${environment} environment.`,
    )

    return
  }

  const relevantReleases = getRelevantReleases(releases, iosVersion)
  const releaseUpdates = buildReleaseDateUpdates(relevantReleases, iosVersion)

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
        .catch(err => console.error(err, environment)),
    ),
  ))()
