import {FormProvider, useForm} from 'react-hook-form'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {MapSelectorControlled} from '@/components/ui/forms/MapSelectorControlled'

export const OpenCityFormScreen = () => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <Screen testID="OpenCityFormScreen">
        <Box>
          <MapSelectorControlled
            label="Locatie"
            mapHeight={300}
            name="location"
            rules={{required: true}}
            testID="FeedbackMapFormField"
          />
        </Box>
      </Screen>
    </FormProvider>
  )
}
