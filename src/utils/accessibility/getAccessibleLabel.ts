import {Children, isValidElement, type ReactNode} from 'react'
import {abbreviationsPronounce} from '@/utils/accessibility/abbreviationsPronounce'

const normalizeAccessibleLabel = (
  ...fragments: (string | undefined | null)[]
) =>
  abbreviationsPronounce(
    fragments.filter(fragment => fragment).join(', '),
  ).replace(/\d{4,}/g, match => match.split('').join(', '))

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
    return normalizeAccessibleLabel(accessibilityLabel)
  }

  const textFragments = Children.toArray(children).flatMap(getTextFragments)

  return textFragments.length > 0
    ? normalizeAccessibleLabel(...textFragments)
    : undefined
}
