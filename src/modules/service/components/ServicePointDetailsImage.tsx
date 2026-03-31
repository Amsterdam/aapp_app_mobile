import {useEffect, useState} from 'react'
import {Image} from 'react-native'
import type {ImageAspectRatio} from '@/themes/tokens/media'
import {LazyImage} from '@/components/ui/media/LazyImage'

const aspectRatioMap: Record<ImageAspectRatio, [number, number]> = {
  extraWide: [2, Infinity],
  wide: [1.333, 2],
  narrow: [1.1, 1.333],
  square: [0.9, 1.1],
  portrait: [0.667, 0.9],
  tight: [0, 0.667],
}

const getAspectRatio = (
  width: number,
  height: number,
): ImageAspectRatio | undefined => {
  const aspectRatio = width / height

  return Object.entries(aspectRatioMap).find(
    ([, [min, max]]) => aspectRatio >= min && aspectRatio < max,
  )?.[0] as ImageAspectRatio | undefined
}

export const ServicePointDetailsImage = ({uri}: {uri: string}) => {
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  } | null>(null)

  useEffect(() => {
    void Image.getSize(uri)
      .then(({height, width}) => setDimensions({width, height}))
      .catch(() => setDimensions(null))
  }, [uri])

  const aspectRatio = dimensions
    ? getAspectRatio(dimensions.width, dimensions.height)
    : undefined

  return (
    <LazyImage
      aspectRatio={aspectRatio}
      fallbackInheritsAspectRatio={false}
      source={{uri}}
      testID="ServicePointDetailsPropertiesImage"
    />
  )
}
