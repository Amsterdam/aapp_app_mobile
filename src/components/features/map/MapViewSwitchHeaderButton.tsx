import {useMemo} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {TestProps} from '@/components/ui/types'
import {MapViewVariant} from '@/components/features/map/MapViewSwitchContext'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'

export const MapViewSwitchHeaderButton = ({testID}: TestProps) => {
  const {toggleViewType, viewType, variant} = useMapViewSwitch()

  const iconName: Extract<SvgIconName, 'map' | 'list' | 'search'> = useMemo(
    () => (viewType === MapViewVariant.map ? variant : 'map'),
    [viewType, variant],
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

  return (
    <IconButton
      accessibilityHint="Wissel van weergave"
      accessibilityLabel={accessibilityLabel}
      icon={
        <Icon
          color="link"
          name={iconName}
          size="lg"
        />
      }
      onPress={toggleViewType}
      testID={testID}
    />
  )
}
