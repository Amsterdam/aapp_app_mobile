import {useMemo} from 'react'
import type {ServiceMapResponse} from '@/modules/service/types'

export const useMapLayers = (service?: ServiceMapResponse) =>
  useMemo(() => {
    const {layers, icons_to_include, data} = service || {}
    const items = data && 'type' in data ? data.features : []

    return layers?.map(layer => {
      const itemInLayer = items.find(
        item => item.properties[layer.filter_key] === layer.filter_value,
      )

      const color =
        itemInLayer?.properties.aapp_icon_type && icons_to_include
          ? icons_to_include[itemInLayer.properties.aapp_icon_type]
              ?.circle_color
          : ''

      return {...layer, color}
    })
  }, [service])
