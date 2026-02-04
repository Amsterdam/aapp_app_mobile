import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'

export const ReportProblemTypesBottomSheetContent = () => (
  <Box>
    <Column gutter="md">
      <Title
        level="h4"
        text="Dit kunt u melden"
      />
      <List
        gutter="xs"
        items={[
          'afval op straat',
          'volle of kapotte afvalcontainers en prullenbakken',
          'kapotte fietsen',
          'geluidsoverlast',
          'losse stoeptegels',
          'kapotte verkeerslichten, lantaarnpalen en klokken',
          'overlast van verkeer',
          'overlast van mensen',
        ]}
        testID="ReportProblemScreenProblemTypesList"
      />
    </Column>
  </Box>
)
