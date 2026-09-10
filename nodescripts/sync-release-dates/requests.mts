import {env} from 'node:process'
import type {EnvironmentSubDomain, Release, ReleaseUpdate} from './types.mts'

export const fetchReleases = async (
  environment: EnvironmentSubDomain = 'ontw',
) => {
  const url = environment
    ? `https://${environment}.app.amsterdam.nl/modules/api/v1/releases`
    : 'https://app.amsterdam.nl/modules/api/v1/releases'

  const response = await fetch(url, {
    headers: {
      // oxlint-disable-next-line typescript/no-unsafe-assignment
      'X-Api-Key-Internal': env.INTERNAL_API_KEY,
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
  const url = environment
    ? `https://${environment}.app.amsterdam.nl/modules/api/v1/release/${releaseVersion}`
    : `https://app.amsterdam.nl/modules/api/v1/release/${releaseVersion}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      // oxlint-disable-next-line typescript/no-unsafe-assignment
      'X-Api-Key-Internal': env.INTERNAL_API_KEY,
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
