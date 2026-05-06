import type {EmptyObject} from '@/types/utils'
import type {ComponentType} from 'react'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ViewComponent = ComponentType<any>
type Props<AdditionalProps extends Record<string, unknown> = EmptyObject> = {
  /**
   * A mapping of components defining which components to render per viewType
   */
  componentMap: {
    [MapViewVariant.map]: ViewComponent
  } & (
    | {
        [MapViewVariant.list]: ViewComponent
        [MapViewVariant.search]?: ViewComponent
      }
    | {
        [MapViewVariant.list]?: ViewComponent
        [MapViewVariant.search]: ViewComponent
      }
  )
} & AdditionalProps

export const MapViewSwitchView = <
  AdditionalProps extends Record<string, unknown> = EmptyObject,
>({
  componentMap,
  ...props
}: Props<AdditionalProps>) => {
  const {viewType} = useMapViewSwitch()

  const ViewComponent =
    viewType === MapViewVariant.map
      ? componentMap[MapViewVariant.map]
      : componentMap[viewType]

  if (!ViewComponent) {
    throw new Error(`No Component is defined for ${viewType}.`)
  }

  return <ViewComponent {...props} />
}
