import {devError} from '@/processes/development'

// Source: https://nl.wikipedia.org/wiki/Lijst_van_Nederlandse_netnummers
const threeDigitAreaCodes = [
  '010',
  '013',
  '014',
  '015',
  '020',
  '023',
  '024',
  '026',
  '030',
  '033',
  '035',
  '036',
  '038',
  '040',
  '043',
  '044',
  '045',
  '046',
  '050',
  '053',
  '055',
  '058',
  '070',
  '071',
  '072',
  '073',
  '074',
  '075',
  '076',
  '077',
  '078',
  '079',
]

/**
 * Formats phone numbers according to the City’s editorial style.
 * https://www.amsterdam.nl/schrijfwijzer/tekstonderdelen-heldere-taal/telefoonnummers/
 */
export const formatPhoneNumber = (
  phoneNumber?: string,
): string | undefined => {
  if (!phoneNumber) {
    return undefined
  }

  if (phoneNumber.startsWith('+31')) {
    phoneNumber = phoneNumber.replace('+31', '0')
  }

  if (phoneNumber === '14020') {
    return '14 020'
  }

  if (phoneNumber === '0202515020') {
    return '020 25 15 020'
  }

  if (phoneNumber.length === 10) {
    if (phoneNumber.startsWith('06')) {
      return [
        phoneNumber.substring(0, 2),
        phoneNumber.substring(2, 6),
        phoneNumber.substring(6, 10),
      ].join(' ')
    }

    if (threeDigitAreaCodes.includes(phoneNumber.substring(0, 3))) {
      return [
        phoneNumber.substring(0, 3),
        phoneNumber.substring(3, 6),
        phoneNumber.substring(6, 10),
      ].join(' ')
    }

    return [
      phoneNumber.substring(0, 4),
      phoneNumber.substring(4, 7),
      phoneNumber.substring(7, 10),
    ].join(' ')
  }

  if (phoneNumber.startsWith('0800') || phoneNumber.startsWith('0900')) {
    if (phoneNumber.length === 8) {
      return phoneNumber.match(/.{4}/g)?.join(' ')
    }

    if (phoneNumber.length === 11) {
      return [
        phoneNumber.substring(0, 4),
        phoneNumber.substring(4, 7),
        phoneNumber.substring(7, 11),
      ].join(' ')
    }
  }

  devError(`Unformatted phone number: ${phoneNumber}`)

  return phoneNumber
}
