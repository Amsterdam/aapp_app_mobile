import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {useGetWasteGuideRecyclePointsQuery} from '@/modules/waste-guide/service'
import {useActiveRecyclePointId} from '@/modules/waste-guide/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const WasteGuideSelectRecyclePoint = () => {
  const focusRef = useSetBottomSheetElementFocus()
  const {data: recyclePoints, isLoading} = useGetWasteGuideRecyclePointsQuery()
  const {setActiveRecyclePointId} = useActiveRecyclePointId()
  const {close} = useBottomSheet()

  const onPress = useCallback(
    (id: number) => {
      setActiveRecyclePointId(id)
      close()
    },
    [close, setActiveRecyclePointId],
  )

  if (isLoading) {
    return <PleaseWait testID="WasteGuideSelectRecyclePointsLoadingSpinner" />
  }

  if (!recyclePoints) {
    return (
      <SomethingWentWrong testID="WasteGuideSelectRecyclePointsSomethingWentWrong" />
    )
  }

  return (
    <Box grow>
      <Title
        accessibilityHint="Selecteer een recyclepunt"
        level="h3"
        ref={focusRef}
        text="Recyclepunten"
      />
      <Gutter height="md" />
      {recyclePoints.map(({address, commercialWaste, id, name}) => (
        <TopTaskButton
          icon={{name: 'recycle'}}
          key={id}
          onPress={() => onPress(id)}
          testID={`RecyclePoint${id}Button`}
          text={
            address.cityDistrict
              ? `${address.cityDistrict}${commercialWaste ? '' : ' (geen bedrijfsafval)'}`
              : undefined
          }
          title={name}
        />
      ))}
    </Box>
  )
}
