import {Row} from '@/components/ui/layout/Row'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'

type Props = {
  content?: string | null
  sectionTitle: string
  url?: string
} & TestProps

export const FractionSection = ({
  content,
  sectionTitle,
  testID,
  url,
}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  if (!content) {
    return
  }

  const WrapperComponent = isScreenReaderEnabled && !!url ? Row : Phrase

  return (
    <WrapperComponent testID={testID}>
      <Phrase
        emphasis="strong"
        testID={`${testID}TitlePhrase`}>
        {sectionTitle}:{' '}
      </Phrase>
      {/* Remove inlineLink once the API includes the url as a single property */}
      {url ? (
        <InlineLink
          onPress={() => openWebUrl(url)}
          testID={`${testID}Link`}
          variant="external">
          {content}
        </InlineLink>
      ) : (
        <FractionContent
          content={content}
          testID={`${testID}Content`}
        />
      )}
    </WrapperComponent>
  )
}
