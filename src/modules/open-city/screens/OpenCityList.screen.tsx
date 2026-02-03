import {FormProvider, useForm} from 'react-hook-form'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {OpenCityFilterButton} from '@/modules/open-city/components/FilterButton'
import {FilterIdeasBottomSheet} from '@/modules/open-city/components/FilterIdeasBottomSheet'
import {OpenCityIdeasList} from '@/modules/open-city/components/IdeasList'

export const OpenCityListScreen = () => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <Screen
        bottomSheet={<FilterIdeasBottomSheet />}
        scroll={false}
        testID="OpenCityListScreen">
        <Box grow>
          <Column
            grow={1}
            gutter="md">
            <Row align="between">
              <Button
                iconName="map"
                label="Kaart"
                testID="OpenCityListScreenMapButton"
              />
              <OpenCityFilterButton />
            </Row>
            <OpenCityIdeasList />
          </Column>
        </Box>
      </Screen>
    </FormProvider>
  )
}
