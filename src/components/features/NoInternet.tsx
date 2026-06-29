// eslint-disable-next-line no-restricted-imports
import {addEventListener} from '@react-native-community/netinfo'
import {useState, useEffect, memo} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setInternetState} from '@/store/slices/internetConnection'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const NoInternet = memo(() => {
  const [hasInternet, setHasInternet] = useState(true)
  const [isClosed, setIsClosed] = useState(false)
  const styles = useThemable(createStyles)
  const accessibilityAnnounce = useAccessibilityAnnounce()
  const dispatch = useDispatch()

  useEffect(
    () =>
      addEventListener(({isInternetReachable, isConnected}) => {
        if (isInternetReachable) {
          if (!hasInternet) {
            accessibilityAnnounce('Internet verbinding hersteld.')
            setHasInternet(true)
          }
        } else if (isInternetReachable === false) {
          setIsClosed(false)
          setHasInternet(false)
          accessibilityAnnounce('Geen internetverbinding.')
        }

        dispatch(
          setInternetState({
            isConnected,
            isInternetReachable,
          }),
        )
      }),
    [accessibilityAnnounce, dispatch, hasInternet],
  )

  return (
    <>
      {!hasInternet && !isClosed && (
        <View style={styles.container}>
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}>
            <View style={styles.inner}>
              <Box
                insetHorizontal="md"
                insetVertical="sm">
                <Row align="between">
                  <Icon
                    color="inverse"
                    name="wifi-disconnect"
                    size="lg"
                    testID="NoInternetIcon"
                  />
                  <Phrase
                    color="inverse"
                    emphasis="strong"
                    testID="NoInternetPhrase">
                    Geen internetverbinding
                  </Phrase>
                  <IconButton
                    accessibilityHint="Sluit deze melding"
                    icon={
                      <Icon
                        color="inverse"
                        name="close"
                        testID="NoInternetCloseIcon"
                      />
                    }
                    onPress={() => setIsClosed(true)}
                    testID="NoInternetCloseButton"
                  />
                </Row>
              </Box>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  )
})

const createStyles = ({color, size, z}: Theme) =>
  StyleSheet.create({
    container: {
      margin: size.spacing.xl,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: z.noInternetBanner,
    },
    inner: {
      backgroundColor: color.noInternet.background,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })
