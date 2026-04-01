import {useEffect, useMemo, useState} from 'react'
import {Image} from 'react-native'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {getClosestAspectRatio} from '@/modules/service/utils/getClosestAspectRatio'

export const ServicePointDetailsImage = ({uri}: {uri: string}) => {
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  } | null>(null)

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => setDimensions({width, height}),
      () => setDimensions(null),
    )
  }, [uri])

  const aspectRatio = useMemo(
    () =>
      dimensions
        ? getClosestAspectRatio(dimensions.width, dimensions.height)
        : undefined,
    [dimensions],
  )

  return (
    <LazyImage
      aspectRatio={aspectRatio}
      fallbackInheritsAspectRatio={false}
      source={{uri}}
      testID="ServicePointDetailsPropertiesImage"
    />
  )
}
