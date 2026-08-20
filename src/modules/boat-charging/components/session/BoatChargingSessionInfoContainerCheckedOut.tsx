import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingHelpNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingHelpNavigationButton'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'

export const BoatChargingSessionInfoContainerCheckedOut = () => {
  const {session: {last_command_error} = {}} = useBoatChargingSession()

  return (
    <Column
      gutter="md"
      halign="center">
      <Column
        gutter="smd"
        halign="center">
        <Icon
          name={last_command_error ? 'warning' : 'power-plug'}
          size="xll"
        />
        <Column gutter="xs">
          <Title
            level="h4"
            text={
              last_command_error
                ? 'Laden kon niet worden gestart.'
                : 'Steek de stekker in het stopcontact'
            }
            textAlign="center"
          />
          <Paragraph textAlign="center">
            {last_command_error
              ? 'Haal de stekker eruit en probeer opnieuw.'
              : 'We starten het laden automatisch.'}
          </Paragraph>
        </Column>
      </Column>
      <BoatChargingHelpNavigationButton />
    </Column>
  )
}
