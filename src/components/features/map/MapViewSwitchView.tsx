import type {EmptyObject} from '@/types/utils'
import type {ComponentType} from 'react'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'

type ViewComponent<P extends object = EmptyObject> = ComponentType<P>

type ComponentMap<P extends object> = {
  [MapViewVariant.map]: ViewComponent<P>
} & (
  | {
      [MapViewVariant.list]: ViewComponent<P>
      [MapViewVariant.search]?: ViewComponent<P>
    }
  | {
      [MapViewVariant.list]?: ViewComponent<P>
      [MapViewVariant.search]: ViewComponent<P>
    }
)

type Props<P extends object = EmptyObject> = P & {
  /**
   * A mapping of components defining which components to render per viewType
   */
  componentMap: ComponentMap<P>
}

export const MapViewSwitchView = <P extends object = EmptyObject>(
  props: Props<P>,
) => {
  const {componentMap, ...rest} = props
  const {viewType} = useMapViewSwitch()

  const Component =
    viewType === MapViewVariant.map
      ? componentMap[MapViewVariant.map]
      : componentMap[viewType]

  if (!Component) {
    throw new Error(`No Component is defined for ${viewType}.`)
  }

  return <Component {...(rest as P)} />
}
