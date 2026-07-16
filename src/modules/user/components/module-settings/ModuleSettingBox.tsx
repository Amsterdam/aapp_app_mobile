import {pascalCase} from 'pascal-case'
import type {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export type ModuleSettingBoxProps = {
  children: ReactNode
  slug: ModuleSlug
}

export const ModuleSettingBox = ({children, slug}: ModuleSettingBoxProps) => (
  <Box
    testID={`UserModuleSettings${pascalCase(slug)}Box`}
    variant="distinct">
    {children}
  </Box>
)
