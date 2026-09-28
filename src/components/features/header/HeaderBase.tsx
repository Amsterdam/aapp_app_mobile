import {ReactNode, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {HeaderProps} from '@/components/features/header/types'
import {Box} from '@/components/ui/containers/Box'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ExtendAccessCodeValidityOnTap} from '@/modules/access-code/components/ExtendAccessCodeValidityOnTap'
import {setHeaderHeight, useScreen} from '@/store/slices/screen'

type BackgroundColorProp = Pick<HeaderProps, 'backgroundColor'>

type Props = {
  children: ReactNode
  disableHorizontalInsets?: boolean
} & BackgroundColorProp

export const HeaderBase = ({
  backgroundColor,
  children,
  disableHorizontalInsets,
}: Props) => {
  const {top, ...insets} = useSafeAreaInsets()
  const {left = 0, right = 0} = disableHorizontalInsets ? {} : insets
  const {isContentHiddenFromAccessibility, isHiddenFromAccessibility} =
    useScreen()
  const styles = useMemo(
    () => createStyles({backgroundColor, top, left, right}),
    [backgroundColor, top, left, right],
  )
  const dispatch = useDispatch()

  return (
    <HideFromAccessibility
      hide={isContentHiddenFromAccessibility || isHiddenFromAccessibility}
      onLayout={layout =>
        dispatch(setHeaderHeight(layout.nativeEvent.layout.height))
      }
      style={styles.header}>
      <ExtendAccessCodeValidityOnTap>
        <Box>{children}</Box>
      </ExtendAccessCodeValidityOnTap>
    </HideFromAccessibility>
  )
}

const createStyles = ({
  top,
  left,
  right,
  backgroundColor,
}: Omit<EdgeInsets, 'bottom'> & BackgroundColorProp) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: left,
      paddingRight: right,
      backgroundColor,
    },
  })
