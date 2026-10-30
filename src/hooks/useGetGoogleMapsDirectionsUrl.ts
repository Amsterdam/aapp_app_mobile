import {useLocation} from '@/modules/address/slice'
import type {Coordinates} from '@/types/location'
import {getGoogleMapsDirectionsUrl} from '@/utils/getGoogleMapsDirectionsUrl'

export const useGetGoogleMapsDirectionsUrl = (
  destination: Partial<Coordinates>,
) => {
  const {location} = useLocation()

  return getGoogleMapsDirectionsUrl(location?.coordinates, destination)
}
