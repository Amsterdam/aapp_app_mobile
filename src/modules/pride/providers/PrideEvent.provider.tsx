import {useMemo, type PropsWithChildren} from 'react'
import type {MapLegendItem} from '@/components/features/map/MapLegend'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {PRIDE_EVENT_ICON_CONFIG} from '@/modules/pride/constants'
import {usePrideEvents} from '@/modules/pride/hooks/usePrideEvents'
import {PrideEventContext} from '@/modules/pride/providers/PrideEvent.context'
import {devLog} from '@/processes/development'

const EXTRA_LEGEND_ITEM: MapLegendItem = {
  label: 'Evenementen',
  Icon: (
    <CustomMarkerIcon
      icon={PRIDE_EVENT_ICON_CONFIG}
      testID="PrideEventCustomMarkerIcon"
    />
  ),
}

export const PrideEventContextProvider = ({children}: PropsWithChildren) => {
  const {extraPoints} = usePrideEvents()

  return (
    <PrideEventContext.Provider
      value={useMemo(
        () => ({
          extraPoints,
          extraLegendItems: [EXTRA_LEGEND_ITEM],
          onExtraPointPress: id => devLog('Pressed', id),
        }),
        [extraPoints],
      )}>
      {children}
    </PrideEventContext.Provider>
  )
}
