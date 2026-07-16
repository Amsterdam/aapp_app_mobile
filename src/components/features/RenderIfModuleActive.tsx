import type {ReactNode} from 'react'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = {
  FallbackComponent?: ReactNode
  children: ReactNode
  moduleSlug: ModuleSlug
}

export const RenderIfModuleActive = ({
  FallbackComponent,
  moduleSlug,
  children,
}: Props) => {
  const isActive = useIsModuleActive(moduleSlug)

  if (!isActive) {
    return FallbackComponent ?? null
  }

  return children
}
