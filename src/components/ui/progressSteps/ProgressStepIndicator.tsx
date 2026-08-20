import {StyleSheet, View, Text} from 'react-native'
import {Icon} from '@/components/ui/media/Icon'
import {
  ProgressStatus,
  ProgressStepsVariant,
} from '@/components/ui/progressSteps/types'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  accessible?: boolean
  numberIndicator?: number
  progressStatus: ProgressStatus
  variant: ProgressStepsVariant
}

export const ProgressStepIndicator = ({
  progressStatus,
  numberIndicator,
  variant,
  accessible = true,
}: Props) => {
  const theme = useTheme()
  const {fontScale} = useDeviceContext()
  const styles = createStyles(theme, fontScale, progressStatus, variant)

  const TextComponent = accessible ? AccessibleText : Text

  return (
    <View
      style={styles.indicator}
      testID="ProgressStepIndicator">
      {progressStatus === 'done' && (
        <Icon
          color="inverse"
          name="check-mark"
          size={variant === 'primary' ? 'sm' : 'md'}
          testID="ProgressStepIndicatorDoneIcon"
        />
      )}
      {!!numberIndicator && progressStatus !== 'done' && (
        <TextComponent
          style={styles.text}
          testID="ProgressStepIndicatorNumberLabel">
          {numberIndicator}
        </TextComponent>
      )}
    </View>
  )
}

const createStyles = (
  {color, size, text}: Theme,
  fontScale: number,
  status: Props['progressStatus'],
  variant: Props['variant'],
) => {
  const scaledIndicatorSize = size.progressSteps[variant].indicator * fontScale

  return StyleSheet.create({
    indicator: {
      width: scaledIndicatorSize,
      height: scaledIndicatorSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        color.progressSteps[variant].indicator[status].background,
      borderWidth: variant === 'secondary' ? 2 : undefined,
      borderColor:
        'border' in color.progressSteps[variant].indicator[status]
          ? color.progressSteps[variant].indicator[status].border
          : undefined,
      borderRadius: scaledIndicatorSize / 2,
    },
    text: {
      alignSelf: 'center',
      color:
        status === 'planned'
          ? color.progressSteps.secondary.indicator.planned.label
          : color.progressSteps.secondary.indicator.active.label,
      fontFamily: text.fontFamily.bold,
      fontSize: text.fontSize.h5,
    },
  })
}
