import {HeaderBase} from '@/components/features/header/HeaderBase'
import type {HeaderProps} from '@/components/features/header/types'
import {Row} from '@/components/ui/layout/Row'
import {AmsterdamLogoSvg} from '@/modules/home/components/AmsterdamLogoSvg'
import {HeaderNavigation} from '@/modules/home/components/HeaderNavigation'

type Props = Pick<HeaderProps, 'options'>

export const HeaderForHome = ({options}: Props) => (
  <HeaderBase disableHorizontalInsets={options?.disableHorizontalInsets}>
    <Row
      align="between"
      gutter="md">
      <AmsterdamLogoSvg
        accessibilityLabel="Gemeente Amsterdam"
        accessibilityRole="header"
        accessible
      />
      <HeaderNavigation />
    </Row>
  </HeaderBase>
)
