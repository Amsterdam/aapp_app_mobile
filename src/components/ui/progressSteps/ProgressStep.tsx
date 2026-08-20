import {ReactNode} from 'react'
import {View} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {ProgressStepConnector} from '@/components/ui/progressSteps/ProgressStepConnector'
import {ProgressStepIndicator} from '@/components/ui/progressSteps/ProgressStepIndicator'
import {
  ProgressStatus,
  ProgressStepsVariant,
} from '@/components/ui/progressSteps/types'
import {TestProps} from '@/components/ui/types'

type Props = {
  accessible?: boolean
  children: ReactNode
  isExpanded?: boolean
  numberIndicator?: number
  progressStatus: ProgressStatus
  progressStatusNextItem?: ProgressStatus
  variant: ProgressStepsVariant
} & TestProps

export const ProgressStep = ({
  children,
  isExpanded = false,
  numberIndicator,
  progressStatus,
  progressStatusNextItem,
  testID,
  variant,
  accessible = true,
}: Props) => (
  <View testID={testID}>
    <Row
      gutter="md"
      valign="start">
      <ProgressStepIndicator
        accessible={accessible}
        numberIndicator={numberIndicator}
        progressStatus={progressStatus}
        variant={variant}
      />
      {children}
    </Row>
    {(!!progressStatusNextItem || !!isExpanded) && (
      <>
        <Gutter height="xl" />
        <ProgressStepConnector
          progressStatus={progressStatus}
          progressStatusNextItem={progressStatusNextItem}
          variant={variant}
        />
      </>
    )}
  </View>
)
