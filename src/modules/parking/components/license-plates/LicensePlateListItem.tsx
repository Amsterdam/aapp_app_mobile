import {IconButton} from '@/components/ui/buttons/IconButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  isRemovable: boolean
  licensePlate: ParkingLicensePlate
  number: string
  onPressDelete: (licensePlate: ParkingLicensePlate) => void
}

export const LicensePlateListItem = ({
  licensePlate: {activated_at, id, is_future, vehicle_id, visitor_name},
  isRemovable,
  number,
  onPressDelete,
}: Props) => {
  const licensePlate = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`

  return (
    <Row
      align="between"
      gutter="md"
      key={vehicle_id}>
      <SingleSelectable
        accessibilityLabel={`Kenteken ${licensePlate}`}
        testID="LicensePlateListItem">
        <Row gutter="md">
          <Phrase
            emphasis="strong"
            flexShrink={0}>
            {is_future ? '-' : number + '.'}
          </Phrase>
          {is_future && activated_at ? (
            <Column>
              <Phrase emphasis="strong">{licensePlate}</Phrase>
              <Phrase>
                Actief vanaf {dayjs(activated_at).format('D MMMM YYYY')}
              </Phrase>
            </Column>
          ) : (
            <Phrase emphasis="strong">{licensePlate}</Phrase>
          )}
        </Row>
      </SingleSelectable>
      {!!isRemovable && (
        <IconButton
          accessibilityLabel={`Verwijder kenteken ${vehicle_id}${visitor_name ? ', ' + visitor_name : ''}`}
          icon={
            <Icon
              color="link"
              name="trash-bin"
              size="lg"
              testID="ParkingRemoveLicensePlateIcon"
            />
          }
          logName="ParkingRemoveLicensePlateButton"
          onPress={() => onPressDelete({id, vehicle_id, visitor_name})}
          testID={`ParkingRemoveLicensePlate${number}Button`}
        />
      )}
    </Row>
  )
}
