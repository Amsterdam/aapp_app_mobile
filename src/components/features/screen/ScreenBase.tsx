import {useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {ScreenProps, WithInsetProps} from '@/components/features/screen/Screen'
import {ScreenHeader} from '@/components/features/screen/ScreenHeader'
import {ScreenInnerWrapper} from '@/components/features/screen/ScreenInnerWrapper'
import {ScreenWrapper} from '@/components/features/screen/ScreenWrapper'
import {ScreenBackgroundOverlay} from '@/components/ui/containers/ScreenBackgroundOverlay'
import {AlertTopOfScreen} from '@/components/ui/feedback/alert/AlertTopOfScreen'
import {useRoute} from '@/hooks/navigation/useRoute'
import {ExtendAccessCodeValidityOnTap} from '@/modules/access-code/components/ExtendAccessCodeValidityOnTap'
import {HeaderForHome} from '@/modules/home/components/HeaderForHome'
import {HomeRouteName} from '@/modules/home/routes'
import {ScreenProvider} from '@/providers/screen.provider'
import {useScreen} from '@/store/slices/screen'

export const ScreenBase = (props: ScreenProps) => {
  const [overriddenProps, setOverriddenProps] = useState<Partial<ScreenProps>>(
    {},
  )

  const screenProps = useMemo(
    () => ({...props, ...overriddenProps}),
    [props, overriddenProps],
  )

  const {
    backgroundOverlay,
    bottomSheet,
    children,
    hasStickyAlert,
    headerOptions,
    isOutsideNavigation = false,
    stickyFooter,
    stickyHeader,
    withBottomInset = true,
    withLeftInset = true,
    withRightInset = true,
    withTopInset = false,
    testID,
    trackScroll,
    ...wrapperProps
  } = screenProps

  const insets = useSafeAreaInsets()
  const route = useRoute()
  const {
    isContentHiddenFromAccessibility,
    isHiddenFromAccessibility,
    spaceBottom,
  } = useScreen()
  const isHomeScreen = route.name === (HomeRouteName.home as string)

  const hasStickyFooter = !!stickyFooter
  const hasStickyHeader = !!stickyHeader

  const styles = useMemo(
    () =>
      createStyles(insets, {
        hasStickyFooter,
        hasStickyHeader,
        withBottomInset,
        withLeftInset,
        withRightInset,
        withTopInset,
      }),
    [
      insets,
      hasStickyFooter,
      hasStickyHeader,
      withBottomInset,
      withLeftInset,
      withRightInset,
      withTopInset,
    ],
  )

  const CustomHeader = isHomeScreen ? (
    <HeaderForHome options={headerOptions} />
  ) : (
    <ScreenHeader
      options={{...headerOptions, disableHorizontalInsets: withLeftInset}}
    />
  )

  const customScreenHeader =
    (!isOutsideNavigation && !!bottomSheet) || !!headerOptions

  return (
    <ScreenProvider
      nativeScreenHeader={!customScreenHeader}
      overrideProps={setOverriddenProps}>
      <ExtendAccessCodeValidityOnTap>
        <HideFromAccessibility
          hide={isHiddenFromAccessibility}
          style={styles.screen}
          testID={testID}>
          {!!customScreenHeader && CustomHeader}
          {stickyHeader}
          {!!hasStickyAlert && <AlertTopOfScreen />}
          <HideFromAccessibility
            hide={isContentHiddenFromAccessibility}
            style={[styles.scrollViewContent, styles.scrollView]}>
            <ScreenWrapper
              scrollViewContentStyle={styles.scrollViewContent}
              scrollViewStyle={styles.scrollView}
              trackScroll={trackScroll}
              {...wrapperProps}>
              <ScreenInnerWrapper style={styles.content}>
                {children}
              </ScreenInnerWrapper>
              {!!backgroundOverlay && (
                <ScreenBackgroundOverlay {...backgroundOverlay} />
              )}
            </ScreenWrapper>
          </HideFromAccessibility>
          {(!!stickyFooter || !!bottomSheet) && (
            <>
              {stickyFooter}
              {bottomSheet}
            </>
          )}
          {!!spaceBottom && <View style={{height: spaceBottom}} />}
        </HideFromAccessibility>
      </ExtendAccessCodeValidityOnTap>
    </ScreenProvider>
  )
}

const createStyles = (
  {bottom, left, right, top}: EdgeInsets,
  {
    hasStickyFooter,
    hasStickyHeader,
    withBottomInset,
    withLeftInset,
    withRightInset,
    withTopInset,
  }: {
    hasStickyFooter: boolean
    hasStickyHeader: boolean
  } & WithInsetProps,
) =>
  StyleSheet.create({
    content: {
      flex: 1,
      paddingBottom: withBottomInset && !hasStickyFooter ? bottom : 0,
      paddingTop: withTopInset && !hasStickyHeader ? top : 0,
    },
    scrollView: {
      flex: 1,
      flexGrow: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    screen: {
      flex: 1,
      paddingBottom: withBottomInset && hasStickyFooter ? bottom : 0,
      paddingLeft: withLeftInset ? left : 0,
      paddingRight: withRightInset ? right : 0,
      paddingTop: withTopInset && hasStickyHeader ? top : 0,
    },
  })
