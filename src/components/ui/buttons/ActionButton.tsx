import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {PressableBaseProps} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {IconSize} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  icon: IconProps
  isModuleInactive: boolean
  label: string
} & PressableBaseProps

const BUTTON_SIZE = 60
const ICON_SIZE = 'xl'

export const ActionButton = ({
  icon,
  label,
  isModuleInactive,
  ...props
}: Props) => {
  const {testID} = props

  const styles = useThemable(createStyles(isModuleInactive))

  return (
    <View
      accessibilityLabel={`Actieknop. ${label}`}
      accessibilityRole="link"
      accessible>
      <Column
        gutter="sm"
        halign="center">
        <IconButton
          badgeColor="info"
          badgeInsetsExtra={{
            top: -(BUTTON_SIZE - IconSize[ICON_SIZE]) / 2.5, // 2.5 instead of 2 for better alignment of the badge
            right: -(BUTTON_SIZE - IconSize[ICON_SIZE]) / 2.5,
          }}
          badgeValue={isModuleInactive ? '!' : undefined}
          style={styles.button}
          {...props}
          icon={
            <Icon
              color="inverse"
              size="xl"
              {...icon}
              testID={`${testID}Icon`}
            />
          }
        />
        <Phrase
          color="link"
          emphasis="strong"
          opacity={isModuleInactive ? 0.7 : undefined}
          testID={`${testID}Phrase`}
          textAlign="center"
          variant="small">
          {label}
        </Phrase>
      </Column>
    </View>
  )
}

const createStyles =
  (isModuleInactive: boolean) =>
  ({color}: Theme) =>
    StyleSheet.create({
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.pressable.primary.default.background,
        opacity: isModuleInactive ? 0.7 : undefined,
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
        borderRadius: '50%',
      },
    })
