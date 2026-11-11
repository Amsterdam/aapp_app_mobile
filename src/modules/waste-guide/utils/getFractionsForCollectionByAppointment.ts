import {WasteType, FractionCode} from '@/modules/waste-guide/types'

/**
 * When the criteria for waste collection by appointment are met, all fractions, except "grof afval", are combined into a single fraction, which has the date of the "rest" fraction, but a different title.
 */
export const getFractionsForCollectionByAppointment = (
  fractions: WasteType[],
) => {
  const combinedFractions: WasteType[] = []

  for (const fraction of fractions) {
    const {code} = fraction

    if (code === FractionCode.GA || code === FractionCode.Kerstbomen) {
      combinedFractions.push(fraction)
    } else if (code === FractionCode.Rest) {
      combinedFractions.unshift({
        ...fraction,
        label: 'Restafval, papier/karton, gfe/t, glas en textiel',
      })
    }
  }

  return combinedFractions
}
