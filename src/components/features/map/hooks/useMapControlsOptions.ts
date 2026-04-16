import {useMemo} from 'react'
import {Platform} from 'react-native'
import type {ModuleSlug} from '@/modules/slugs'
import {useMapControlsLocationButton} from '@/components/features/map/hooks/useMapControlsLocationButton'
import {
  MapControlBottomSheetKey,
  useMapControlsToggleBottomSheetButton,
} from '@/components/features/map/hooks/useMapControlsToggleBottomSheetButton'
import {ControlVariant, MapControlOption} from '@/components/features/map/types'
import {Permissions} from '@/types/permissions'

export const useMapControlsOptions = (
  options: ControlVariant[],
  moduleSlug: ModuleSlug,
) => {
  const {onPressLocationButton, icon: locationIcon} =
    useMapControlsLocationButton(moduleSlug)
  const {onPressControlButton: onPressLegendButton} =
    useMapControlsToggleBottomSheetButton(MapControlBottomSheetKey.legend)
  const {onPressControlButton: onPressLayersButton} =
    useMapControlsToggleBottomSheetButton(MapControlBottomSheetKey.layers)

  const controlOptions: Record<
    ControlVariant,
    MapControlOption & {requiresPermission?: Permissions}
  > = useMemo(
    () => ({
      [ControlVariant.location]: {
        accessibilityLabel: 'Mijn locatie',
        icon: {...locationIcon},
        key: ControlVariant.location,
        onPress: onPressLocationButton,
        testID: 'MapControlsLocationButton',
      },
      [ControlVariant.legend]: {
        accessibilityLabel: 'Legenda weergeven',
        icon: {name: 'layers'},
        key: ControlVariant.legend,
        onPress: onPressLegendButton,
        testID: 'MapControlsLegendButton',
      },
      [ControlVariant.layers]: {
        accessibilityLabel: 'Kaartlagen weergeven',
        icon: {name: 'layers'},
        text: 'Kaartlagen',
        key: ControlVariant.layers,
        onPress: onPressLayersButton,
        testID: 'MapControlsLayersButton',
      },
    }),
    [
      locationIcon,
      onPressLocationButton,
      onPressLegendButton,
      onPressLayersButton,
    ],
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
