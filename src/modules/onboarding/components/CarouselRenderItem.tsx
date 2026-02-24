import type {CarouselItem} from '@/modules/onboarding/types'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {CarouselRenderItemButtons} from '@/modules/onboarding/components/CarouselRenderItemButtons'

type Props = {
  isLastItem: boolean
  isPortrait: boolean
  item: CarouselItem
  onPressNextButton: () => void
}

export const CarouselRenderItem = ({
  isLastItem,
  item,
  isPortrait,
  onPressNextButton,
}: Props) => (
  <HorizontalSafeArea flex={1}>
    <Box
      grow
      insetBottom="lg"
      insetHorizontal={isPortrait ? 'md' : 'xl'}
      insetTop="xl">
      {isPortrait ? (
        <Column
          grow={1}
          gutter={'xl'}
          halign="center">
          <Icon
            name={item.iconName}
            size="xxl"
          />
          <Column
            gutter="md"
            shrink={1}>
            <Title
              testID={`${item.testID}Title`}
              text={item.title}
              textAlign={isPortrait ? 'center' : undefined}
            />
            <Paragraph
              textAlign={isPortrait ? 'center' : undefined}
              variant="intro">
              {item.text}
            </Paragraph>
          </Column>
        </Column>
      ) : (
        <Column
          grow={1}
          gutter="md">
          <Row gutter="md">
            <Icon
              name={item.iconName}
              size="xll"
            />
            <Title
              testID={`${item.testID}Title`}
              text={item.title}
              textAlign={isPortrait ? 'center' : undefined}
            />
          </Row>
          <Paragraph
            textAlign={isPortrait ? 'center' : undefined}
            variant="intro">
            {item.text}
          </Paragraph>
        </Column>
      )}
      <CarouselRenderItemButtons
        button={item.button}
        isLastItem={isLastItem}
        isPortrait={isPortrait}
        onPressNextButton={onPressNextButton}
        testID={item.testID}
      />
    </Box>
  </HorizontalSafeArea>
)
