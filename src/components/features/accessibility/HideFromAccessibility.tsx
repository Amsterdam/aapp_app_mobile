import {ReactNode} from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
  Element?: React.ElementType
  children: ReactNode
  hide?: boolean
} & ViewProps

/**
 * Use to hide content for accessibility.
 */
export const HideFromAccessibility = ({
  children,
  hide = true,
  Element = View,
  ...viewProps
}: Props) => (
  <Element
    accessibilityElementsHidden={hide}
    importantForAccessibility={hide ? 'no-hide-descendants' : 'auto'}
    {...viewProps}>
    {children}
  </Element>
)
