import {ParkingPermit} from '@/modules/parking/types'

/**
 * Prevents permits with the same type from having identical names by appending the permit's report code.
 */
export const fixPermitNames = (permits: ParkingPermit[]) => {
  const permitNameCounts = permits.reduce(
    (acc, permit) => {
      acc[permit.permit_name] = (acc[permit.permit_name] || 0) + 1

      return acc
    },
    {} as Record<string, number>,
  )

  return permits.map(permit => {
    if (permitNameCounts[permit.permit_name] > 1) {
      return {
        ...permit,
        permit_name: `${permit.permit_name} (${permit.report_code})`,
      }
    }

    return permit
  })
}
