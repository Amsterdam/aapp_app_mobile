// Remove once the waste guide API includes this as a single property
import {Address} from '@/modules/address/types'
import {FractionCode} from '@/modules/waste-guide/types'
import {getSquareMapArea} from '@/modules/waste-guide/utils/getSquareMapArea'

const wasteTypeMapping: Record<
  | Exclude<
      FractionCode,
      | FractionCode.GA
      | FractionCode.RecyclingCentre
      | FractionCode.DropOffPoint
      | FractionCode.Manufacturer
    >
  | 'Brood',
  number[]
> = {
  Rest: [12491],
  Glas: [12492],
  Papier: [12493],
  Plastic: [12494],
  Textiel: [12495, 13698],
  Brood: [12497],
  GFT: [12496],
}

const getLocationTypes = (fractionCode?: FractionCode) => {
  if (
    fractionCode &&
    Object.keys(wasteTypeMapping).includes(fractionCode) &&
    fractionCode !== FractionCode.GA
  ) {
    return wasteTypeMapping[fractionCode].join(',')
  }

  return Object.values(wasteTypeMapping).join(',')
}

export const getContainerMapUrl = (
  wasteContainersUrl: string,
  coordinates?: Address['coordinates'],
  fractionCode?: FractionCode,
) => {
  if (!coordinates) {
    return wasteContainersUrl
  }

  const locationTypes = getLocationTypes(fractionCode)
  const {lat, lon} = coordinates
  // This adds a query string parameter to the url to prevent the browser from reusing a previous map url that only
  // differs in the fragment. The parameter is ignored by the map website, as far as we know. Only links from the app
  // to a mobile browser seem to have this ‘bug’ – links from the website to the mobile browser do not.
  const queryParam = fractionCode ? `?fractie=${fractionCode}` : ''
  const fragment = getSquareMapArea(lat, lon, 0.002)

  return fragment
    ? `${wasteContainersUrl}${queryParam}#${fragment}/topo/${locationTypes}//`
    : wasteContainersUrl
}
