import {useEffect} from 'react'
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'
import {type SwitchProps as SwitchRNProps} from 'react-native'
import {Switch, type SwitchProps} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {type TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props<FormFields extends FieldValues> = SwitchRNProps &
  SwitchProps &
  TestProps &
  UseControllerProps<FormFields>

export const SwitchField = <FormFields extends FieldValues>({
  defaultValue,
  name,
  rules,
  control,
  disabled,
  ...switchProps
}: Props<FormFields>) => {
  const accessibilityAnnounce = useAccessibilityAnnounce()

  const {testID} = switchProps

  const {
    field: {onChange, ...field},
    fieldState: {error},
  } = useController({
    control,
    name,
    defaultValue,
    disabled,
    rules,
  })

  useEffect(() => {
    if (error?.message) {
      accessibilityAnnounce(error.message)
    }
  }, [error, accessibilityAnnounce])

  return (
    <Column gutter="sm">
      <Switch
        {...switchProps}
        {...field}
        onChange={() => onChange(!field.value)}
      />

      {!!error && (
        <Paragraph
          color="warning"
          testID={`${testID}ErrorText`}>
          {error.message}
        </Paragraph>
      )}
    </Column>
  )
}
