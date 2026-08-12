import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  licensePlate: ParkingLicensePlate
  number: string
}

export const LicensePlateListItem = ({
  licensePlate: {activated_at, id, is_future, vehicle_id, visitor_name},
  number,
}: Props) => {
  const licensePlate = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`
  const {navigate} = useNavigation()

  return (
    // TODO: Change this to ObjectButton once new component has been set up
    // (https://gemeente-amsterdam.atlassian.net/browse/AM-1013?atlOrigin=eyJpIjoiNmJjZDhhNjlmZWE5NDE5ZDg5NWE2MTNkZGE5M2ExMzUiLCJwIjoiaiJ9)
    <NavigationButton
      accessibilityLabel={`Kenteken ${licensePlate}`}
      chevronColor="secondary"
      chevronSize="lg"
      description={
        is_future && activated_at
          ? `Actief vanaf ${dayjs(activated_at).format('D MMMM YYYY')}`
          : undefined
      }
      insetHorizontal="no"
      onPress={() =>
        navigate(ParkingRouteName.editLicensePlate, {licensePlateId: id})
      }
      testID="LicensePlateListItemNavigationButton"
      title={`${is_future ? '-' : number + '.'}  ${licensePlate}`}
    />
  )
}
