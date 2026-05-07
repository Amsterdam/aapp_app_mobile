import type {ParkingPermit} from '@/modules/parking/types'

const KNOWN_PERMIT_NAME_KEYWORDS: RegExp[] = [
  /ga-parkeervergunning.*\(passagiers\)/i,
  /mantelzorg/i,
  /bezoekersparkeervergunning/i,
  /kraskaartparkeervergunning/i,
  /bedrijfsvergunning/i,
  /met wisselend kenteken/i,
  /sportverenigingvergunning/i,
]

/**
 * Filters the given permits to only include those that match known permit name keywords, which are indicative of valid parking permits. This is necessary because the API may return permits that are not actual parking permits, and we want to ensure that only relevant permits are processed and displayed in the app.
 */
export const filterPermits = (permits: ParkingPermit[]) =>
  permits.filter(({permit_name}) =>
    KNOWN_PERMIT_NAME_KEYWORDS.some(keyword => keyword.test(permit_name)),
  )
