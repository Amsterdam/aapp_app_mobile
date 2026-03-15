import {useMemo} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'

export const ParkingPermitZoneHeaderButton = () => {
  const {toggleViewType, viewType, variants} = useMapViewSwitch()

  const iconName: Extract<SvgIconName, 'map' | 'list' | 'search'> = useMemo(
    () => variants.find(variant => variant !== viewType) || 'map',
    [viewType, variants],
  )

  const accessibilityLabel = useMemo(() => {
    if (iconName === 'map') {
      return 'Toon kaartweergave'
    }

    if (iconName === 'search') {
      return 'Toon zoekweergave'
    }

    return 'Toon lijstweergave'
  }, [iconName])

  const accessibilityHint = 'Wissel van weergave'

  return (
    <IconButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      icon={
        <Icon
          color="link"
          name={iconName}
          size="lg"
        />
      }
      onPress={toggleViewType}
      testID="ParkingPermitZoneHeaderButton"
    />
  )
}
