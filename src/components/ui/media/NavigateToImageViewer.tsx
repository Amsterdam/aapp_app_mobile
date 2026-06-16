import {StyleSheet} from 'react-native'
import type {ImageProps} from '@/components/ui/media/Image'
import type {PropsWithChildren} from 'react'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeModalName} from '@/modules/home/routes'

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
      accessibilityHint="Dubbel tik om de afbeelding beter te bekijken"
      accessibilityLabel={alt ?? ''}
      onPress={() =>
        navigate(HomeModalName.imageViewer, {
          source,
          testID,
          aspectRatio,
          alt: alt || accessibilityLabel,
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
