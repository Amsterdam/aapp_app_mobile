import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassDetailsPassNumber} from '@/modules/city-pass/components/details/CityPassDetailsPassNumber'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {CityPass} from '@/modules/city-pass/types'
import {zTokens} from '@/themes/tokens/z'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  cityPass: CityPass
}

export const CityPassDetailsInfo = ({cityPass}: Props) => {
  const {navigate} = useNavigation()
  const {dateEndFormatted, id, passNumberComplete, securityCode} = cityPass

  return (
    <Column
      gutter="md"
      zIndex={zTokens.tooltip}>
      <CityPassDetailsPassNumber passNumberComplete={passNumberComplete} />
      {!!cityPass.type && (
        <SingleSelectable testID="CityPassCityPassDetailsType">
          <Row
            align="between"
            gutter="md">
            <Phrase
              accessible={false}
              testID="CityPassCityPassDetailsTypeLabel">
              Type
            </Phrase>
            <Phrase
              accessible={false}
              emphasis="strong"
              testID="CityPassCityPassDetailsTypeValue">
              {capitalizeString(cityPass.type)}
            </Phrase>
          </Row>
        </SingleSelectable>
      )}
      {!!securityCode && (
        <Row
          align="between"
          gutter="md">
          <HideFromAccessibility>
            <Phrase testID="CityPassCityPassDetailsSecurityCodeLabel">
              Beveiligingscode
            </Phrase>
          </HideFromAccessibility>
          <Button
            accessibilityLabel="Toon beveiligingscode"
            label="Toon"
            onPress={() => {
              navigate(CityPassRouteName.securityCode, {id})
            }}
            testID="CityPassCityPassDetailsSecurityCodeButton"
            variant="secondary"
          />
        </Row>
      )}
      {!!cityPass.actief && (
        <SingleSelectable testID="CityPassCityPassDetailsExpiryDate">
          <Row
            align="between"
            gutter="md">
            <Phrase
              accessible={false}
              testID="CityPassCityPassDetailsExpiryDateLabel">
              Geldig tot en met
            </Phrase>
            <Phrase
              accessible={false}
              emphasis="strong"
              testID="CityPassCityPassDetailsExpiryDateValue">
              {dateEndFormatted}
            </Phrase>
          </Row>
        </SingleSelectable>
      )}
    </Column>
  )
}
