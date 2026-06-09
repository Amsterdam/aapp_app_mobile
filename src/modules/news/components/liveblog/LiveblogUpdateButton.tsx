import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {dayjs} from '@/utils/datetime/dayjs'

const REFETCH_SECTION_HEIGHT = 130

export const LiveblogUpdateButton = ({
  isFetching,
  showPendingItems,
  pendingItemCount,
  lastUpdated,
}: {
  isFetching: boolean
  lastUpdated?: number
  pendingItemCount: number
  showPendingItems: () => void
}) => {
  if (isFetching) {
    return (
      <Size height={REFETCH_SECTION_HEIGHT}>
        <PleaseWait testID="LiveblogUpdateButtonPleaseWait" />
      </Size>
    )
  }

  return (
    <Size height={REFETCH_SECTION_HEIGHT}>
      {pendingItemCount ? (
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
        <Phrase
          color="secondary"
          textAlign="center">
          Gecontroleerd op nieuwe berichten om{' '}
          {dayjs(lastUpdated).format('HH.mm')} uur
        </Phrase>
      )}
    </Size>
  )
}
