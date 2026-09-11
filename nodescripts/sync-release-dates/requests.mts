import {requiredEnv} from './requiredEnv.mts'
import type {EnvironmentSubDomain, Release, ReleaseUpdate} from './types.mts'

export const fetchReleases = async (
  environment: EnvironmentSubDomain = 'ontw',
) => {
  const url =
    environment !== 'prod'
      ? `https://${environment}.app.amsterdam.nl/modules/api/v1/releases`
      : 'https://app.amsterdam.nl/modules/api/v1/releases'

  const INTERNAL_API_KEY = requiredEnv(
    `INTERNAL_API_KEY_${environment.toUpperCase()}`,
  )

  const response = await fetch(url, {
    headers: {
      'X-Api-Key-Internal': INTERNAL_API_KEY,
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch releases: ${response.status} ${response.statusText}`,
    )
  }

  const releases = (await response.json()) as Release[]

  return {releases, environment}
}

export const patchReleaseDates = async (
  releaseVersion: Release['version'],
  update: ReleaseUpdate,
  environment: EnvironmentSubDomain = 'ontw',
) => {
  const url =
    environment !== 'prod'
      ? `https://${environment}.app.amsterdam.nl/modules/api/v1/release/${releaseVersion}`
      : `https://app.amsterdam.nl/modules/api/v1/release/${releaseVersion}`

  const INTERNAL_API_KEY = requiredEnv(
    `INTERNAL_API_KEY_${environment.toUpperCase()}`,
  )

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'X-Api-Key-Internal': INTERNAL_API_KEY,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to patch release ${releaseVersion}: ${response.status} ${response.statusText}`,
    )
  }

  const payload = (await response.json()) as {status: string}

  return payload
}
