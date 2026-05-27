import {LazyImage} from '@/components/ui/media/LazyImage'
import {useDynamicImageAspectRatio} from '@/hooks/useDynamicImageAspectRatio'

export const ServicePointDetailsImage = ({uri}: {uri: string}) => {
  const aspectRatio = useDynamicImageAspectRatio(uri)

  return (
    <LazyImage
      aspectRatio={aspectRatio}
      fallbackInheritsAspectRatio={false}
      source={{uri}}
      testID="ServicePointDetailsPropertiesImage"
    />
  )
}
