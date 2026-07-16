import {useMemo} from 'react'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {
  BULKY_WASTE_APPOINTMENT,
  SCHEDULE_WASTE_PICKUP,
  WASTE_COLLECTION_POINTS,
  WASTE_CONTAINERS,
} from '@/modules/waste-guide/external-links'
import {WasteType} from '@/modules/waste-guide/types'
import {getBulkyWasteAppointmentUrl} from '@/modules/waste-guide/utils/getBulkyWasteAppointmentUrl'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'

/**
 * This takes care of the post processing of the `afvalwijzerUrl` property. We check if the URL matches a known URL (BULKY_WASTE_APPOINTMENTUrl, WASTE_COLLECTION_POINTS or WASTE_CONTAINERS from the environment definitions) and if so, return the respective post processesed URL.
 */
export const useWasteGuideUrls = (fraction: WasteType) => {
  const {code, how, url} = fraction
  const {address} = useSelectedAddress(ModuleSlug['waste-guide'])

  // TODO: remove url post processing once the API includes the url as a single property
  return useMemo(
    () => ({
      bulkyWasteAppointmentUrl:
        url === BULKY_WASTE_APPOINTMENT
          ? getBulkyWasteAppointmentUrl(BULKY_WASTE_APPOINTMENT, address)
          : undefined,
      collectionPointsMapUrl:
        how?.includes('een Recyclepunt') && url === WASTE_COLLECTION_POINTS
          ? getCollectionPointsMapUrl(
              WASTE_COLLECTION_POINTS,
              address?.coordinates,
            )
          : undefined,
      containerMapUrl:
        url === WASTE_CONTAINERS
          ? getContainerMapUrl(WASTE_CONTAINERS, address?.coordinates, code)
          : undefined,
      seenonsUrl: url?.indexOf(SCHEDULE_WASTE_PICKUP) === 0 ? url : undefined,
    }),
    [address, code, how, url],
  )
}
