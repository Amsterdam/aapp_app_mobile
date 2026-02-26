import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Column} from '@/components/ui/layout/Column'
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

export const CarouselRenderItemContentPortrait = ({
  icon,
  testID,
  title,
  text,
  useText,
  contentButton,
}: Props) => (
  <Column
    grow={1}
    gutter="xl"
    halign="center">
    <Icon
      {...icon}
      size="xxl"
    />
    <Column gutter="md">
      <Title
        testID={`${testID}Title`}
        text={title}
        textAlign="center"
      />
      <Paragraph
        textAlign="center"
        variant="intro">
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
  </Column>
)
