import {FractionCode} from '@/modules/waste-guide/types'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'

describe('getContainerMapUrl', () => {
  it('should return the waste containers url with all location types when no fraction code is provided', () => {
    const result = getContainerMapUrl('https://url.com', {
      lat: 52.3728,
      lon: 4.9003,
    })

    expect(result).toEqual(
      `https://url.com#52.370799999999996/4.8983/52.3748/4.902299999999999/topo/12491,12492,12493,12494,12495,13698,12496//`,
    )
  })

  it('should return the waste containers url with the location type for the given fraction code', () => {
    const result = getContainerMapUrl(
      'https://url.com',
      {lat: 52.3728, lon: 4.9003},
      FractionCode.Papier,
    )

    expect(result).toEqual(
      `https://url.com?fractie=Papier#52.370799999999996/4.8983/52.3748/4.902299999999999/topo/12493//`,
    )
  })

  it('should return the waste containers url with all location types when the given fraction code is not in the mapping', () => {
    const result = getContainerMapUrl(
      'https://url.com',
      {lat: 52.3728, lon: 4.9003},
      FractionCode.GA,
    )

    expect(result).toEqual(
      `https://url.com?fractie=GA#52.370799999999996/4.8983/52.3748/4.902299999999999/topo/12491,12492,12493,12494,12495,13698,12496//`,
    )
  })

  it('should return undefined when no coordinates are provided', () => {
    const result = getContainerMapUrl(
      'https://url.com',
      undefined,
      FractionCode.GA,
    )

    expect(result).toBe('https://url.com')
  })
})
