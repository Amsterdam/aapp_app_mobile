import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {CarouselRenderItemContentButton} from '@/modules/onboarding/components/CarouselRenderItemContentButton'
import {CarouselRenderItemContentText} from '@/modules/onboarding/components/CarouselRenderItemContentText'

type Props = {
  contentButton?: CarouselItemVariant['contentButton']
  icon: CarouselItemVariant['icon']
  testID: CarouselItemVariant['testID']
  text?: CarouselItemVariant['text']
  title: CarouselItemVariant['title']
  useText: CarouselItemVariant['useText']
}

export const CarouselRenderItemContentLandscape = ({
  icon,
  testID,
  title,
  text,
  useText,
  contentButton,
}: Props) => (
  <Column
    grow={1}
    gutter="md">
    <Row gutter="md">
      <Icon
        {...icon}
        size="xll"
      />
      <Title
        testID={`${testID}Title`}
        text={title}
      />
    </Row>
    <Paragraph variant="intro">
      <CarouselRenderItemContentText
        key={typeof useText}
        text={text}
        useText={useText}
      />
    </Paragraph>
    {!!contentButton && (
      <CarouselRenderItemContentButton
        {...contentButton}
        testID={testID}
      />
    )}
  </Column>
)
