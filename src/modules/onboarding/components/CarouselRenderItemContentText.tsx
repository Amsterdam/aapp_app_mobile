import type {CarouselItemVariant} from '@/modules/onboarding/types'

export const CarouselRenderItemContentText = ({
  text,
  useText,
}: Pick<CarouselItemVariant, 'text' | 'useText'>) => {
  const descriptionText = useText?.() ?? text

  return descriptionText
}
