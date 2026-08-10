import type {TestProps} from '@/components/ui/types'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'

type Props = {
  isLoading: boolean
  noResultsMessage: string
  searchText: string
}

export const ListEmptyComponent = ({
  isLoading,
  searchText,
  noResultsMessage,
}: Props) => {
  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="ConstructionWorkListLoadingSpinner"
      />
    )
  }

  if (searchText !== '') {
    return (
      <ListEmptyMessage
        testID="ConstructionWorkListEmptyMessage"
        text={noResultsMessage}
      />
    )
  }

  return null
}

type ListEmptyMessageProps = {
  text: string
} & TestProps

const ListEmptyMessage = ({testID, text}: ListEmptyMessageProps) => (
  <Box insetHorizontal="md">
    <EmptyMessage
      testID={testID}
      text={text}
    />
  </Box>
)
