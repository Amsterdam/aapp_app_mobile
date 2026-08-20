import {InlineLink} from '@/components/ui/text/InlineLink'
import {TestProps} from '@/components/ui/types'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {CITY_PASS_PHONE_NUMBER} from '@/modules/city-pass/constants'

type Props = TestProps

export const CityPassContactPhoneInlineLink = ({testID}: Props) => {
  const openPhoneUrl = useOpenPhoneUrl()

  return (
    <InlineLink
      accessibilityLabel={`Bel ${CITY_PASS_PHONE_NUMBER}`}
      onPress={() => openPhoneUrl(CITY_PASS_PHONE_NUMBER)}
      testID={testID}>
      020 252 6000
    </InlineLink>
  )
}
