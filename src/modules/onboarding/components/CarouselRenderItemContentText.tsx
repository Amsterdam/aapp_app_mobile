import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Paragraph} from '@/components/ui/text/Paragraph'

export const CarouselRenderItemContentText = ({
  text,
  useText,
}: Pick<CarouselItemVariant, 'text' | 'useText'>) => {
  const descriptionText = useText?.() ?? text

  if (!descriptionText) {
    return null
  }

  return (
    <Paragraph
      textAlign="center"
      variant="intro">
      {descriptionText}
    </Paragraph>
  )
}
