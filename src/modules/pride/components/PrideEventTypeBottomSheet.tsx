import {useMemo} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {RadioGroupOption} from '@/components/ui/forms/RadioGroup'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {ALL_TYPES_LABEL} from '@/modules/pride/constants'
import {usePrideEventsQuery} from '@/modules/pride/service'

export const PrideEventTypeBottomSheet = () => {
  const {data, isLoading} = usePrideEventsQuery()
  const options: RadioGroupOption<string, string>[] = useMemo(
    () => [
      {label: ALL_TYPES_LABEL, value: ALL_TYPES_LABEL},
      ...Array.from(new Set(data?.map(event => event.type) ?? [])).map(
        type => ({label: type, value: type}),
      ),
    ],
    [data],
  )
  const {close} = useBottomSheet()

  return (
    <Box>
      <Column gutter="md">
        <Row>
          <Title
            level="h5"
            text="Kies een type"
            textAlign="center"
          />
        </Row>
        <RadioGroupControlled
          name="type"
          options={options}
          testID="PrideEventTypeBottomSheet"
        />
        {!!isLoading && (
          <PleaseWait testID="PrideEventTypeBottomSheetPleaseWait" />
        )}
        <Button
          label="Gereed"
          onPress={close}
          testID="PrideEventTypeBottomSheetButton"
        />
      </Column>
    </Box>
  )
}
