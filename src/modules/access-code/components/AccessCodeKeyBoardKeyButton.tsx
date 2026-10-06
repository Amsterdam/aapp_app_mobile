import {Text, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {IconSize} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  accessibilityLabel?: string
  iconName?: SvgIconName
  iconSize?: keyof typeof IconSize
  keyNumber?: number
  onPress: () => void
}

export const AccessCodeKeyBoardKey = ({
  accessibilityLabel,
  iconName,
  iconSize,
  keyNumber,
  onPress,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      logName="AccessCodeKeyBoardKeyButton"
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        iconName && styles.transparent,
        pressed && !iconName && styles.pressed,
      ]}
      testID={`AccessCodeKeyBoardKey${keyNumber ?? iconName}Button`}>
      {!!iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          testID="AccessCodeKeyBoardKeyIcon"
        />
      )}
      {typeof keyNumber === 'number' && (
        <Text
          style={styles.text}
          testID="AccessCodeKeyBoardKeyText">
          {keyNumber}
        </Text>
      )}
    </Pressable>
  )
}

const WIDTH = 115

const HEIGHT = 44

const createStyles = ({color, shadow: {customKeyboardButton}, text}: Theme) => {
  const {background, pressed, shadow: shadowColor} = color.customKeyboard.button

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: background,
      justifyContent: 'center',
      width: WIDTH,
      height: HEIGHT,
      borderRadius: 4,
      shadowColor,
      shadowOffset: customKeyboardButton.offset,
      shadowOpacity: customKeyboardButton.opacity,
      shadowRadius: customKeyboardButton.radius,
      elevation: customKeyboardButton.elevation,
    },
    pressed: {
      backgroundColor: pressed.background,
    },
    transparent: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      elevation: undefined,
    },
    text: {
      fontSize: text.fontSize.h2,
    },
  })
}
