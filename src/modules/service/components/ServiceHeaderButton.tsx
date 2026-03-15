import {useMemo} from 'react'
import {MapViewVariant} from '@/components/features/map/MapViewSwitchContext'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'

export const ServiceHeaderButton = () => {
  const {viewType, toggleViewType} = useMapViewSwitch()

  const accessibilityLabel = useMemo(() => {
    if (viewType === MapViewVariant.map) {
      return 'Toon lijstweergave'
    }

    return 'Toon kaartweergave'
  }, [viewType])

  return (
    <IconButton
      accessibilityHint="Wissel van weergave"
      accessibilityLabel={accessibilityLabel}
      icon={
        <Icon
          color="link"
          name={viewType === MapViewVariant.map ? 'list' : 'map'}
          size="lg"
        />
      }
      onPress={toggleViewType}
      testID="ParkingPermitZoneHeaderButton"
    />
  )
}
