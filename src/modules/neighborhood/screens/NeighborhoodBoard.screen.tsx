import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressRouteName} from '@/modules/address/routes'
import {useMyAddress} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {NeighborhoodBoardItem} from '@/modules/neighborhood/components/NeighborhoodBoardItem'
import {useGetNeighborhoodNotesQuery} from '@/modules/neighborhood/service'

export const NeighborhoodBoardScreen = () => (
  <Screen
    scroll
    testID="NeighborhoodBoardScreen"
    withBottomInset={false}>
    <NeighborhoodBoard />
  </Screen>
)

const NeighborhoodBoard = () => {
  const myAddress = useMyAddress()

  const navigation = useNavigation()

  const {
    data: boardItems,
    isLoading,
    isError,
  } = useGetNeighborhoodNotesQuery({lat: 52.372, lng: 4.966})

  if (!myAddress?.postcode) {
    Alert.alert(
      'Voer uw adres in',
      'Om items op het buurt prikbord te zien moet u eerst uw adres invoeren.',
      [
        {
          text: 'Ga naar mijn adres',
          isPreferred: true,
          onPress: () =>
            navigation.navigate(ModuleSlug.address, {
              screen: AddressRouteName.chooseAddress,
              params: {
                moduleSlug: ModuleSlug.neighborhood,
              },
            }),
        },
        {
          text: 'Annuleren',
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
      ],
    )
  }

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="NeighborhoodBoardScreenPleaseWait"
      />
    )
  }

  if (isError || !boardItems) {
    return (
      <SomethingWentWrong
        testID="NeighborhoodBoardScreenSomethingWentWrong"
        text="Het prikbord kon helaas niet opgehaald worden. Probeer het later opnieuw."
        title="Er ging iets mis ..."
      />
    )
  }

  return boardItems.map(item => (
    <NeighborhoodBoardItem
      key={item.id}
      {...item}
    />
  ))
}
