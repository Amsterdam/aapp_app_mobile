import {getHeaderTitle} from '@react-navigation/elements'
import {StyleSheet, View} from 'react-native'
import {navigationRef} from '@/app/navigation/navigationRef'
import {HeaderBackButton} from '@/components/features/header/HeaderBackButton'
import {HeaderProps} from '@/components/features/header/types'
import {Row} from '@/components/ui/layout/Row'
import {ScreenHeaderTitle} from '@/components/ui/text/ScreenHeaderTitle'
import {IconSize} from '@/components/ui/types'
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'

const chevronSize = 'lg'

export const HeaderContent = ({
  back,
  navigation,
  options = {},
  route,
}: HeaderProps) => {
  const title = getHeaderTitle(
    options,
    getHeaderTitle(navigationRef.current?.getCurrentOptions() ?? {}, ''),
  )
  const {accessibilityLanguage, preventInitialFocus, SideComponent} = options

  const onBackPress =
    back?.onPress ??
    (navigationRef.current?.getCurrentOptions() as HeaderProps)?.back
      ?.onPress ??
    navigation.goBack

  /*
   * TODO: delete once issue https://github.com/react-navigation/react-navigation/issues/7056 is fixed
   */
  const accessibilityAutoFocusRef = useAccessibilityAutoFocus<View>({
    isActive: !preventInitialFocus,
  })

  return (
    <Row gutter="lg">
      <View
        accessible
        ref={accessibilityAutoFocusRef}
        style={styles.sideColumn}>
        {!!back && (
          <HeaderBackButton
            iconSize={chevronSize}
            onPress={onBackPress}
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <ScreenHeaderTitle
          accessibilityLanguage={accessibilityLanguage}
          text={title}
        />
      </View>
      <View style={styles.sideColumn}>
        {!!SideComponent && <SideComponent route={route} />}
      </View>
    </Row>
  )
}

const styles = StyleSheet.create({
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  sideColumn: {
    minWidth: IconSize[chevronSize],
  },
})
