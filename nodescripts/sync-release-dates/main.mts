import {ENVIRONMENTS} from './constants.mts'
import {fetchReleases} from './requests.mts'
import {syncReleaseDates} from './syncReleaseDates.mts'

void (() =>
  Promise.all(
    ENVIRONMENTS.map(environment =>
      fetchReleases(environment)
        .then(syncReleaseDates)
        .catch(error => {
          console.error(error, environment)
          throw new Error(String(error))
        }),
    ),
  ))()
