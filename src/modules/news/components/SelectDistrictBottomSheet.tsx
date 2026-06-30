import {pascalCase} from 'pascal-case'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useNewsDistrictsQuery} from '@/modules/news/service'
import {setSelectedDistrict} from '@/modules/news/slice'

export const SelectDistrictBottomSheet = () => {
  const {data, isLoading} = useNewsDistrictsQuery()
  const districts = data?.data
    ?.slice()
    ?.sort((a, b) => a.name.localeCompare(b.name))
  const dispatch = useDispatch()
  const {close} = useBottomSheet()

  return (
    <BottomSheet testID="NewsDashboardSelectDistrictBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Title
            level="h3"
            text="Stadsdelen"
          />
          <Column gutter="no">
            {isLoading ? (
              <PleaseWait testID="NewsSelectDistrictPleaseWait" />
            ) : (
              districts?.map(district => (
                <Pressable
                  key={district.label}
                  onPress={() => {
                    dispatch(setSelectedDistrict(district.label))
                    close()
                  }}
                  testID={`NewsSelectDistrict${pascalCase(district.label)}Button`}>
                  <Box>
                    <Row gutter="md">
                      <Icon
                        color="link"
                        name="map-marker"
                        size="lg"
                        testID={`NewsSelectDistrict${pascalCase(district.label)}Icon`}
                      />
                      <Title
                        color="link"
                        level="h5"
                        text={district.name}
                      />
                    </Row>
                  </Box>
                </Pressable>
              ))
            )}
          </Column>
        </Column>
      </Box>
    </BottomSheet>
  )
}
