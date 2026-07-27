import {getAvailableAndOtherEvses} from '@/modules/boat-charging/hooks/useAvailableAndOtherEvses'
import {
  ChargingPointStatus,
  type ChargingStation,
  type EVSE,
} from '@/modules/boat-charging/types'

const baseEvse: EVSE = {
  connectors: [],
  display_name: 'EVSE 1',
  evse_id: '1',
  id: '51',
  ocpp_evse_id: 1,
  status: ChargingPointStatus.OPERATIVE,
}

const baseChargingStation: ChargingStation = {
  evses: [baseEvse],
  id: 'station-1',
  location_id: 'location-1',
  status: ChargingPointStatus.OPERATIVE,
}

describe('getAvailableAndOtherEvses', () => {
  test('returns empty collections when no charging stations are provided', () => {
    expect(getAvailableAndOtherEvses([])).toEqual({
      evses: [],
      availableEvses: [],
      otherEvses: [],
    })
  })

  test('flattens EVSEs and separates operative and non-operative entries', () => {
    const operativeEvse = {...baseEvse, id: 'evse-operative'}
    const occupiedEvse = {
      ...baseEvse,
      id: 'evse-occupied',
      evse_id: '2',
      status: ChargingPointStatus.OCCUPIED,
    }
    const offlineStationEvse = {
      ...baseEvse,
      id: 'evse-offline-station',
    }

    const operativeStation = {
      ...baseChargingStation,
      evses: [operativeEvse, occupiedEvse],
      id: 'station-operative',
    }
    const offlineStation = {
      ...baseChargingStation,
      evses: [offlineStationEvse],
      id: 'station-offline',
      status: ChargingPointStatus.OFFLINE,
    }

    expect(
      getAvailableAndOtherEvses([operativeStation, offlineStation]),
    ).toEqual({
      evses: [
        {
          ...offlineStationEvse,
          station: offlineStation,
          name: 'station-offline-1',
        },
        {
          ...operativeEvse,
          station: operativeStation,
          name: 'station-operative-1',
        },
        {
          ...occupiedEvse,
          station: operativeStation,
          name: 'station-operative-2',
        },
      ],
      availableEvses: [
        {
          ...operativeEvse,
          station: operativeStation,
          name: 'station-operative-1',
        },
      ],
      otherEvses: [
        {
          ...offlineStationEvse,
          station: offlineStation,
          name: 'station-offline-1',
        },
        {
          ...occupiedEvse,
          station: operativeStation,
          name: 'station-operative-2',
        },
      ],
    })
  })

  test('places an EVSE in otherEvses when the station status is null', () => {
    const chargingStation = {
      ...baseChargingStation,
      status: null as unknown as ChargingPointStatus,
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
      availableEvses: [],
      otherEvses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
    })
  })

  test('places an EVSE in otherEvses when the station status is undefined', () => {
    const chargingStation = {
      ...baseChargingStation,
      status: undefined as unknown as ChargingPointStatus,
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
      availableEvses: [],
      otherEvses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
    })
  })

  test('places an EVSE in otherEvses when the EVSE status is null', () => {
    const chargingStation = {
      ...baseChargingStation,
      evses: [{...baseEvse, status: null as unknown as ChargingPointStatus}],
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
      availableEvses: [],
      otherEvses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
    })
  })

  test('places an EVSE in otherEvses when the EVSE status is undefined', () => {
    const chargingStation = {
      ...baseChargingStation,
      evses: [
        {...baseEvse, status: undefined as unknown as ChargingPointStatus},
      ],
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
      availableEvses: [],
      otherEvses: [
        {
          ...chargingStation.evses[0],
          station: chargingStation,
          name: 'station-1-1',
        },
      ],
    })
  })

  test('throws when chargingStations is null', () => {
    expect(
      getAvailableAndOtherEvses(null as unknown as ChargingStation[]),
    ).toEqual({
      evses: [],
      availableEvses: [],
      otherEvses: [],
    })
  })

  test('throws when chargingStations is undefined', () => {
    expect(
      getAvailableAndOtherEvses(undefined as unknown as ChargingStation[]),
    ).toEqual({
      evses: [],
      availableEvses: [],
      otherEvses: [],
    })
  })

  test('throws when a charging station EVSE list is null', () => {
    const chargingStation = {
      ...baseChargingStation,
      evses: null as unknown as EVSE[],
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [],
      availableEvses: [],
      otherEvses: [],
    })
  })

  test('throws when a charging station EVSE list is undefined', () => {
    const chargingStation = {
      ...baseChargingStation,
      evses: undefined as unknown as EVSE[],
    }

    expect(getAvailableAndOtherEvses([chargingStation])).toEqual({
      evses: [],
      availableEvses: [],
      otherEvses: [],
    })
  })
})
