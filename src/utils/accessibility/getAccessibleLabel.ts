import {Children, isValidElement, type ReactNode} from 'react'
import {abbreviationsPronounce} from '@/utils/accessibility/abbreviationsPronounce'

const injectCommas = (...fragments: (string | undefined | null)[]) =>
  fragments.filter(fragment => fragment).join(', ')

export const accessibleText = (...fragments: (string | undefined | null)[]) =>
  abbreviationsPronounce(injectCommas(...fragments))

const getTextFragments = (children: ReactNode): string[] => {
  if (typeof children === 'string' || typeof children === 'number') {
    return [String(children)]
  }

  if (!children) {
    return []
  }

  if (Array.isArray(children)) {
    return children.flatMap(getTextFragments)
  }

  if (isValidElement<{children?: ReactNode}>(children)) {
    return getTextFragments(children.props.children)
  }

  return []
}

export const getAccessibleLabel = ({
  accessibilityLabel,
  children,
}: {
  accessibilityLabel?: string
  children?: ReactNode
}) => {
  if (accessibilityLabel !== undefined) {
    return accessibleText(accessibilityLabel)
  }

  const textFragments = Children.toArray(children).flatMap(getTextFragments)

  return textFragments.length > 0 ? accessibleText(...textFragments) : undefined
}
