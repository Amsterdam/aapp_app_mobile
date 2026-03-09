import {useMemo} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'

export const ParkingPermitZoneHeaderButton = () => {
  const {toggleViewType, viewType, viewVariants} = usePermitMapContext()

  const iconName: Extract<SvgIconName, 'map' | 'list' | 'search'> = useMemo(
    () => viewVariants.find(variant => variant !== viewType) || 'map',
    [viewType, viewVariants],
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
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
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
