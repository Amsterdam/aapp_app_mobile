import {ComponentType} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation/types'
import {modals as modalsGenerated} from '@/modules/generated/modals.generated'
import {stacks as stacksGenerated} from '@/modules/generated/stacks.generated'
import {devError} from '@/processes/development'

export type {ModuleStackParams} from '@/modules/generated/moduleStackParams.generated'
export type {ModalParams} from '@/modules/generated/moduleModalParams.generated'

export const modals: StackNavigationRoutes<RootStackParams> = modalsGenerated
const stacks: Record<ModuleSlug, ComponentType<unknown>> = stacksGenerated

export const getModuleStack = (
  slug: ModuleSlug,
): ComponentType<unknown> | null => {
  const stack = stacks[slug]

  if (stack) {
    return stack
  }

  devError(
    `Stack not found for module with slug ${slug}. Add it to @/modules/stacks.ts.`,
  )

  return null
}
