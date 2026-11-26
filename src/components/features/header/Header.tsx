import {HeaderBase} from '@/components/features/header/HeaderBase'
import {HeaderContent} from '@/components/features/header/HeaderContent'
import {HeaderProps} from '@/components/features/header/types'

export const Header = (props: HeaderProps) => (
  <HeaderBase
    backgroundColor={props.backgroundColor}
    disableHorizontalInsets={props.options?.disableHorizontalInsets}>
    <HeaderContent {...props} />
  </HeaderBase>
)
