import {View} from 'react-native'
import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
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

export const CarouselRenderItemContentLandscape = ({
  contentButton,
  icon,
  showNotificationPermissionSettings,
  testID,
  title,
  text,
  useText,
  variant,
}: Props) => (
  <Column
    grow={1}
    gutter="md"
    halign="start">
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
        key={`${variant}ContentButton`} // Ensure the component is recreated when contentButton changes
        noPadding
        testID={testID}
      />
    )}
  </Column>
)
