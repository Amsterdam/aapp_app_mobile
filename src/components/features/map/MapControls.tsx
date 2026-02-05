import type {ModuleSlug} from '@/modules/slugs'
import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {useMapControlsOptions} from '@/components/features/map/hooks/useMapControlsOptions'
import {type ControlVariant} from '@/components/features/map/types'
import {Column} from '@/components/ui/layout/Column'

type Props = {
  moduleSlug: ModuleSlug
  variants: ControlVariant[]
}

export const MapControls = ({moduleSlug, variants}: Props) => {
  const options = useMapControlsOptions(variants, moduleSlug)

  return (
    <Column gutter="sm">
      {options.map(({key, ...props}) => (
        <MapControlsButton
          key={key}
          {...props}
        />
      ))}
    </Column>
  )
}
