import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {OptionsControlled} from '@/components/ui/forms/OptionsControlled'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {QuestionType} from '@/modules/survey/types'

export const FilterIdeasBottomSheet = () => (
  <BottomSheet testID="OpenCityListFilterIdeasBottomSheet">
    <Box>
      <Column gutter="md">
        <Title
          level="h5"
          text="Categorie"
        />
        <OptionsControlled
          name="category"
          options={[
            {label: 'Zorg', value: 'care'},
            {label: 'Kans/idee', value: 'opportunity'},
            {label: 'Kwaliteit', value: 'quality'},
            {label: 'Alle categorieën', value: 'all'},
          ]}
          testID="OpenCityListFilterIdeasRadioGroup"
          type={QuestionType.radio}
        />
      </Column>
    </Box>
  </BottomSheet>
)
