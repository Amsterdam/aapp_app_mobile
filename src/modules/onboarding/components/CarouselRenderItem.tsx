import {StyleSheet} from 'react-native'
import type {CarouselItem} from '@/modules/onboarding/types'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {CarouselRenderItemButtons} from '@/modules/onboarding/components/CarouselRenderItemButtons'
import {CarouselRenderItemContentLandscape} from '@/modules/onboarding/components/CarouselRenderItemContentLandscape'
import {CarouselRenderItemContentPortrait} from '@/modules/onboarding/components/CarouselRenderItemContentPortrait'

type Props = {
  isLastItem: boolean
  isPortrait: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: CarouselItem<any>
  onPressNextButton: () => void
}

export const CarouselRenderItem = ({
  isLastItem,
  item,
  isPortrait,
  onPressNextButton,
}: Props) => {
  const {
    testID,
    icon,
    title,
    text,
    useText,
    button,
    contentButton,
    showNotificationPermissionSettings,
  } =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    item.variants[item.useVariant()]

  const Content = isPortrait
    ? CarouselRenderItemContentPortrait
    : CarouselRenderItemContentLandscape

  return (
    <HorizontalSafeArea flex={1}>
      <Box
        grow
        insetHorizontal={isPortrait ? 'md' : 'xl'}
        insetTop={isPortrait ? 'xl' : 'no'}>
        <Column
          flex={1}
          gutter="md">
          <ScrollView style={styles.scrollView}>
            <Content
              contentButton={contentButton}
              icon={icon}
              showNotificationPermissionSettings={
                showNotificationPermissionSettings
              }
              testID={testID}
              text={text}
              title={title}
              useText={useText}
            />
          </ScrollView>
          <CarouselRenderItemButtons
            button={button}
            isLastItem={isLastItem}
            isPortrait={isPortrait}
            onPressNextButton={onPressNextButton}
            testID={testID}
          />
        </Column>
      </Box>
    </HorizontalSafeArea>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexShrink: 1,
  },
})
