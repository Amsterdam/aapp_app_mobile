import {BottomSheetLabelValueRow} from '@/components/features/bottom-sheet/BottomSheetLabelValueRow'
import {Divider} from '@/components/ui/Divider'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'

type Props = {
  rows: Array<{
    key: string | number
    value: string | number
  }>
  showDividers?: boolean
  title?: string | null
}

export const BottomSheetKeyValueTable = ({
  title,
  showDividers = false,
  rows,
}: Props) => (
  <Column gutter="sm">
    {!!title && (
      <Title
        level="h5"
        text={title}
      />
    )}

    {rows.map((row, rowIndex) => {
      if (
        isObjectWithKeys(row, {
          key: ['string', 'number'],
          value: ['string', 'number'],
        })
      ) {
        return (
          <>
            {!!showDividers && rowIndex > 0 && (
              <Divider
                color="emphasis"
                height="md"
                key={`BottomSheetKeyValueTable-${rowIndex}-divider`}
              />
            )}
            <BottomSheetLabelValueRow
              key={`BottomSheetKeyValueTable-${rowIndex}`}
              label={row.key}
              value={row.value}
            />
          </>
        )
      }

      return null
    })}
  </Column>
)
