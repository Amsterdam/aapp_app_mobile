import {useMemo} from 'react'
import {Platform} from 'react-native'
import type {ModuleSlug} from '@/modules/slugs'
import {useMapControlsLegendButton} from '@/components/features/map/hooks/useMapControlsLegendButton'
import {useMapControlsLocationButton} from '@/components/features/map/hooks/useMapControlsLocationButton'
import {ControlVariant, MapControlOption} from '@/components/features/map/types'
import {Permissions} from '@/types/permissions'

export const useMapControlsOptions = (
  options: ControlVariant[],
  moduleSlug: ModuleSlug,
) => {
  const {onPressLocationButton, icon: locationIcon} =
    useMapControlsLocationButton(moduleSlug)
  const {onPressLegendButton} = useMapControlsLegendButton()

  const controlOptions: Record<
    ControlVariant,
    MapControlOption & {requiresPermission?: Permissions}
  > = useMemo(
    () => ({
      [ControlVariant.location]: {
        accessibilityLabel: 'Mijn locatie',
        iconName: locationIcon.name,
        key: ControlVariant.location,
        onPress: onPressLocationButton,
        testID: 'MapControlsLocationButton',
      },
      [ControlVariant.legend]: {
        accessibilityLabel: 'Legenda weergeven',
        iconName: 'layers',
        key: ControlVariant.legend,
        onPress: onPressLegendButton,
        testID: 'MapControlsLegendButton',
      },
    }),
    [locationIcon.name, onPressLocationButton, onPressLegendButton],
  )

  return useMemo(
    () =>
      options
        .filter(
          option =>
            option !== ControlVariant.location || Platform.OS !== 'android', // Need because issue in package https://github.com/react-native-maps/react-native-maps/issues/5695
        )
        .map(option => controlOptions[option]),
    [options, controlOptions],
  )
}
