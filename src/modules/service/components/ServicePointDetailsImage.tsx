import {LazyImage} from '@/components/ui/media/LazyImage'
import {useDynamicImageAspectRatio} from '@/hooks/useDynamicImageAspectRatio'

type Props = {uri: string}

export const ServicePointDetailsImage = ({uri}: Props) => {
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
