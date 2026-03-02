import {View} from 'react-native'
import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {CarouselRenderItemContentButton} from '@/modules/onboarding/components/CarouselRenderItemContentButton'
import {CarouselRenderItemContentText} from '@/modules/onboarding/components/CarouselRenderItemContentText'
import {CarouselRenderItemNotificationSettings} from '@/modules/onboarding/components/CarouselRenderItemNotificationSettings'

type Props = {
  contentButton?: CarouselItemVariant['contentButton']
  icon: CarouselItemVariant['icon']
  showNotificationPermissionSettings?: CarouselItemVariant['showNotificationPermissionSettings']
  testID: CarouselItemVariant['testID']
  text?: CarouselItemVariant['text']
  title: CarouselItemVariant['title']
  useText: CarouselItemVariant['useText']
  variant: string
}

export const CarouselRenderItemContentPortrait = ({
  icon,
  testID,
  title,
  text,
  useText,
  contentButton,
  showNotificationPermissionSettings,
  variant,
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
      <CarouselRenderItemContentText
        key={variant} // Ensure the component is recreated when useText changes
        text={text}
        useText={useText}
      />
      {!!showNotificationPermissionSettings && (
        <>
          <View />
          <CarouselRenderItemNotificationSettings testID={testID} />
        </>
      )}
      {!!contentButton && (
        <CarouselRenderItemContentButton
          {...contentButton}
          testID={testID}
        />
      )}
    </Column>
  </Column>
)
