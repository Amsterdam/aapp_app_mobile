import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {WASTE_DISPOSAL_BUSINESS_URL} from '@/modules/waste-guide/external-links'

const InlineLinkWasteContainer = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <InlineLink
      onPress={() => openWebUrl(WASTE_DISPOSAL_BUSINESS_URL)}
      testID="WasteGuideBusinessesLink"
      variant="external">
      breng het naar een Recyclepunt
    </InlineLink>
  )
}

export const ContactCollector = () => (
  <Phrase testID="WasteGuideBusinessesInfoPhrase">
    Neem contact op met uw afvalinzamelaar of <InlineLinkWasteContainer />
  </Phrase>
)
