import {Platform, Share} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ManageVisitorIntro = () => {
  const currentPermit = useCurrentParkingPermit()

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column>
      <Title text="Bezoekersaccount" />
      <Gutter height="md" />
      <Paragraph variant="intro">
        Uw bezoekers plannen en betalen zelf hun parkeersessie. U stelt tijd
        beschikbaar en stuurt de meldcode en pincode.
      </Paragraph>
      <Gutter height="lg" />
      <Button
        iconName={Platform.OS === 'android' ? 'share-android' : 'share-ios'}
        label="Bezoeker uitnodigen"
        onPress={() => {
          if (!currentPermit.visitor_account) {
            return
          }

          void Share.share({
            message: `Je kunt voor parkeren gebruik maken van mijn bezoekersaccount. 
Meldcode: ${currentPermit.visitor_account.report_code}, 
Pincode: ${currentPermit.visitor_account.pin}. 
Met deze link kun je direct inloggen in de app: 
https://app.amsterdam.nl/parkeren/bezoeker/?r=${currentPermit.visitor_account.report_code}&p=${currentPermit.visitor_account.pin}`,
          })
        }}
        testID="ParkingManageVisitorInviteVisitorButton"
      />
    </Column>
  )
}
