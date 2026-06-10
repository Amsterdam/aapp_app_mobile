import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

const REFETCH_SECTION_HEIGHT = 130

type Props = {
  isFetching: boolean
  lastUpdated?: number
  pendingItemCount: number
  showPendingItems: () => void
}

export const LiveblogUpdateButton = ({
  isFetching,
  showPendingItems,
  pendingItemCount,
  lastUpdated,
}: Props) => {
  if (pendingItemCount === 0 && isFetching) {
    return (
      <Size height={REFETCH_SECTION_HEIGHT}>
        <PleaseWait testID="LiveblogUpdateButtonPleaseWait" />
      </Size>
    )
  }

  return (
    <Size height={REFETCH_SECTION_HEIGHT}>
      {pendingItemCount > 0 ? (
        <Button
          alignSelf="center"
          label={
            pendingItemCount > 1
              ? `Toon ${pendingItemCount} nieuwe berichten`
              : 'Toon nieuw bericht'
          }
          onPress={showPendingItems}
          testID="LiveblogUpdateButton"
        />
      ) : (
        !!lastUpdated && (
          <Phrase
            color="secondary"
            textAlign="center">
            Gecontroleerd op nieuwe berichten om{' '}
            {formatTimeToDisplay(lastUpdated, {includeHoursLabel: true})}
          </Phrase>
        )
      )}
    </Size>
  )
}
