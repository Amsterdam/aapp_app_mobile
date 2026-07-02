import type {ReactNode} from 'react'
import {OrientationBasedLayout} from '@/components/ui/containers/OrientationBasedLayout'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Radio} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {LayoutOrientation, type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'

export type RadioGroupOption<T, LabelNode extends ReactNode = string> = {
  label: LabelNode
  value: T
}

type RadioGroupProps<T, LabelNode extends ReactNode = string> = {
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
  LogProps

type RadioValue = string | number | boolean

export const RadioGroup = <
  T extends RadioValue,
  LabelNode extends ReactNode = string,
>({
  errorMessage,
  label,
  options = [],
  onChange,
  orientation = LayoutOrientation.vertical,
  required,
  testID,
  value,
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
        {options.map(({label: optionLabel, value: optionValue}, index) => {
          const logName = `${testID}${useOptionValuesForLogging ? optionValue.toString() : index}RadioButton`

          return (
            <Radio
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
                  optionValue,
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
        })}
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
