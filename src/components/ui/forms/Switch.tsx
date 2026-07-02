import {type ElementType, Fragment, type ReactNode} from 'react'
import {
  SwitchProps as SwitchRNProps,
  type GestureResponderEvent,
  type SwitchChangeEvent,
} from 'react-native'
import {Switch as SwitchRN} from 'react-native-gesture-handler'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {FormField} from '@/components/ui/forms/FormField'
import {Column} from '@/components/ui/layout/Column'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useTheme} from '@/themes/useTheme'

export type SwitchProps = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onChange?: (event?: SwitchChangeEvent | GestureResponderEvent) => void
  wrapper?: ElementType
} & Omit<SwitchRNProps, 'onChange'> &
  LogProps &
  TestProps

/**
 * Wraps a switch with its label in a row and takes care of accessibility.
 */
export const Switch = ({
  accessibilityLabel = '',
  disabled = false,
  label,
  labelPosition = 'start',
  logAction = PiwikAction.toggle,
  logDimensions = {},
  onChange,
  testID,
  value,
  wrapper: Wrapper = Fragment,
  ...switchProps
}: SwitchProps) => {
  const {color} = useTheme()
  const onPress = usePiwikTrackCustomEventFromProps({
    ...switchProps,
    logAction,
    logDimensions: {
      ...logDimensions,
      // new state is the inverse of value
      [PiwikDimension.newState]: value ? 'unchecked' : 'checked',
    },
    onEvent: onChange,
    testID,
  })

  return (
    <PressableBase
      accessibilityHint="Dubbel tik om dit aan of uit te zetten"
      accessibilityLabel={
        accessibilityLabel || `Dit onderdeel staat ${value ? 'aan' : 'uit'}`
      }
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      aria-disabled={disabled}
      onPress={onPress}
      testID={testID}>
      <Wrapper>
        <FormField
          label={label}
          labelPosition={labelPosition}>
          <Column>
            <SwitchRN
              accessibilityElementsHidden
              accessibilityState={{checked: value}}
              importantForAccessibility="no-hide-descendants"
              ios_backgroundColor={color.switch.track.off.background}
              onChange={onPress}
              thumbColor={
                color.switch.thumb[disabled ? 'disabled' : 'enabled'].background
              }
              trackColor={{
                false: color.switch.track.off.background,
                true: color.switch.track.on.background,
              }}
              value={value}
              {...switchProps}
            />
          </Column>
        </FormField>
      </Wrapper>
    </PressableBase>
  )
}
