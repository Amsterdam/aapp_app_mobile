import {useState, useEffect, useMemo} from 'react'
import {Image} from 'react-native'
import {getClosestAspectRatio} from '@/utils/getClosestAspectRatio'

export const useDynamicImageAspectRatio = (uri?: string) => {
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  } | null>(null)

  useEffect(() => {
    if (!uri) return

    Image.getSize(
      uri,
      (w, h) => setDimensions({width: w, height: h}),
      () => setDimensions(null),
    )
  }, [uri])

  return useMemo(
    () =>
      dimensions
        ? getClosestAspectRatio(dimensions.width, dimensions.height)
        : undefined,
    [dimensions],
  )
}
