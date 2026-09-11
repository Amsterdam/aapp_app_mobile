import {ENVIRONMENTS} from './constants.mts'
import {fetchReleases} from './requests.mts'
import {syncReleaseDates} from './syncReleaseDates.mts'

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
