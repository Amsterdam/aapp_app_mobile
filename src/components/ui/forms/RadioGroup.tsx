import type {ReactNode} from 'react'
import {OrientationBasedLayout} from '@/components/ui/containers/OrientationBasedLayout'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Radio, type RadioProps} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {LayoutOrientation, type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'

export type RadioGroupOption<T, LabelNode extends ReactNode = string> = {
  disabled?: boolean
  label: LabelNode
  value: T
}

export type RadioGroupProps<T, LabelNode extends ReactNode = string> = {
  errorMessage?: string
  label?: string
  onChange: (value: T) => void
  options: RadioGroupOption<T, LabelNode>[]
  orientation?: LayoutOrientation
  required?: boolean
  /**
   * Log value to analytics service as new state when the selected value changes and as name on the button press event of the option.
   */
  useOptionValuesForLogging?: boolean
  value?: T
} & TestProps &
  LogProps &
  Pick<RadioProps, 'disabledStyle'>

type RadioValue = string | number | boolean

export const RadioGroup = <
  T extends RadioValue,
  LabelNode extends ReactNode = string,
>({
  disabledStyle = 'default',
  errorMessage,
  label,
  options = [],
  onChange,
  orientation = LayoutOrientation.vertical,
  required,
  testID,
  value: valueSerialized,
  logAction = PiwikAction.radioChange,
  useOptionValuesForLogging = false,
  logDimensions = {},
  ...props
}: RadioGroupProps<T, LabelNode>) => {
  const onPress = usePiwikTrackCustomEventFromProps({
    ...props,
    logAction,
    logDimensions,
    onEvent: onChange,
    testID,
  })

  let value: string | number | boolean | undefined

  const shouldSerializeValues = options.some(
    ({value: optionValue}) =>
      typeof optionValue !== 'string' &&
      typeof optionValue !== 'number' &&
      typeof optionValue !== 'boolean',
  )

  if (shouldSerializeValues) {
    value = JSON.stringify(valueSerialized)
  } else {
    value = valueSerialized
  }

  return (
    <Column gutter="md">
      {!!label && (
        <Label
          required={required}
          text={label}
        />
      )}
      <OrientationBasedLayout
        gutter="md"
        orientation={orientation}
        wrap>
        {options.map(
          (
            {
              label: optionLabel,
              value: optionValueRaw,
              disabled: optionDisabled = false,
            },
            index,
          ) => {
            let optionValue: string | number | boolean = ''

            if (shouldSerializeValues) {
              optionValue = JSON.stringify(optionValueRaw)
            } else {
              optionValue = optionValueRaw
            }

            const logName = `${testID}${useOptionValuesForLogging ? optionValue.toString() : index}RadioButton`

            return (
              <Radio
                disabled={optionDisabled}
                disabledStyle={disabledStyle}
                isSelected={value === optionValue}
                key={
                  typeof optionLabel === 'string'
                    ? optionLabel
                    : `option ${index + 1}/${options.length} - value: ${optionValue}`
                }
                label={optionLabel}
                logging-label={logName}
                logName={logName}
                onPress={() =>
                  onPress(
                    optionValueRaw,
                    useOptionValuesForLogging
                      ? {
                          dimensions: {
                            [PiwikDimension.newState]: optionValue.toString(),
                          },
                        }
                      : {},
                  )
                }
                testID={`${testID}${optionValue.toString()}RadioButton`}
              />
            )
          },
        )}
      </OrientationBasedLayout>
      {!!errorMessage && (
        <ErrorMessage
          testID={`${testID}ErrorMessage`}
          text={errorMessage}
        />
      )}
    </Column>
  )
}
