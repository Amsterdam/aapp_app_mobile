import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect} from 'react'
import {Alert, AccessibilityInfo} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useBiometrics} from '@/hooks/useBiometrics'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {CityPass} from '@/modules/city-pass/types'
import {pronounceCharacters} from '@/utils/accessibility/pronounceCharacters'

type Props = {
  id: CityPass['id']
}

export const SecurityCode = ({id}: Props) => {
  const {authenticated, authenticate} = useBiometrics({
    autoTrigger: false,
    promptMessage: 'Ontgrendel de beveiligingscode van je stadspas',
    cancelButtonText: 'Terug',
    fallbackPromptMessage: 'Ontgrendel de beveiligingscode',
  })

  const {
    data: cityPasses,
    isFetching,
    isError,
  } = useGetCityPassesQuery(id ? undefined : skipToken)
  const cityPass = cityPasses?.find(cp => cp.id === id)
  const securityCode = cityPass?.securityCode

  useSetScreenTitle(cityPass?.owner.firstname)

  const onScreenshot = useCallback(() => {
    const screenshotMessage = 'Dit scherm staat geen schermafdrukken toe'

    Alert.alert(screenshotMessage)
    AccessibilityInfo.announceForAccessibilityWithOptions(screenshotMessage, {
      queue: true,
    })
  }, [])

  useBlockScreenshots({
    enabled: true,
    onScreenshot,
  })

  useEffect(() => {
    if (securityCode) {
      void authenticate()
    }
  }, [securityCode, authenticate])

  if (isFetching) {
    return <PleaseWait testID="CityPassSecurityCodePleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="CityPassSecurityCodeSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  if (cityPasses && !securityCode) {
    return (
      <AlertNegative
        inset="md"
        testID="CityPassSecurityCodeNegativeAlert"
        text="Deze pas bevat geen beveiligingscode."
      />
    )
  }

  return securityCode ? (
    <Center grow>
      <Box>
        <Column
          gutter="lg"
          halign="center">
          <Title
            testID="CityPassSecurityCodeTitle"
            text="Beveiligingscode"
          />
          <Row>
            {authenticated ? (
              <Title
                accessibilityLabel={pronounceCharacters(securityCode)}
                level="h4"
                text={securityCode.toString()}
              />
            ) : (
              <Button
                label="Toon"
                onPress={authenticate}
                testID="CityPassSecurityCodeButton"
                variant="secondary"
              />
            )}
          </Row>
          <Paragraph
            testID="CityPassSecurityCodeText"
            textAlign="center">
            Deze code wordt soms gevraagd bij het online kopen van tickets,
            toegangsbewijzen en producten.
          </Paragraph>
        </Column>
      </Box>
    </Center>
  ) : null
}
