import {useMemo} from 'react'
import type {ServiceMapResponse} from '@/modules/service/types'

//TODO: Remove once layers data includes colors

export const useMapLayersWithColor = (service?: ServiceMapResponse) =>
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

      return {
        ...layer,
        color,
        aapp_icon_type: itemInLayer?.properties.aapp_icon_type,
      }
    })
  }, [service])
