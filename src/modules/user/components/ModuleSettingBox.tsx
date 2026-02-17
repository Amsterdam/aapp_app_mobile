import {pascalCase} from 'pascal-case'
import type {ModuleSlug} from '@/modules/slugs'
import type {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'

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
