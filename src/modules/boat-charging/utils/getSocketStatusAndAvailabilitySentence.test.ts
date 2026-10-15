import simplur from 'simplur'
import {mapStatusToLabel} from '@/modules/boat-charging/constants/mapStatusToLabel'
import {
  ChargingPointStatus,
  type BoatChargingLocationDetailsResponse,
} from '@/modules/boat-charging/types'
import {getSocketStatusAndAvailabilitySentence} from '@/modules/boat-charging/utils/getSocketStatusAndAvailabilitySentence'

type SocketStatusSentenceLocation = Pick<
  BoatChargingLocationDetailsResponse,
  'available_sockets' | 'status' | 'total_sockets'
>

const createLocation = (
  overrides: Partial<SocketStatusSentenceLocation> = {},
): SocketStatusSentenceLocation => ({
  available_sockets: 0,
  status: ChargingPointStatus.OPERATIVE,
  total_sockets: 0,
  ...overrides,
})

describe('getSocketStatusAndAvailabilitySentence', () => {
  it('should return an empty string when no location status is available', () => {
    expect(getSocketStatusAndAvailabilitySentence(undefined)).toBe('')
    expect(getSocketStatusAndAvailabilitySentence(null as never)).toBe('')
  })

  it.each([undefined, null])(
    'should return mapped location status when available_sockets is %s',
    availableSockets => {
      const location = createLocation({
        available_sockets: availableSockets as never,
        total_sockets: 2,
      })

      expect(getSocketStatusAndAvailabilitySentence(location)).toBe(
        mapStatusToLabel[location.status ?? ChargingPointStatus.UNKNOWN],
      )
    },
  )

  it.each([undefined, null])(
    'should return mapped location status when total_sockets is %s',
    totalSockets => {
      const location = createLocation({
        available_sockets: 1,
        total_sockets: totalSockets as never,
      })

      expect(getSocketStatusAndAvailabilitySentence(location)).toBe(
        mapStatusToLabel[location.status ?? ChargingPointStatus.UNKNOWN],
      )
    },
  )

  it.each([undefined, null])(
    'should return malfunction status when location status is %s',
    locationStatus => {
      const location = createLocation({
        available_sockets: 1,
        status: locationStatus as never,
        total_sockets: 2,
      })

      expect(getSocketStatusAndAvailabilitySentence(location)).toBe(
        `${String(mapStatusToLabel[(locationStatus as never) ?? ChargingPointStatus.UNKNOWN])} - 2 stopcontacten`,
      )
    },
  )

  it.each([
    [1, 2],
    [0, 2],
    [0, 20],
    [10, 12],
  ])(
    'should return the available sockets sentence for operative locations',
    (availableCount, allCount) => {
      const plural = simplur`[stopcontact|stopcontacten]${[allCount]}`

      expect(
        getSocketStatusAndAvailabilitySentence(
          createLocation({
            available_sockets: availableCount,
            status: ChargingPointStatus.OPERATIVE,
            total_sockets: allCount,
          }),
        ),
      ).toBe(`${availableCount} van ${allCount} ${plural} vrij`)
    },
  )

  it.each([
    [1, 2],
    [0, 2],
    [0, 20],
    [10, 12],
  ])(
    'should return the available sockets sentence for occupied locations',
    (availableCount, allCount) => {
      const plural = simplur`[stopcontact|stopcontacten]${[allCount]}`

      expect(
        getSocketStatusAndAvailabilitySentence(
          createLocation({
            available_sockets: availableCount,
            status: ChargingPointStatus.OCCUPIED,
            total_sockets: allCount,
          }),
        ),
      ).toBe(`${availableCount} van ${allCount} ${plural} vrij`)
    },
  )

  it.each([
    ChargingPointStatus.INOPERATIVE,
    ChargingPointStatus.OFFLINE,
    ChargingPointStatus.UNKNOWN,
  ])(
    'should return a malfunction sentence for %s locations',
    locationStatus => {
      expect(
        getSocketStatusAndAvailabilitySentence(
          createLocation({
            available_sockets: 1,
            status: locationStatus,
            total_sockets: 2,
          }),
        ),
      ).toBe('Storing - 2 stopcontacten')
    },
  )
})
