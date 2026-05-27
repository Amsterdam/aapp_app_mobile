import {Fragment, useCallback, type ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import type {ImageProps} from '@/components/ui/media/Image'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeModalName} from '@/modules/home/routes'

/**
 * Returns a PressableBase Wrapper if Image should navigate to the ImageViewer, otherwise returns a Fragment
 * @param shouldNavigate
 * @param imageProps
 * @returns
 */
export const useNavigateToImageViewer = (
  shouldNavigate: boolean,
  {testID, source, aspectRatio, alt}: ImageProps,
) => {
  const {navigate} = useNavigation()

  const Wrapper = useCallback(
    ({children}: {children: ReactNode}) => (
      <PressableBase
        accessibilityHint="Dubbel tik om de afbeelding beter te bekijken"
        accessibilityLabel={alt ?? ''}
        onPress={() =>
          navigate(HomeModalName.imageViewer, {
            source,
            testID,
            aspectRatio,
            alt,
          })
        }
        style={styles.wrapper}
        testID={`${testID}NavigateToImageViewerButton`}>
        {children}
      </PressableBase>
    ),
    [navigate, source, testID, aspectRatio, alt],
  )

  return shouldNavigate ? Wrapper : Fragment
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
