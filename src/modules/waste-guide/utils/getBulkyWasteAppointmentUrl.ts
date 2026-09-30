import {Address} from '@/modules/address/exports/types'

/**
 * If we have an address, we return the URL with a query string, e.g. `?GUID=1016EM,1,,`, `?GUID=1016EM,1,A,` or `?GUID=1017GM,30,,1`
 */
export const getBulkyWasteAppointmentUrl = (
  bulkyWasteAppointmentUrl: string,
  address?: Address,
) => {
  if (!address) {
    return bulkyWasteAppointmentUrl
  }

  const {additionLetter, additionNumber, number, postcode} = address

  return `${bulkyWasteAppointmentUrl}?GUID=${postcode},${number},${
    additionLetter ?? ''
  },${additionNumber ?? ''}`
}
