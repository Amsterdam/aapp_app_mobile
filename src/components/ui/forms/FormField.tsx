import {ReactNode} from 'react'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Row} from '@/components/ui/layout/Row'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {layoutStyles} from '@/styles/layoutStyles'

type Props = {
  children: ReactNode
  label: ReactNode
  labelPosition?: MainAxisPosition
}

type LabelProps = {children: ReactNode}
const Label = ({children}: LabelProps) => (
  <HideFromAccessibility style={[layoutStyles.grow, layoutStyles.shrink]}>
    {children}
  </HideFromAccessibility>
)

export const FormField = ({
  children,
  label,
  labelPosition = 'start',
}: Props) => {
  const labelComponent = <Label>{label}</Label>

  return (
    <Row gutter="md">
      {labelPosition === 'start' && labelComponent}
      {children}
      {labelPosition === 'end' && labelComponent}
    </Row>
  )
}
