import type {Dayjs} from 'dayjs'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'

const REFETCH_SECTION_HEIGHT = 130

export const LiveblogUpdateButton = ({
  isFetching,
  loadNewItems,
  newItemCount,
  lastCheckedTimestamp,
}: {
  isFetching: boolean
  lastCheckedTimestamp: Dayjs
  loadNewItems: () => void
  newItemCount: number
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
      {newItemCount ? (
        <Button
          alignSelf="center"
          label={
            newItemCount > 1
              ? `Toon ${newItemCount} nieuwe berichten`
              : 'Toon nieuw bericht'
          }
          onPress={() => loadNewItems()}
          testID="LiveblogUpdateButton"
        />
      ) : (
        <Phrase
          color="secondary"
          textAlign="center">
          Gecontroleerd op nieuwe berichten om{' '}
          {lastCheckedTimestamp.format('HH.mm')} uur
        </Phrase>
      )}
    </Size>
  )
}
