import {useEffect} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {DigIDButton} from '@/components/ui/buttons/DigIDButton'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import CityPassImage from '@/modules/city-pass/assets/city-pass.svg'
import {RequestCityPass} from '@/modules/city-pass/components/RequestCityPass'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const CityPassIntroScreen = () => {
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const removeSecureItems = useRemoveSecureItems()
  const login = useLogin()

  useEffect(() => {
    if (!isCityPassOwnerRegistered) {
      void removeSecureItems(
        [SecureItemKey.cityPassAccessToken, SecureItemKey.cityPassRefreshToken],
        false,
      )
    }
    // only remove secure items on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen
      hasStickyAlert
      testID="CityPassDashboardScreen">
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <CityPassImage />
      </FigureWithFacadesBackground>
      <Box>
        <Title text="Zet uw Stadspas in de app" />
        <Gutter height="sm" />
        <Paragraph>
          Log eenmalig in met DigiD en zet uw Stadspas in de app. Daarna kunt u
          de Stadspas offline gebruiken en laten scannen.
        </Paragraph>
        <Gutter height="lg" />
        <DigIDButton
          onPress={login}
          testID="CityPassLoginButton"
        />
        <Gutter height="xl" />
        <RequestCityPass />
      </Box>
    </Screen>
  )
}
