import {Children, isValidElement, type ReactNode} from 'react'
import {abbreviationsPronounce} from '@/utils/accessibility/abbreviationsPronounce'

const injectCommas = (...fragments: (string | undefined | null)[]) =>
  fragments.filter(fragment => fragment).join(', ')

export const accessibleText = (...fragments: (string | undefined | null)[]) =>
  abbreviationsPronounce(injectCommas(...fragments)).replace(/\d{5,}/g, match =>
    match.split('').join(', '),
  )

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

  if (isValidElement(children)) {
    const props = children.props as {children?: ReactNode; text?: unknown}
    const fragments: string[] = []

    if (typeof props.text === 'string' || typeof props.text === 'number') {
      fragments.push(String(props.text))
    }

    fragments.push(...getTextFragments(props.children))

    return fragments
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
