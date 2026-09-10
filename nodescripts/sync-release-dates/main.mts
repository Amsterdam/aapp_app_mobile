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
  // const androidVersion = requiredEnv('ANDROID_VERSION_NUMBER')

  const isBuildVersionValid = RELEASE_VERSION_PATTERN.test(iosVersion)

  if (!isBuildVersionValid) {
    throw new Error('IOS_VERSION_NUMBER is not a valid release value')
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
