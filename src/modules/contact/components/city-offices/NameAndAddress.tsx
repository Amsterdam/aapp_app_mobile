import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {CityOffice} from '@/modules/contact/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = Pick<CityOffice, 'address' | 'addressContent' | 'title'>

export const NameAndAddress = ({address, addressContent, title}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()

  return (
    <Column gutter="md">
      <TopTaskButton
        accessibilityHint="Tik om een ander stadsloket te selecteren."
        accessibilityLabel={accessibleText(
          title,
          `${address.street} ${address.number}`,
          address.postcode,
          address.city,
        )}
        icon={{name: 'person-at-desk'}}
        onPress={() => openBottomSheet()}
        testID="ContactCurrentCityOfficeButton"
        text={
          <>
            <Phrase
              testID="ContactCityOfficeStreetPhrase"
              variant="small">
              {address.street} {address.number}
            </Phrase>
            <Phrase
              testID="ContactCityOfficeCityPhrase"
              variant="small">
              {address.postcode} {address.city}
            </Phrase>
          </>
        }
        title={title}
        titleIconName="chevron-down"
      />
      {!!addressContent && (
        <>
          <Title
            level="h5"
            text={addressContent.title}
          />
          {/* TODO Make this either HTML or text in our database. */}
          <Paragraph>{addressContent.html}</Paragraph>
        </>
      )}
    </Column>
  )
}
