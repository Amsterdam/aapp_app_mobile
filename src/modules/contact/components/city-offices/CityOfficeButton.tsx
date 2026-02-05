import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setSelectedCityOffice} from '@/modules/contact/slice'
import {CityOffice} from '@/modules/contact/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  cityOffice: CityOffice
}

export const CityOfficeButton = ({cityOffice}: Props) => {
  const dispatch = useDispatch()
  const {close: closeBottomSheet} = useBottomSheet()

  const selectCityOffice = () => {
    dispatch(setSelectedCityOffice(cityOffice.identifier))

    closeBottomSheet()
  }

  return (
    <Pressable
      onPress={selectCityOffice}
      testID={`ContactCityOffice${cityOffice.identifier}Button`}>
      <Box>
        <Row gutter="md">
          <Icon
            color="link"
            name="person-at-desk"
            size="lg"
            testID={`ContactCityOffice${cityOffice.identifier}Icon`}
          />
          <Title
            color="link"
            level="h5"
            text={cityOffice.title}
          />
        </Row>
      </Box>
    </Pressable>
  )
}
