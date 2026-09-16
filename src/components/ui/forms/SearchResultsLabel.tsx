import simplur from 'simplur'
import type {TestProps} from '@/components/ui/types'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {hasSearchText: boolean; numberOfResults: number} & TestProps

export const SearchResultsLabel = ({
  testID,
  numberOfResults,
  hasSearchText,
}: Props) => {
  const resultsLabel = simplur`${numberOfResults} zoekresulta[at|ten]`

  useAccessibilityAnnounceEffect(resultsLabel)
  if (!hasSearchText) return null

  return <Paragraph testID={testID}>{resultsLabel}</Paragraph>
}
