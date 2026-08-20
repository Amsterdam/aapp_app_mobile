import {AlertWarning} from '@/components/ui/feedback/alert/AlertWarning'
import {Phrase} from '@/components/ui/text/Phrase'
import {CityPassContactPhoneInlineLink} from '@/modules/city-pass/components/CityPassContactPhoneInlineLink'
import {CITY_PASS_PHONE_NUMBER} from '@/modules/city-pass/constants'

export const CityPassDetailsBlockedAlert = () => (
  <AlertWarning
    accessibilityLabel={`Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar ${CITY_PASS_PHONE_NUMBER}.`}
    hasIcon
    testID="CityPassDetailsBlockedAlert"
    text={
      <Phrase>
        Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar{' '}
        <CityPassContactPhoneInlineLink testID="CityPassDetailsBlockedAlertInlineLink" />
        .
      </Phrase>
    }
    title="Deze pas is geblokkeerd"
  />
)
