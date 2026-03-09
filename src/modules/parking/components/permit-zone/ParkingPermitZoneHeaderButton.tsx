import {useMemo} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'

export const ParkingPermitZoneHeaderButton = () => {
  const {toggleViewType, viewType, viewVariants} = usePermitMapContext()

  const accessibilityLabel = useMemo(() => {
    if (viewType === 'map') {
      return 'Kaartweergave'
    }

    if (viewType === 'search') {
      return 'Zoekweergave'
    }

    return 'Lijstweergave'
  }, [viewType])

  const iconName: Extract<SvgIconName, 'map' | 'list' | 'search'> = useMemo(
    () => viewVariants.find(variant => variant !== viewType) || 'map',
    [viewType, viewVariants],
  )

  return (
    <IconButton
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
