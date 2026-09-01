import {StyleSheet} from 'react-native'
import type {ImageProps} from '@/components/ui/media/Image'
import type {PropsWithChildren} from 'react'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {HomeRouteName} from '@/modules/home/routes'

type Props = PropsWithChildren<{
  imageProps: ImageProps
  shouldNavigate: boolean
}>

export const NavigateToImageViewer = ({
  imageProps: {alt, source, testID, aspectRatio, accessibilityLabel},
  shouldNavigate,
  children,
}: Props) => {
  const {navigate} = useNavigation()

  if (!shouldNavigate) {
    return <>{children}</>
  }

  return (
    <PressableBase
      accessibilityHint="Dubbel tik om groot te bekijken"
      accessibilityLabel={alt || accessibilityLabel}
      onPress={() =>
        navigate(ModuleSlug.home, {
          screen: HomeRouteName.imageViewer,
          params: {
            source,
            testID,
            aspectRatio,
            alt: alt || accessibilityLabel,
          },
        })
      }
      style={styles.wrapper}
      testID={`${testID}NavigateToImageViewerButton`}>
      {children}
    </PressableBase>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
