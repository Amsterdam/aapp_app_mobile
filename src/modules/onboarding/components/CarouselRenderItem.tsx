import type {TestProps} from '@/components/ui/types'
import type {
  CarouselItem,
  CarouselItemButton,
  CarouselItemVariant,
} from '@/modules/onboarding/types'
import {Button} from '@/components/ui/buttons/Button'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: CarouselItem<any>
  onPressNextButton: () => void
}

const ContentButton = ({
  label,
  external,
  onPress,
  useOnPress,
  testID,
}: CarouselItemButton & TestProps) => (
  <Button
    icon={external ? {name: 'link-external', size: 'md'} : undefined}
    label={label}
    onPress={useOnPress?.() ?? onPress}
    testID={`${testID}ContentButton`}
    variant="tertiary"
  />
)

const CarouselRenderText = ({
  text,
  useText,
}: Pick<CarouselItemVariant, 'text' | 'useText'>) => {
  const descriptionText = useText?.() ?? text

  return descriptionText
}

export const CarouselRenderItem = ({
  isLastItem,
  item,
  isPortrait,
  onPressNextButton,
}: Props) => {
  const {testID, icon, title, text, useText, button, contentButton} =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    item.variants[item.useVariant()]

  return (
    <HorizontalSafeArea flex={1}>
      <Box
        grow
        insetBottom="lg"
        insetHorizontal={isPortrait ? 'md' : 'xl'}
        insetTop={isPortrait ? 'xl' : 'no'}>
        {isPortrait ? (
          <Column
            grow={1}
            gutter={'xl'}
            halign="center">
            <Icon
              {...icon}
              size="xxl"
            />
            <Column
              gutter="md"
              shrink={1}>
              <Title
                testID={`${testID}Title`}
                text={title}
                textAlign="center"
              />
              <Paragraph
                textAlign="center"
                variant="intro">
                <CarouselRenderText
                  key={typeof useText}
                  text={text}
                  useText={useText}
                />
              </Paragraph>

              {!!contentButton && (
                <ContentButton
                  {...contentButton}
                  testID={testID}
                />
              )}
            </Column>
          </Column>
        ) : (
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
              <CarouselRenderText
                key={typeof useText}
                text={text}
                useText={useText}
              />
            </Paragraph>
            {!!contentButton && (
              <ContentButton
                {...contentButton}
                testID={testID}
              />
            )}
          </Column>
        )}
        <CarouselRenderItemButtons
          button={button}
          isLastItem={isLastItem}
          isPortrait={isPortrait}
          onPressNextButton={onPressNextButton}
          testID={testID}
        />
      </Box>
    </HorizontalSafeArea>
  )
}
