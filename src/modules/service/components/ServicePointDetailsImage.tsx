import {useEffect, useState} from 'react'
import {Image} from 'react-native'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {getClosestAspectRatio} from '@/modules/service/utils/getClosestAspectRatio'

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
    ? getClosestAspectRatio(dimensions.width, dimensions.height)
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
